export type Sentiment = "positive" | "neutral" | "negative";

export type Severity = "low" | "medium" | "high";

export interface FeedbackInput {
  text: string;
  customer?: string;
  date?: string;
}

export interface FeedbackAnalysis {
  category: string;
  sentiment: Sentiment;
  severity: Severity;
  themes: string[];
  summary: string;
  issueType: string;
}

export interface FeedbackItem {
  id: string;
  text: string;
  customer: string | null;
  date: string;
  analysis: FeedbackAnalysis;
  memoryRetained: boolean;
}