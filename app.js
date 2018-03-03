const express = require("express");
const app = express();
const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
client.connect();

client.query("SELECT * FROM links").then(result) {
  console.log('${result.rows[0].name}');
}
  client.end();
})
