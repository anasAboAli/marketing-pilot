import express from "express";
import cors from "cors";

import clientsRoutes from "./routes/clients.routes.js";
import leadsRoutes from "./routes/leads.routes.js";
import campaignsRoutes from "./routes/campaigns.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

const app = express();

const PORT = process.env.PORT || 3001;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    database: "marketpilot_db",
  });
});

// API Routes
app.use("/api/clients", clientsRoutes);
app.use("/api/leads", leadsRoutes);
app.use("/api/campaigns", campaignsRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Start server
app.listen(PORT, () => {
  console.log(
    `MarketPilot API running on http://localhost:${PORT}`
  );
});