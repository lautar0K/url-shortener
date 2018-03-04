const express = require("express");
const app = express();
const pg = require("pg");
const valid = require("valid-url");

app.get("/:id", function(req, res, next) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if(err) {
      console.log("Error connecting.");
    }
    client.query("INSERT INTO links(name, short) VALUES($1, $2) returning Id",
    req.url, Math.round(Math.random * 10000), function(err, result) {
      done();
      if(err) {
        console.log("Error running query.");
      }
      res.send(result);
    })
  })
});
app.listen(process.env.PORT || 3000, function() {
  console.log("Listening on port ", this.address().port, app.settings.env)
});
