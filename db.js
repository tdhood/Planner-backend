/** Database setup for Bullet. */

const { Client } = require("pg");

const DB_URI = process.env.NODE_ENV === "test"
    ? "postgresql:///bullet_test"
    // : "postgresql:///bullet"
    : "postgresql://kestrel:obliviate@localhost/bullet";

let db = new Client({
  connectionString: DB_URI
});

db.connect();

module.exports = db;