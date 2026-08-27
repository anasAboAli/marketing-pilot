import db from "../db/connection.js";

export async function getSettings() {
  const [rows] = await db.query(`
    SELECT
      id,
      agency_name AS agencyName,
      email,
      phone,
      currency,
      timezone,
      notify_leads AS notifyLeads,
      notify_campaigns AS notifyCampaigns,
      notify_team AS notifyTeam,
      created_at AS createdAt,
      updated_at AS updatedAt
    FROM settings
    ORDER BY id ASC
    LIMIT 1
  `);

  if (rows.length === 0) {
    const [result] = await db.execute(`
      INSERT INTO settings
      (
        agency_name,
        email,
        phone,
        currency,
        timezone,
        notify_leads,
        notify_campaigns,
        notify_team
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      "",
      "",
      "",
      "SAR",
      "Asia/Riyadh",
      1,
      1,
      1,
    ]);

    return getSettings();
  }

  return {
    ...rows[0],
    notifyLeads: Boolean(rows[0].notifyLeads),
    notifyCampaigns: Boolean(rows[0].notifyCampaigns),
    notifyTeam: Boolean(rows[0].notifyTeam),
  };
}

export async function updateSettings(data) {
  const {
    agencyName = "",
    email = "",
    phone = "",
    currency = "SAR",
    timezone = "Asia/Riyadh",
    notifyLeads = true,
    notifyCampaigns = true,
    notifyTeam = true,
  } = data;

  const [existing] = await db.query(`
    SELECT id
    FROM settings
    ORDER BY id ASC
    LIMIT 1
  `);

  if (existing.length === 0) {
    await db.execute(`
      INSERT INTO settings
      (
        agency_name,
        email,
        phone,
        currency,
        timezone,
        notify_leads,
        notify_campaigns,
        notify_team
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      agencyName,
      email,
      phone,
      currency,
      timezone,
      notifyLeads ? 1 : 0,
      notifyCampaigns ? 1 : 0,
      notifyTeam ? 1 : 0,
    ]);
  } else {
    await db.execute(`
      UPDATE settings
      SET
        agency_name = ?,
        email = ?,
        phone = ?,
        currency = ?,
        timezone = ?,
        notify_leads = ?,
        notify_campaigns = ?,
        notify_team = ?
      WHERE id = ?
    `, [
      agencyName,
      email,
      phone,
      currency,
      timezone,
      notifyLeads ? 1 : 0,
      notifyCampaigns ? 1 : 0,
      notifyTeam ? 1 : 0,
      existing[0].id,
    ]);
  }

  return getSettings();
}