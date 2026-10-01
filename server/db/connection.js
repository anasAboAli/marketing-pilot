import mysql from "mysql2/promise";
import { connectionConfig } from "./config.js";

const pool = mysql.createPool({
  ...connectionConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
