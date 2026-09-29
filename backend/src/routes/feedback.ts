import { Router, Request, Response } from "express";

import {
  createFeedback,
  getFeedback,
} from "../services/feedbackService";

import { FeedbackInput } from "../types/feedback";

const router = Router();

// ----------------------------------------
// POST /api/feedback
// Create one feedback item
// ----------------------------------------

router.post(
  "/",
  async (req: Request, res: Response) => {
    const { text, customer, date } = req.body as FeedbackInput;

    // Validate feedback text
    if (
      !text ||
      typeof text !== "string" ||
      text.trim().length === 0
    ) {
      return res.status(400).json({
        error: "Feedback text is required.",
      });
    }

    // Validate date if provided
    if (
      date &&
      Number.isNaN(new Date(date).getTime())
    ) {
      return res.status(400).json({
        error: "Invalid date format.",
      });
    }

    const feedback = await createFeedback({
      text: text.trim(),
      customer,
      date,
    });

    return res.status(201).json(feedback);
  }
);

// ----------------------------------------
// GET /api/feedback
// Retrieve all feedback
// ----------------------------------------

router.get(
  "/",
  (_req: Request, res: Response) => {
    const feedback = getFeedback();

    return res.json(feedback);
  }
);

// ----------------------------------------
// POST /api/feedback/batch
// Create multiple feedback items
// ----------------------------------------

router.post(
  "/batch",
  async (req: Request, res: Response) => {
    const { items } = req.body as {
      items?: FeedbackInput[];
    };

    // Validate items array
    if (!Array.isArray(items)) {
      return res.status(400).json({
        error: "items must be an array.",
      });
    }

    if (items.length === 0) {
      return res.status(400).json({
        error: "items array cannot be empty.",
      });
    }

    // Validate every feedback item
    for (const item of items) {
      if (
        !item ||
        typeof item.text !== "string" ||
        item.text.trim().length === 0
      ) {
        return res.status(400).json({
          error:
            "Every feedback item must contain a non-empty text field.",
        });
      }

      if (
        item.date &&
        Number.isNaN(new Date(item.date).getTime())
      ) {
        return res.status(400).json({
          error:
            "One or more feedback items contain an invalid date.",
        });
      }
    }

    // Create all feedback items and wait for Hindsight
    const created = await Promise.all(
      items.map((item) =>
        createFeedback({
          text: item.text.trim(),
          customer: item.customer,
          date: item.date,
        })
      )
    );

    return res.status(201).json({
      created: created.length,
      items: created,
    });
  }
);

export default router;