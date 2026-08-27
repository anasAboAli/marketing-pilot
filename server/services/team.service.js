import db from "../db/connection.js";

export async function getAllTeamMembers() {
  const [rows] = await db.query(`
    SELECT
      id,
      name,
      role,
      email,
      phone,
      status,
      created_at,
      updated_at
    FROM team_members
    ORDER BY id DESC
  `);

  return rows;
}

export async function getTeamMemberById(id) {
  const [rows] = await db.execute(
    `
      SELECT
        id,
        name,
        role,
        email,
        phone,
        status,
        created_at,
        updated_at
      FROM team_members
      WHERE id = ?
    `,
    [id]
  );

  return rows[0];
}

export async function createTeamMember(data) {
  const {
    name,
    role,
    email = "",
    phone = "",
    status = "نشط",
  } = data;

  const [result] = await db.execute(
    `
      INSERT INTO team_members
      (
        name,
        role,
        email,
        phone,
        status
      )
      VALUES (?, ?, ?, ?, ?)
    `,
    [
      name,
      role,
      email,
      phone,
      status,
    ]
  );

  return getTeamMemberById(result.insertId);
}

export async function updateTeamMember(id, data) {
  const {
    name,
    role,
    email = "",
    phone = "",
    status = "نشط",
  } = data;

  await db.execute(
    `
      UPDATE team_members
      SET
        name = ?,
        role = ?,
        email = ?,
        phone = ?,
        status = ?
      WHERE id = ?
    `,
    [
      name,
      role,
      email,
      phone,
      status,
      id,
    ]
  );

  return getTeamMemberById(id);
}

export async function deleteTeamMember(id) {
  const [result] = await db.execute(
    "DELETE FROM team_members WHERE id = ?",
    [id]
  );

  return result.affectedRows > 0;
}