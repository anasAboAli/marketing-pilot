import express from "express";

import {
  getAllTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "../services/team.service.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const members = await getAllTeamMembers();

    res.json(members);
  } catch (error) {
    console.error("GET /team:", error);

    res.status(500).json({
      error: "Failed to load team members",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const member = await getTeamMemberById(req.params.id);

    if (!member) {
      return res.status(404).json({
        error: "Team member not found",
      });
    }

    res.json(member);
  } catch (error) {
    console.error("GET /team/:id:", error);

    res.status(500).json({
      error: "Failed to load team member",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const member = await createTeamMember(req.body);

    res.status(201).json(member);
  } catch (error) {
    console.error("POST /team:", error);

    res.status(500).json({
      error: "Failed to create team member",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const member = await updateTeamMember(
      req.params.id,
      req.body
    );

    if (!member) {
      return res.status(404).json({
        error: "Team member not found",
      });
    }

    res.json(member);
  } catch (error) {
    console.error("PUT /team/:id:", error);

    res.status(500).json({
      error: "Failed to update team member",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await deleteTeamMember(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        error: "Team member not found",
      });
    }

    res.json({
      message: "Team member deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /team/:id:", error);

    res.status(500).json({
      error: "Failed to delete team member",
    });
  }
});

export default router;