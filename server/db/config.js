import "dotenv/config";

// Shared MySQL connection settings.
// Hosted providers (Aiven, TiDB, ...) require SSL: set DB_SSL=true,
// and optionally DB_SSL_CA with the provider's CA certificate (PEM text).
function sslConfig() {
  if (process.env.DB_SSL !== "true") return undefined;

  const ca = process.env.DB_SSL_CA?.replace(/\\n/g, "\n");

  return ca ? { ca, rejectUnauthorized: true } : { rejectUnauthorized: false };
}

export const database = process.env.DB_NAME || process.env.MYSQLDATABASE;

export const connectionConfig = {
  host: process.env.DB_HOST || process.env.MYSQLHOST,
  port: Number(process.env.DB_PORT || process.env.MYSQLPORT || 3306),
  user: process.env.DB_USER || process.env.MYSQLUSER,
  password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD,
  database,
  ssl: sslConfig(),
};
