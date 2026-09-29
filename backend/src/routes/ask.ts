import { Router, Request, Response } from "express";
import { answerWithMemory } from "../services/hindsightService";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { question } = req.body;

    if (!question || typeof question !== "string" || question.trim().length === 0) {
      return res.status(400).json({
        error: "Question is required.",
      });
    }

    const result = await answerWithMemory(
      "feedbackloop",
      question.trim()
    );

    return res.json({
      answer: result.answer,
      memoriesUsed: result.memoriesUsed ?? [],
    });
  } catch (error) {
    console.error("Failed to answer question:", error);

    return res.status(500).json({
      error: "Failed to answer question.",
    });
  }
});

export default router;