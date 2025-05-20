const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

pool.connect()
  .then(() => {
    console.log("✅ PostgreSQL Connected Successfully!");
    return pool.end();
  })
  .catch(err => {
    console.error("❌ Connection Error:", err.message || err);
  });
