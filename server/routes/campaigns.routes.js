import express from "express";

import {
  getAllCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  getCampaignsByClientId,
} from "../services/campaigns.service.js";

const router = express.Router();

// GET /api/campaigns
router.get("/", async (req, res) => {
  try {
    const campaigns = await getAllCampaigns();

    res.json(campaigns);
  } catch (error) {
    console.error("GET /campaigns:", error);

    res.status(500).json({
      error: "Failed to load campaigns",
    });
  }
});

// GET /api/campaigns/client/:clientId
router.get("/client/:clientId", async (req, res) => {
  try {
    const campaigns = await getCampaignsByClientId(
      req.params.clientId
    );

    res.json(campaigns);
  } catch (error) {
    console.error(
      "GET /campaigns/client/:clientId:",
      error
    );

    res.status(500).json({
      error: "Failed to load client campaigns",
    });
  }
});

// GET /api/campaigns/:id
router.get("/:id", async (req, res) => {
  try {
    const campaign = await getCampaignById(req.params.id);

    if (!campaign) {
      return res.status(404).json({
        error: "Campaign not found",
      });
    }

    res.json(campaign);
  } catch (error) {
    console.error("GET /campaigns/:id:", error);

    res.status(500).json({
      error: "Failed to load campaign",
    });
  }
});

// POST /api/campaigns
router.post("/", async (req, res) => {
  try {
    const campaign = await createCampaign(req.body);

    res.status(201).json(campaign);
  } catch (error) {
    console.error("POST /campaigns:", error);

    res.status(500).json({
      error: "Failed to create campaign",
    });
  }
});

// PUT /api/campaigns/:id
router.put("/:id", async (req, res) => {
  try {
    const campaign = await updateCampaign(
      req.params.id,
      req.body
    );

    if (!campaign) {
      return res.status(404).json({
        error: "Campaign not found",
      });
    }

    res.json(campaign);
  } catch (error) {
    console.error("PUT /campaigns/:id:", error);

    res.status(500).json({
      error: "Failed to update campaign",
    });
  }
});

// DELETE /api/campaigns/:id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await deleteCampaign(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        error: "Campaign not found",
      });
    }

    res.json({
      message: "Campaign deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /campaigns/:id:", error);

    res.status(500).json({
      error: "Failed to delete campaign",
    });
  }
});

export default router;