const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables from .env

// Create a new pool using the DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Use the DATABASE_URL from .env
  ssl: {
    rejectUnauthorized: false, // Required for hosted databases like Render
  },
});

// Export a query function to interact with the database
module.exports = {
  query: (text, params) => pool.query(text, params),
};
