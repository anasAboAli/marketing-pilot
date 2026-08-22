import express from "express";

import {
  getAllLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
} from "../services/leads.service.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const leads = await getAllLeads();

    res.json(leads);
  } catch (error) {
    console.error("GET /leads:", error);

    res.status(500).json({
      error: "Failed to load leads",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const lead = await getLeadById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        error: "Lead not found",
      });
    }

    res.json(lead);
  } catch (error) {
    console.error("GET /leads/:id:", error);

    res.status(500).json({
      error: "Failed to load lead",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const lead = await createLead(req.body);

    res.status(201).json(lead);
  } catch (error) {
    console.error("POST /leads:", error);

    res.status(500).json({
      error: "Failed to create lead",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const lead = await updateLead(
      req.params.id,
      req.body
    );

    if (!lead) {
      return res.status(404).json({
        error: "Lead not found",
      });
    }

    res.json(lead);
  } catch (error) {
    console.error("PUT /leads/:id:", error);

    res.status(500).json({
      error: "Failed to update lead",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await deleteLead(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        error: "Lead not found",
      });
    }

    res.json({
      message: "Lead deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /leads/:id:", error);

    res.status(500).json({
      error: "Failed to delete lead",
    });
  }
});

export default router;