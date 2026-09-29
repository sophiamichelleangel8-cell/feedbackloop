import express from "express";
import askRouter from "./routes/ask";
import cors from "cors";
import dotenv from "dotenv";
import importRouter from "./routes/import";

import feedbackRouter from "./routes/feedback";
import dashboardRouter from "./routes/dashboard";
import memoryRouter from "./routes/memory";
import insightsRouter from "./routes/insights";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

// ----------------------------------------
// Middleware
// ----------------------------------------

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

// ----------------------------------------
// Health check
// ----------------------------------------

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
  });
});

// ----------------------------------------
// API Routes
// ----------------------------------------

app.use("/api/dashboard", dashboardRouter);

app.use("/api/feedback", feedbackRouter);
app.use("/api/ask", askRouter);
app.use("/api/memory", memoryRouter);
app.use("/api/import", importRouter);
app.use("/api/insights", insightsRouter);

// ----------------------------------------
// Start server
// ----------------------------------------

app.listen(PORT, () => {
  console.log(
    `FeedbackLoop backend running on http://localhost:${PORT}`
  );
});