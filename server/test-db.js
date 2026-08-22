import db from "./db/connection.js";

async function testDatabase() {
  try {
    const [rows] = await db.query("SELECT 1 AS result");

    console.log("MySQL connected successfully:", rows);

    await db.end();

    process.exit(0);
  } catch (error) {
    console.error("MySQL connection failed:");
    console.error(error.message);

    process.exit(1);
  }
}

testDatabase();