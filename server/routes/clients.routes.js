import express from "express";

import {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} from "../services/clients.service.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const clients = await getAllClients();

    res.json(clients);
  } catch (error) {
    console.error("GET /clients:", error);

    res.status(500).json({
      error: "Failed to load clients",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const client = await getClientById(req.params.id);

    if (!client) {
      return res.status(404).json({
        error: "Client not found",
      });
    }

    res.json(client);
  } catch (error) {
    console.error("GET /clients/:id:", error);

    res.status(500).json({
      error: "Failed to load client",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const client = await createClient(req.body);

    res.status(201).json(client);
  } catch (error) {
    console.error("POST /clients:", error);

    res.status(500).json({
      error: "Failed to create client",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const client = await updateClient(
      req.params.id,
      req.body
    );

    if (!client) {
      return res.status(404).json({
        error: "Client not found",
      });
    }

    res.json(client);
  } catch (error) {
    console.error("PUT /clients/:id:", error);

    res.status(500).json({
      error: "Failed to update client",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await deleteClient(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        error: "Client not found",
      });
    }

    res.json({
      message: "Client deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /clients/:id:", error);

    res.status(500).json({
      error: "Failed to delete client",
    });
  }
});

export default router;