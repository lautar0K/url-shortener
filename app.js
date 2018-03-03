const express = require("express");
const app = express();
const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
client.connect();

app.get("/:id", function(req, res) {
  client.query("INSERT INTO links values(" + req.url + ")").then((result) => {
    res.end(`${result.name}\n`);
    client.end();
  })
});
app.listen(process.env.PORT || 3000, function() {
  console.log("Listening on port ", this.address().port, app.settings.env)
});
