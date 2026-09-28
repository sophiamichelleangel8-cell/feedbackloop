import {
  Router,
  Request,
  Response,
} from "express";

import { importFeedbackCsv } from "../services/csvImporter";

const router = Router();

router.post(
  "/",
  async (
    _req: Request,
    res: Response
  ) => {
    try {
      const result =
        await importFeedbackCsv();

      return res.status(201).json(result);
    } catch (error) {
      console.error(
        "CSV import failed:",
        error
      );

      return res.status(500).json({
        error: "Failed to import feedback.csv.",
      });
    }
  }
);

export default router;