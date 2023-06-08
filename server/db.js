const Pool = require("pg").Pool;

client = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "admin",
  port: 5432,
});

module.exports = client;
