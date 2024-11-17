const { Pool } = require('pg');
require('dotenv').config();

// Create a new pool using the DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, 
  },
});

// Export a query function to interact with the database
module.exports = {
  query: (text, params) => pool.query(text, params),
};
