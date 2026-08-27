import express from "express";
import { getReportsSummary } from "../services/reports.service.js";
import { analyzeReport } from "../services/ai.service.js";

const router = express.Router();

router.get("/summary", async (req, res) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({
        error: "from and to are required",
      });
    }

    const startDate = new Date(from);
    const endDate = new Date(to);

    if (
      Number.isNaN(startDate.getTime()) ||
      Number.isNaN(endDate.getTime())
    ) {
      return res.status(400).json({
        error: "Invalid date format",
      });
    }

    if (startDate > endDate) {
      return res.status(400).json({
        error: "The from date must be before the to date",
      });
    }

    const report = await getReportsSummary(from, to);

    res.json(report);
  } catch (error) {
    console.error("GET /reports/summary:", error);

    res.status(500).json({
      error: "Failed to load reports summary",
    });
  }
});

router.post("/ai-analysis", async (req, res) => {
  try {
    const { report } = req.body;

    if (!report) {
      return res.status(400).json({
        error: "Report data is required",
      });
    }

    const analysis = await analyzeReport(report);

    res.json(analysis);
  } catch (error) {
    console.error("POST /reports/ai-analysis:", error);

    res.status(500).json({
      error: "Failed to generate AI analysis",
    });
  }
});

export default router;