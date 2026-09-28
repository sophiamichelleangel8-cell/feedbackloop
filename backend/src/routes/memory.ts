import { Router, Request, Response } from "express";
import {
  retainMemory,
  recallMemories,
} from "../services/hindsightService";

const router = Router();

/*
 * GET /api/memory
 *
 * Example:
 * /api/memory?q=checkout
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const query = String(req.query.q || "").trim();

    if (!query) {
      return res.status(400).json({
        error: "Query parameter 'q' is required.",
      });
    }

    const userId = String(req.query.userId || "demo-user");

    const result = await recallMemories({
      userId,
      query,
      limit: 10,
    });

    return res.json(result);
  } catch (error) {
    console.error("Memory recall error:", error);

    return res.status(500).json({
      error:
        error instanceof Error
          ? error.message
          : "Failed to recall memories.",
    });
  }
});

/*
 * POST /api/memory
 *
 * Stores useful feedback/context in Hindsight.
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    const { userId, content, metadata } = req.body;

    if (!content || typeof content !== "string") {
      return res.status(400).json({
        error: "Memory content is required.",
      });
    }

    const result = await retainMemory({
      userId: userId || "demo-user",
      content: content.trim(),
      metadata,
    });

    return res.status(201).json(result);
  } catch (error) {
    console.error("Memory retention error:", error);

    return res.status(500).json({
      error:
        error instanceof Error
          ? error.message
          : "Failed to retain memory.",
    });
  }
});

export default router;