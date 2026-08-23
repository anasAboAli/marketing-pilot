import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mysql from "mysql2/promise";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const database = process.env.DB_NAME || process.env.MYSQLDATABASE;

const connectionConfig = {
  host: process.env.DB_HOST || process.env.MYSQLHOST,
  port: Number(process.env.DB_PORT || process.env.MYSQLPORT || 3306),
  user: process.env.DB_USER || process.env.MYSQLUSER,
  password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD,
  database,
  multipleStatements: true,
};

export async function initializeDatabase() {
  const connection = await mysql.createConnection(connectionConfig);

  try {
    const [tables] = await connection.query(
      `
      SELECT COUNT(*) AS count
      FROM information_schema.tables
      WHERE table_schema = ?
      AND table_name IN ('clients', 'campaigns', 'leads')
      `,
      [database]
    );

    const tableCount = Number(tables[0].count);

    if (tableCount === 3) {
      console.log("Database already initialized.");
      return;
    }

    console.log("Database tables are missing. Initializing database...");

    const sqlPath = path.resolve(__dirname, "../../database.sql");
    const sql = fs.readFileSync(sqlPath, "utf8");

    await connection.query(sql);

    console.log("Database initialized successfully.");
  } finally {
    await connection.end();
  }
}