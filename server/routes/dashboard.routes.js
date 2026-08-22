import express from "express";
import {
  getDashboardOverview,
  getRevenueByPlatform,
} from "../services/dashboard.service.js";

const router = express.Router();

router.get("/overview", async (req, res) => {
  try {
    const overview = await getDashboardOverview();

    res.json(overview);
  } catch (error) {
    console.error("GET /dashboard/overview:", error);

    res.status(500).json({
      error: "Failed to load dashboard overview",
    });
  }
});

router.get("/revenue-by-platform", async (req, res) => {
  try {
    const data = await getRevenueByPlatform();

    res.json(data);
  } catch (error) {
    console.error(
      "GET /dashboard/revenue-by-platform:",
      error
    );

    res.status(500).json({
      error: "Failed to load revenue by platform",
    });
  }
});

export default router;