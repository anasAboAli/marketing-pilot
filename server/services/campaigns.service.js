import db from "../db/connection.js";

export async function getAllCampaigns() {
  const [rows] = await db.query(`
    SELECT
      id,
      client_id,
      name,
      client,
      platform,
      objective,
      budget,
      currency,
      spent,
      start_date,
      end_date,
      description,
      status,
      impressions,
      clicks,
      conversions,
      created_at,
      updated_at
    FROM campaigns
    ORDER BY id DESC
  `);

  return rows;
}

export async function getCampaignById(id) {
  const [rows] = await db.execute(
    `
      SELECT
        id,
        client_id,
        name,
        client,
        platform,
        objective,
        budget,
        currency,
        spent,
        start_date,
        end_date,
        description,
        status,
        impressions,
        clicks,
        conversions,
        created_at,
        updated_at
      FROM campaigns
      WHERE id = ?
    `,
    [id]
  );

  return rows[0];
}

export async function createCampaign(data) {
  const {
    client_id = null,
    name,
    client,
    platform,
    objective,
    budget = 0,
    currency = "SAR",
    spent = 0,
    start_date = null,
    end_date = null,
    description = null,
    status = "نشطة",
    impressions = 0,
    clicks = 0,
    conversions = 0,
  } = data;

  const [result] = await db.execute(
    `
      INSERT INTO campaigns
      (
        client_id,
        name,
        client,
        platform,
        objective,
        budget,
        currency,
        spent,
        start_date,
        end_date,
        description,
        status,
        impressions,
        clicks,
        conversions
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      client_id,
      name,
      client,
      platform,
      objective,
      budget,
      currency,
      spent,
      start_date,
      end_date,
      description,
      status,
      impressions,
      clicks,
      conversions,
    ]
  );

  return getCampaignById(result.insertId);
}

export async function updateCampaign(id, data) {
  const {
    client_id = null,
    name,
    client,
    platform,
    objective,
    budget = 0,
    currency = "SAR",
    spent = 0,
    start_date = null,
    end_date = null,
    description = null,
    status = "نشطة",
    impressions = 0,
    clicks = 0,
    conversions = 0,
  } = data;

  const [result] = await db.execute(
    `
      UPDATE campaigns
      SET
        client_id = ?,
        name = ?,
        client = ?,
        platform = ?,
        objective = ?,
        budget = ?,
        currency = ?,
        spent = ?,
        start_date = ?,
        end_date = ?,
        description = ?,
        status = ?,
        impressions = ?,
        clicks = ?,
        conversions = ?
      WHERE id = ?
    `,
    [
      client_id,
      name,
      client,
      platform,
      objective,
      budget,
      currency,
      spent,
      start_date,
      end_date,
      description,
      status,
      impressions,
      clicks,
      conversions,
      id,
    ]
  );

  if (result.affectedRows === 0) {
    return null;
  }

  return getCampaignById(id);
}

export async function getCampaignsByClientId(clientId) {
  const [rows] = await db.execute(
    `
      SELECT
        id,
        client_id,
        name,
        client,
        platform,
        objective,
        budget,
        currency,
        spent,
        start_date,
        end_date,
        description,
        status,
        impressions,
        clicks,
        conversions,
        created_at,
        updated_at
      FROM campaigns
      WHERE client_id = ?
      ORDER BY id DESC
    `,
    [clientId]
  );

  return rows;
}

export async function deleteCampaign(id) {
  const [result] = await db.execute(
    "DELETE FROM campaigns WHERE id = ?",
    [id]
  );

  return result.affectedRows > 0;
}

