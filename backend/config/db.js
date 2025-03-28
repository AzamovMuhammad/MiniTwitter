// const { Pool } = require("pg");

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "miniTwitter",
//   password: "1234",
//   port: 5432, 
// });

// module.exports = pool;


const { Pool } = require("pg");

const pool = new Pool({
  connectionString: "postgresql://azamov:ZDMepdh9nvkbH0OkV3fIc1HzVT8sgw5Z@dpg-cvja59mr433s73aiocgg-a.oregon-postgres.render.com/mini_twitter_giw0",
  ssl: {
    rejectUnauthorized: false, // Required for Render PostgreSQL
  },
});

module.exports = pool;
