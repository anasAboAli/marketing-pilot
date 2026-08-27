import express from "express";

import {
  getSettings,
  updateSettings,
} from "../services/settings.service.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const settings = await getSettings();

    res.json(settings);
  } catch (error) {
    console.error("GET /settings:", error);

    res.status(500).json({
      error: "Failed to load settings",
    });
  }
});

router.put("/", async (req, res) => {
  try {
    const settings = await updateSettings(req.body);

    res.json(settings);
  } catch (error) {
    console.error("PUT /settings:", error);

    res.status(500).json({
      error: "Failed to update settings",
    });
  }
});

export default router;