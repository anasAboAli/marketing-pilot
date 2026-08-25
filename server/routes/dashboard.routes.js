import express from "express";
import {
  getDashboardOverview,
  getRevenueByPlatform,
  getMonthlyRevenue,
  getTopEmployees,
  getTopCampaigns,
  getRecentLeads,
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

router.get("/monthly-revenue", async (req, res) => {
  try {
    const data = await getMonthlyRevenue();

    res.json(data);
  } catch (error) {
    console.error("GET /dashboard/monthly-revenue:", error);

    res.status(500).json({
      error: "Failed to load monthly revenue",
    });
  }
});

router.get("/top-employees", async (req, res) => {
  try {
    const data = await getTopEmployees();

    res.json(data);
  } catch (error) {
    console.error("GET /dashboard/top-employees:", error);

    res.status(500).json({
      error: "Failed to load top employees",
    });
  }
});

router.get("/top-campaigns", async (req, res) => {
  try {
    const data = await getTopCampaigns();

    res.json(data);
  } catch (error) {
    console.error("GET /dashboard/top-campaigns:", error);

    res.status(500).json({
      error: "Failed to load top campaigns",
    });
  }
});

router.get("/recent-leads", async (req, res) => {
  try {
    const data = await getRecentLeads();

    res.json(data);
  } catch (error) {
    console.error("GET /dashboard/recent-leads:", error);

    res.status(500).json({
      error: "Failed to load recent leads",
    });
  }
});

export default router;