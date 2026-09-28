import { HindsightClient } from "@vectorize-io/hindsight-client";

const client = new HindsightClient({
  baseUrl:
    process.env.HINDSIGHT_API_URL || "http://localhost:8888",
});

const BANK_ID =
  process.env.HINDSIGHT_BANK_ID || "feedbackloop";

// ================================
// TYPES
// ================================

export interface RetainInput {
  userId: string;
  content: string;
  metadata?: Record<string, unknown>;
}

export interface RetainResult {
  success: boolean;
  memoryId?: string;
  raw?: unknown;
}

export interface RecallInput {
  userId: string;
  query: string;
  limit?: number;
}

export interface Memory {
  id?: string;
  content: string;
  metadata?: Record<string, unknown>;
}

export interface RecallResult {
  memories: Memory[];
  raw?: unknown;
}

export interface InsightResult {
  insight: string;
  supportingMemories?: Memory[];
  raw?: unknown;
}

export interface AskResult {
  answer: string;
  memoriesUsed?: Memory[];
  raw?: unknown;
}

// ================================
// RETAIN MEMORY
// ================================

/**
 * Store feedback information in Hindsight.
 */
export async function retainMemory(
  input: RetainInput
): Promise<RetainResult> {
  const context = input.metadata
    ? JSON.stringify(input.metadata)
    : undefined;

  const result = await client.retain(
    BANK_ID,
    input.content,
    context
      ? {
          context,
        }
      : undefined
  );

  return {
    success: true,
    memoryId: undefined,
    raw: result,
  };
}

// ================================
// RECALL MEMORIES
// ================================

/**
 * Search previously stored memories.
 */
export async function recallMemories(
  input: RecallInput
): Promise<RecallResult> {
  const result = await client.recall(
    BANK_ID,
    input.query
  );

  const memories: Memory[] =
    (result as any)?.results?.map(
      (item: any) => ({
        id: item.id,
        content:
          item.text ||
          item.content ||
          "",
        metadata: item.metadata,
      })
    ) || [];

  return {
    memories: memories.slice(
      0,
      input.limit || 10
    ),
    raw: result,
  };
}

// ================================
// GENERATE INSIGHT
// ================================

/**
 * Generate an insight from accumulated
 * Hindsight memories.
 */
export async function generateInsight(
  userId: string,
  memories: Memory[]
): Promise<InsightResult> {
  const memoryContext = memories
    .map(
      (memory) => memory.content
    )
    .join("\n");

  const query = `
Analyze the following customer feedback memories and identify
important recurring patterns, emerging issues, and useful product insights.

${memoryContext}
`;

  const result =
    await client.reflect(
      BANK_ID,
      query
    );

  return {
    insight:
      (result as any)?.text || "",
    supportingMemories:
      memories,
    raw: result,
  };
}

// ================================
// ANSWER WITH MEMORY
// ================================

/**
 * Answer a user question using
 * Hindsight memory.
 */
export async function answerWithMemory(
  userId: string,
  question: string
): Promise<AskResult> {
  const result =
    await client.reflect(
      BANK_ID,
      question
    );

  return {
    answer:
      (result as any)?.text || "",
    raw: result,
  };
}