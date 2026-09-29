import {
  FeedbackAnalysis,
  FeedbackInput,
  FeedbackItem,
} from "../types/feedback";

import { retainMemory } from "./hindsightService";

const feedbackStore: FeedbackItem[] = [];

/**
 * Temporary rule-based analysis for the MVP.
 *
 * Later this can be replaced/extended with Vaishnavi's
 * Hindsight/AI service without changing the API routes.
 */
function analyzeFeedback(text: string): FeedbackAnalysis {
  const lowerText = text.toLowerCase();

  let sentiment: FeedbackAnalysis["sentiment"] = "neutral";
  let severity: FeedbackAnalysis["severity"] = "low";
  let category = "general";
  let issueType = "general";

  const themes: string[] = [];

  // ----------------------------------------
  // NEGATIVE FEEDBACK
  // ----------------------------------------

  const negativeIndicators = [
    "slow",
    "too long",
    "taking too long",
    "bad",
    "terrible",
    "broken",
    "bug",
    "error",
    "crash",
    "failed",
    "failure",
    "frustrating",
    "difficult",
    "problem",
    "issue",
    "not working",
    "doesn't work",
    "doesnt work",
    "can't",
    "cannot",
    "unusable",
  ];

  const hasNegativeFeedback = negativeIndicators.some((word) =>
    lowerText.includes(word)
  );

  if (hasNegativeFeedback) {
    sentiment = "negative";
    severity = "medium";
    issueType = "problem";
  }

  // ----------------------------------------
  // POSITIVE FEEDBACK
  // ----------------------------------------

  const positiveIndicators = [
    "love",
    "great",
    "excellent",
    "amazing",
    "awesome",
    "easy to use",
    "helpful",
    "perfect",
    "fast",
    "good",
  ];

  const hasPositiveFeedback = positiveIndicators.some((word) =>
    lowerText.includes(word)
  );

  // Negative feedback takes priority over positive keywords.
  if (hasPositiveFeedback && !hasNegativeFeedback) {
    sentiment = "positive";
    severity = "low";
  }

  // ----------------------------------------
  // CHECKOUT
  // ----------------------------------------

  if (
    lowerText.includes("checkout") ||
    lowerText.includes("check out")
  ) {
    category = "checkout";

    if (!themes.includes("checkout")) {
      themes.push("checkout");
    }
  }

  // ----------------------------------------
  // PAYMENTS
  // ----------------------------------------

  if (
    lowerText.includes("payment") ||
    lowerText.includes("pay") ||
    lowerText.includes("card") ||
    lowerText.includes("transaction")
  ) {
    if (category === "general") {
      category = "payments";
    }

    if (!themes.includes("payments")) {
      themes.push("payments");
    }
  }

  // ----------------------------------------
  // PERFORMANCE
  // ----------------------------------------

  if (
    lowerText.includes("slow") ||
    lowerText.includes("loading") ||
    lowerText.includes("lag") ||
    lowerText.includes("performance") ||
    lowerText.includes("takes too long") ||
    lowerText.includes("taking too long")
  ) {
    issueType = "performance";

    if (!themes.includes("performance")) {
      themes.push("performance");
    }

    if (hasNegativeFeedback) {
      severity = "medium";
    }
  }

  // ----------------------------------------
  // BUG / TECHNICAL PROBLEM
  // ----------------------------------------

  if (
    lowerText.includes("bug") ||
    lowerText.includes("error") ||
    lowerText.includes("crash") ||
    lowerText.includes("broken") ||
    lowerText.includes("not working") ||
    lowerText.includes("doesn't work") ||
    lowerText.includes("cannot")
  ) {
    issueType = "bug";

    if (!themes.includes("technical-issue")) {
      themes.push("technical-issue");
    }
  }

  // ----------------------------------------
  // FEATURE REQUEST
  // ----------------------------------------

  const featureRequestIndicators = [
    "feature",
    "would like",
    "please add",
    "wish",
    "add support",
    "would be nice",
    "can you add",
    "we need",
    "i want",
    "it would help",
  ];

  if (
    featureRequestIndicators.some((word) =>
      lowerText.includes(word)
    )
  ) {
    issueType = "feature-request";
  }

  // ----------------------------------------
  // DARK MODE
  // ----------------------------------------

  if (
    lowerText.includes("dark mode") ||
    lowerText.includes("dark theme")
  ) {
    category = "ui";
    issueType = "feature-request";

    if (!themes.includes("dark-mode")) {
      themes.push("dark-mode");
    }
  }

  // ----------------------------------------
  // UI / UX
  // ----------------------------------------

  if (
    lowerText.includes("interface") ||
    lowerText.includes("ui") ||
    lowerText.includes("design") ||
    lowerText.includes("navigation") ||
    lowerText.includes("confusing") ||
    lowerText.includes("user experience")
  ) {
    if (category === "general") {
      category = "ui";
    }

    if (!themes.includes("user-experience")) {
      themes.push("user-experience");
    }
  }

  // ----------------------------------------
  // HIGH SEVERITY
  // ----------------------------------------

  if (
    lowerText.includes("urgent") ||
    lowerText.includes("critical") ||
    lowerText.includes("completely broken") ||
    lowerText.includes("unusable")
  ) {
    severity = "high";
  }

  // ----------------------------------------
  // DEFAULT THEME
  // ----------------------------------------

  if (themes.length === 0) {
    themes.push(category);
  }

  // ----------------------------------------
  // SUMMARY
  // ----------------------------------------

  let summary = text;

  if (
    issueType === "performance" &&
    category === "checkout"
  ) {
    summary =
      "Customer reports slow checkout performance.";
  } else if (issueType === "bug") {
    summary =
      "Customer reports a technical problem with the product.";
  } else if (issueType === "feature-request") {
    summary =
      "Customer is requesting a new product feature or improvement.";
  } else if (sentiment === "positive") {
    summary =
      "Customer provided positive feedback about the product.";
  }

  return {
    category,
    sentiment,
    severity,
    themes,
    summary,
    issueType,
  };
}

// ----------------------------------------
// CREATE FEEDBACK
// ----------------------------------------

export async function createFeedback(
  input: FeedbackInput
): Promise<FeedbackItem> {
  const analysis = analyzeFeedback(input.text);

  const feedback: FeedbackItem = {
    id: `fb-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}`,

    text: input.text,

    customer: input.customer ?? null,

    date: input.date ?? new Date().toISOString(),

    analysis,

    memoryRetained: false,
  };

  try {
    await retainMemory({
      userId: input.customer ?? "anonymous",

      content: input.text,

      metadata: {
        feedbackId: feedback.id,
        customer: input.customer ?? null,
        date: feedback.date,
        category: analysis.category,
        sentiment: analysis.sentiment,
        severity: analysis.severity,
        themes: analysis.themes,
        issueType: analysis.issueType,
      },
    });

    feedback.memoryRetained = true;
  } catch (error) {
    console.error(
      "Failed to retain feedback in Hindsight:",
      error
    );
  }

  feedbackStore.push(feedback);

  return feedback;
}

// ----------------------------------------
// GET FEEDBACK
// ----------------------------------------

export function getFeedback(): FeedbackItem[] {
  return [...feedbackStore].sort(
    (a, b) =>
      new Date(b.date).getTime() -
      new Date(a.date).getTime()
  );
}

// ----------------------------------------
// ANALYZE TEXT
// ----------------------------------------

export function analyzeText(
  text: string
): FeedbackAnalysis {
  return analyzeFeedback(text);
}