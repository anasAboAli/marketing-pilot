import express from "express";
import cors from "cors";
import "dotenv/config";

import clientsRoutes from "./routes/clients.routes.js";
import leadsRoutes from "./routes/leads.routes.js";
import campaignsRoutes from "./routes/campaigns.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import teamRoutes from "./routes/team.routes.js";
import settingsRoutes from "./routes/settings.routes.js";
import reportsRoutes from "./routes/reports.routes.js";

import { initializeDatabase } from "./db/initDatabase.js";
import pool from "./db/connection.js";

const app = express();

const PORT = process.env.PORT || 3001;

// Middleware
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());

// Health check (also pings the database so uptime pings keep it awake)
app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok", database: "connected" });
  } catch (error) {
    res.status(503).json({ status: "error", database: error.message });
  }
});

// API Routes
app.use("/api/clients", clientsRoutes);
app.use("/api/leads", leadsRoutes);
app.use("/api/campaigns", campaignsRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/reports", reportsRoutes);

// Start server
async function startServer() {
  try {
    await initializeDatabase();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`MarketPilot API running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  }
}

startServer();