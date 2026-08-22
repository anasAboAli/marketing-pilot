import db from "../db/connection.js";

export async function getAllLeads() {
  const [rows] = await db.query(`
    SELECT
      id,
      name,
      company,
      phone,
      email,
      source,
      campaign,
      assigned_to AS assignedTo,
      value,
      status,
      notes,
      created_at AS createdAt,
      updated_at AS updatedAt
    FROM leads
    ORDER BY id DESC
  `);

  return rows;
}

export async function getLeadById(id) {
  const [rows] = await db.execute(
    `
      SELECT
        id,
        name,
        company,
        phone,
        email,
        source,
        campaign,
        assigned_to AS assignedTo,
        value,
        status,
        notes,
        created_at AS createdAt,
        updated_at AS updatedAt
      FROM leads
      WHERE id = ?
    `,
    [id]
  );

  return rows[0];
}

export async function createLead(data) {
  const {
    name,
    company = "",
    phone = "",
    email = "",
    source,
    campaign = "",
    assignedTo = "",
    value = 0,
    status = "جديد",
    notes = "",
  } = data;

  const [result] = await db.execute(
    `
      INSERT INTO leads
      (
        name,
        company,
        phone,
        email,
        source,
        campaign,
        assigned_to,
        value,
        status,
        notes
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      name,
      company,
      phone,
      email,
      source,
      campaign,
      assignedTo,
      value,
      status,
      notes,
    ]
  );

  return getLeadById(result.insertId);
}

export async function updateLead(id, data) {
  const {
    name,
    company,
    phone,
    email,
    source,
    campaign,
    assignedTo,
    value,
    status,
    notes,
  } = data;

  const [result] = await db.execute(
    `
      UPDATE leads
      SET
        name = ?,
        company = ?,
        phone = ?,
        email = ?,
        source = ?,
        campaign = ?,
        assigned_to = ?,
        value = ?,
        status = ?,
        notes = ?
      WHERE id = ?
    `,
    [
      name,
      company,
      phone,
      email,
      source,
      campaign,
      assignedTo,
      value,
      status,
      notes,
      id,
    ]
  );

  if (result.affectedRows === 0) {
    return null;
  }

  return getLeadById(id);
}

export async function deleteLead(id) {
  const [result] = await db.execute(
    "DELETE FROM leads WHERE id = ?",
    [id]
  );

  return result.affectedRows > 0;
}