import db from "../db/connection.js";

export async function getAllClients() {
  const [rows] = await db.query(`
    SELECT
      c.id,
      c.name,
      c.industry,
      c.manager,
      c.status,
      COUNT(cp.id) AS campaigns,
      c.revenue,
      c.created_at,
      c.updated_at
    FROM clients c
    LEFT JOIN campaigns cp
      ON cp.client_id = c.id
    GROUP BY
      c.id,
      c.name,
      c.industry,
      c.manager,
      c.status,
      c.revenue,
      c.created_at,
      c.updated_at
    ORDER BY c.id DESC
  `);

  return rows;
}

export async function getClientById(id) {
  const [rows] = await db.execute(
    `
      SELECT
        id,
        name,
        industry,
        manager,
        status,
        campaigns,
        revenue,
        created_at,
        updated_at
      FROM clients
      WHERE id = ?
    `,
    [id]
  );

  return rows[0];
}

export async function createClient(data) {
  const {
    name,
    industry,
    manager,
    status = "نشط",
    campaigns = 0,
    revenue = 0,
  } = data;

  const [result] = await db.execute(
    `
      INSERT INTO clients
      (
        name,
        industry,
        manager,
        status,
        campaigns,
        revenue
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    [
      name,
      industry,
      manager,
      status,
      campaigns,
      revenue,
    ]
  );

  return getClientById(result.insertId);
}

export async function updateClient(id, data) {
  const {
    name,
    industry,
    manager,
    status,
    campaigns,
    revenue,
  } = data;

  await db.execute(
    `
      UPDATE clients
      SET
        name = ?,
        industry = ?,
        manager = ?,
        status = ?,
        campaigns = ?,
        revenue = ?
      WHERE id = ?
    `,
    [
      name,
      industry,
      manager,
      status,
      campaigns,
      revenue,
      id,
    ]
  );

  return getClientById(id);
}

export async function deleteClient(id) {
  const [result] = await db.execute(
    "DELETE FROM clients WHERE id = ?",
    [id]
  );

  return result.affectedRows > 0;
}