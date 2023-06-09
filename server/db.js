// const Pool = require("pg").Pool;

// client = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "postgres",
//   password: "admin",
//   port: 5432,
// });

// module.exports = client;

// Loading and initializing the library:
const pgp = require("pg-promise")();

// Creating a new database instance from the connection details:
const client = pgp({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "admin",
  port: 5432,
});

// Exporting the database object for shared use:
module.exports = {
  pgp,
  client,
};
