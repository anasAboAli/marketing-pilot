import db from "../db/connection.js";

export async function getReportsSummary(from, to) {
  const [campaignRows] = await db.execute(
    `
      SELECT
        COALESCE(SUM(budget), 0) AS total_budget,
        COALESCE(SUM(spent), 0) AS total_spent,
        COALESCE(SUM(impressions), 0) AS total_impressions,
        COALESCE(SUM(clicks), 0) AS total_clicks,
        COALESCE(SUM(conversions), 0) AS total_conversions
      FROM campaigns
      WHERE
        start_date IS NOT NULL
        AND start_date BETWEEN ? AND ?
    `,
    [from, to]
  );

  const [leadRows] = await db.execute(
    `
      SELECT
        COUNT(*) AS total_leads,
        COALESCE(SUM(value), 0) AS total_lead_value,
        SUM(CASE WHEN status = 'مؤهل' THEN 1 ELSE 0 END) AS qualified_leads,
        SUM(CASE WHEN status = 'غير مؤهل' THEN 1 ELSE 0 END) AS unqualified_leads,
        SUM(CASE WHEN status = 'تم التواصل' THEN 1 ELSE 0 END) AS contacted_leads,
        SUM(CASE WHEN status = 'جديد' THEN 1 ELSE 0 END) AS new_leads
      FROM leads
      WHERE created_at BETWEEN ? AND ?
    `,
    [
      `${from} 00:00:00`,
      `${to} 23:59:59`,
    ]
  );

  const [platformRows] = await db.execute(
    `
      SELECT
        platform,
        COALESCE(SUM(budget), 0) AS budget,
        COALESCE(SUM(spent), 0) AS spent,
        COALESCE(SUM(impressions), 0) AS impressions,
        COALESCE(SUM(clicks), 0) AS clicks,
        COALESCE(SUM(conversions), 0) AS conversions
      FROM campaigns
      WHERE
        start_date IS NOT NULL
        AND start_date BETWEEN ? AND ?
      GROUP BY platform
      ORDER BY spent DESC
    `,
    [from, to]
  );

  const [campaignRowsDetails] = await db.execute(
    `
      SELECT
        id,
        name,
        client,
        platform,
        budget,
        spent,
        impressions,
        clicks,
        conversions,
        status
      FROM campaigns
      WHERE
        start_date IS NOT NULL
        AND start_date BETWEEN ? AND ?
      ORDER BY spent DESC
    `,
    [from, to]
  );

  const [employeeRows] = await db.execute(
    `
      SELECT
        assigned_to AS name,
        COUNT(*) AS leads_count,
        COALESCE(SUM(value), 0) AS total_value,
        SUM(CASE WHEN status = 'مؤهل' THEN 1 ELSE 0 END) AS qualified_leads
      FROM leads
      WHERE
        created_at BETWEEN ? AND ?
        AND assigned_to IS NOT NULL
        AND assigned_to != ''
      GROUP BY assigned_to
      ORDER BY total_value DESC
      LIMIT 10
    `,
    [
      `${from} 00:00:00`,
      `${to} 23:59:59`,
    ]
  );

  const totalBudget = Number(
    campaignRows[0]?.total_budget || 0
  );

  const totalSpent = Number(
    campaignRows[0]?.total_spent || 0
  );

  const totalImpressions = Number(
    campaignRows[0]?.total_impressions || 0
  );

  const totalClicks = Number(
    campaignRows[0]?.total_clicks || 0
  );

  const totalConversions = Number(
    campaignRows[0]?.total_conversions || 0
  );

  const totalLeads = Number(
    leadRows[0]?.total_leads || 0
  );

  const qualifiedLeads = Number(
    leadRows[0]?.qualified_leads || 0
  );

  const totalLeadValue = Number(
    leadRows[0]?.total_lead_value || 0
  );

  const remainingBudget =
    totalBudget - totalSpent;

  const conversionRate =
    totalLeads > 0
      ? (qualifiedLeads / totalLeads) * 100
      : 0;

  const clickThroughRate =
    totalImpressions > 0
      ? (totalClicks / totalImpressions) * 100
      : 0;

  const campaignConversionRate =
    totalClicks > 0
      ? (totalConversions / totalClicks) * 100
      : 0;

  const budgetUsage =
    totalBudget > 0
      ? (totalSpent / totalBudget) * 100
      : 0;

  return {
    period: {
      from,
      to,
    },

    overview: {
      totalBudget,
      totalSpent,
      remainingBudget,

      totalLeads,
      qualifiedLeads,

      totalLeadValue,

      conversionRate:
        Number(conversionRate.toFixed(2)),

      budgetUsage:
        Number(budgetUsage.toFixed(2)),

      totalImpressions,
      totalClicks,
      totalConversions,

      clickThroughRate:
        Number(clickThroughRate.toFixed(2)),

      campaignConversionRate:
        Number(campaignConversionRate.toFixed(2)),
    },

    campaigns: campaignRowsDetails.map((row) => ({
      id: row.id,
      name: row.name,
      client: row.client,
      platform: row.platform,
      budget: Number(row.budget || 0),
      spent: Number(row.spent || 0),
      impressions: Number(row.impressions || 0),
      clicks: Number(row.clicks || 0),
      conversions: Number(row.conversions || 0),
      status: row.status,
    })),

    platforms: platformRows.map((row) => ({
      platform: row.platform,
      budget: Number(row.budget || 0),
      spent: Number(row.spent || 0),
      impressions: Number(row.impressions || 0),
      clicks: Number(row.clicks || 0),
      conversions: Number(row.conversions || 0),
    })),

    employees: employeeRows.map((row) => ({
      name: row.name,
      leadsCount: Number(row.leads_count || 0),
      totalValue: Number(row.total_value || 0),
      qualifiedLeads: Number(
        row.qualified_leads || 0
      ),
    })),

    leads: {
      total: totalLeads,
      new: Number(leadRows[0]?.new_leads || 0),
      contacted: Number(
        leadRows[0]?.contacted_leads || 0
      ),
      qualified: qualifiedLeads,
      unqualified: Number(
        leadRows[0]?.unqualified_leads || 0
      ),
    },
  };
}