import db from "../db/connection.js";

export async function getDashboardOverview() {
  const [rows] = await db.query(`
    SELECT
      COALESCE(SUM(budget), 0) AS total_budget,
      COALESCE(SUM(spent), 0) AS total_spent
    FROM campaigns
  `);

  const totalBudget = Number(rows[0].total_budget || 0);
  const totalSpent = Number(rows[0].total_spent || 0);

  return {
    totalBudget,
    totalSpent,
    netProfit: totalBudget - totalSpent,
  };
}

export async function getRevenueByPlatform() {
  const [rows] = await db.query(`
    SELECT
      platform,
      COALESCE(SUM(spent), 0) AS total_spent
    FROM campaigns
    GROUP BY platform
    ORDER BY total_spent DESC
  `);

  return rows.map((row) => ({
    platform: row.platform,
    totalSpent: Number(row.total_spent || 0),
  }));
}