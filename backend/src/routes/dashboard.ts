import { Router, Request, Response } from "express";
import { getDashboardData } from "../services/dashboardService";

const router = Router();

// GET /api/dashboard
router.get("/", (_req: Request, res: Response) => {
  try {
    const dashboard = getDashboardData();

    return res.json(dashboard);
  } catch (error) {
    console.error("Dashboard error:", error);

    return res.status(500).json({
      error: "Failed to retrieve dashboard data.",
    });
  }
});

export default router;