import {
  Router,
  Request,
  Response,
} from "express";

import {
  answerWithMemory,
  recallMemories,
} from "../services/hindsightService";

const router = Router();

router.get(
  "/",
  async (
    _req: Request,
    res: Response
  ) => {
    try {
      // Get a small set of relevant memories
      const recalled = await recallMemories({
        userId: "feedbackloop",
        query:
          "customer feedback recurring problems emerging issues product requests",
        limit: 8,
      });

      // Use the same working reflect flow as /api/ask
      const result = await answerWithMemory(
        "feedbackloop",
        `
Analyze the customer feedback stored in memory.

Identify:
1. The main recurring problems
2. Emerging issues
3. Important feature requests
4. A concise product recommendation

Keep the response concise, specific, and actionable.
        `.trim()
      );

      return res.json({
        insight: result.answer,
        supportingMemories:
          recalled.memories,
      });
    } catch (error) {
      console.error(
        "Failed to generate insights:",
        error
      );

      return res.status(500).json({
        error: "Failed to generate insights.",
      });
    }
  }
);

export default router;