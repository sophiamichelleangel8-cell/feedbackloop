import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

import {
  createFeedback,
  getFeedback,
} from "./feedbackService";

interface CsvFeedbackRow {
  id: string;
  date: string;
  customer_context: string;
  feedback_text: string;
  product_area: string;
  sentiment: string;
  issue_request_type: string;
}

/**
 * Import feedback.csv into the backend.
 *
 * Rows are processed in small parallel batches so the import
 * is much faster than waiting for every row sequentially,
 * while avoiding a huge burst of requests to Hindsight.
 */
export async function importFeedbackCsv() {
  const csvPath = path.join(
    process.cwd(),
    "feedback.csv"
  );

  if (!fs.existsSync(csvPath)) {
    throw new Error(
      `feedback.csv not found at ${csvPath}`
    );
  }

  const file = fs.readFileSync(
    csvPath,
    "utf-8"
  );

  const rows = parse(file, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  }) as CsvFeedbackRow[];

  if (rows.length === 0) {
    return {
      created: 0,
      skipped: 0,
      items: [],
    };
  }

  // Prevent duplicate imports while the backend is running.
  const existingFeedback = getFeedback();

  const existingKeys = new Set(
    existingFeedback.map(
      (item) =>
        `${item.text.trim()}|${item.customer ?? ""}|${item.date}`
    )
  );

  const rowsToImport = rows.filter((row) => {
    const date = new Date(row.date);

    if (Number.isNaN(date.getTime())) {
      console.warn(
        `Skipping ${row.id}: invalid date "${row.date}"`
      );
      return false;
    }

    const key =
      `${row.feedback_text.trim()}|` +
      `${row.customer_context ?? ""}|` +
      `${date.toISOString()}`;

    if (existingKeys.has(key)) {
      return false;
    }

    return true;
  });

  const BATCH_SIZE = 5;
  const created = [];

  for (
    let i = 0;
    i < rowsToImport.length;
    i += BATCH_SIZE
  ) {
    const batch = rowsToImport.slice(
      i,
      i + BATCH_SIZE
    );

    const batchResults = await Promise.all(
      batch.map(async (row) => {
        const parsedDate = new Date(row.date);

        const feedback = await createFeedback({
          text: row.feedback_text.trim(),
          customer:
            row.customer_context?.trim() || undefined,
          date: parsedDate.toISOString(),
        });

        return {
          sourceId: row.id,
          productArea: row.product_area,
          csvSentiment: row.sentiment,
          issueRequestType:
            row.issue_request_type,
          feedback,
        };
      })
    );

    created.push(...batchResults);
  }

  return {
    created: created.length,
    skipped: rows.length - rowsToImport.length,
    items: created,
  };
}