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

export async function getMonthlyRevenue() {
  const [rows] = await db.query(`
    SELECT
      DATE_FORMAT(start_date, '%Y-%m') AS month,
      COALESCE(SUM(spent), 0) AS total_spent
    FROM campaigns
    WHERE start_date IS NOT NULL
    GROUP BY DATE_FORMAT(start_date, '%Y-%m')
    ORDER BY month ASC
  `);

  return rows.map((row) => ({
    month: row.month,
    totalSpent: Number(row.total_spent || 0),
  }));
}

export async function getTopEmployees() {
  const [rows] = await db.query(`
    SELECT
      assigned_to AS name,
      COALESCE(SUM(value), 0) AS total_value
    FROM leads
    WHERE assigned_to IS NOT NULL
      AND assigned_to != ''
    GROUP BY assigned_to
    ORDER BY total_value DESC
    LIMIT 5
  `);

  return rows.map((row) => ({
    name: row.name,
    totalValue: Number(row.total_value || 0),
  }));
}