import { getFeedback } from "./feedbackService";

export function getDashboardData() {
  const feedback = getFeedback();

  const totalFeedback = feedback.length;

  // Count feedback by category/theme
  const issueMap = new Map<
    string,
    {
      count: number;
      firstSeen: string;
      lastSeen: string;
    }
  >();

  for (const item of feedback) {
    const themes = item.analysis.themes;

    for (const theme of themes) {
      const existing = issueMap.get(theme);

      if (!existing) {
        issueMap.set(theme, {
          count: 1,
          firstSeen: item.date,
          lastSeen: item.date,
        });
      } else {
        existing.count += 1;

        if (
          new Date(item.date).getTime() <
          new Date(existing.firstSeen).getTime()
        ) {
          existing.firstSeen = item.date;
        }

        if (
          new Date(item.date).getTime() >
          new Date(existing.lastSeen).getTime()
        ) {
          existing.lastSeen = item.date;
        }
      }
    }
  }

  // Recurring issues = themes appearing 2+ times
  const recurringIssues = Array.from(issueMap.entries())
    .filter(([, data]) => data.count >= 2)
    .map(([title, data]) => ({
      title,
      count: data.count,
      firstSeen: data.firstSeen,
      lastSeen: data.lastSeen,
    }));

  // Feature requests
  const requestMap = new Map<
    string,
    {
      count: number;
      firstSeen: string;
    }
  >();

  for (const item of feedback) {
    if (item.analysis.issueType !== "feature-request") {
      continue;
    }

    for (const theme of item.analysis.themes) {
      const existing = requestMap.get(theme);

      if (!existing) {
        requestMap.set(theme, {
          count: 1,
          firstSeen: item.date,
        });
      } else {
        existing.count += 1;

        if (
          new Date(item.date).getTime() <
          new Date(existing.firstSeen).getTime()
        ) {
          existing.firstSeen = item.date;
        }
      }
    }
  }

  const emergingRequests = Array.from(requestMap.entries())
    .filter(([, data]) => data.count >= 1)
    .map(([title, data]) => ({
      title,
      count: data.count,
      firstSeen: data.firstSeen,
    }));

  // Negative issues
  const unresolvedMap = new Map<
    string,
    {
      count: number;
      lastSeen: string;
    }
  >();

  for (const item of feedback) {
    if (item.analysis.sentiment !== "negative") {
      continue;
    }

    const title = item.analysis.category;

    const existing = unresolvedMap.get(title);

    if (!existing) {
      unresolvedMap.set(title, {
        count: 1,
        lastSeen: item.date,
      });
    } else {
      existing.count += 1;

      if (
        new Date(item.date).getTime() >
        new Date(existing.lastSeen).getTime()
      ) {
        existing.lastSeen = item.date;
      }
    }
  }

  const unresolvedIssues = Array.from(unresolvedMap.entries()).map(
    ([title, data]) => ({
      title,
      count: data.count,
      lastSeen: data.lastSeen,
    })
  );

  // Sentiment totals
  const sentimentCounts = {
    positive: 0,
    neutral: 0,
    negative: 0,
  };

  for (const item of feedback) {
    sentimentCounts[item.analysis.sentiment]++;
  }

  const sentimentTrend = [
    {
      period: "all-time",
      positive: sentimentCounts.positive,
      neutral: sentimentCounts.neutral,
      negative: sentimentCounts.negative,
    },
  ];

  return {
    totalFeedback,
    recurringIssues,
    emergingRequests,
    unresolvedIssues,
    sentimentTrend,
  };
}