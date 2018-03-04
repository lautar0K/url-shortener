const express = require("express");
const app = express();
const pg = require("pg");
let pool = new pg.Pool("postgres://yzlurtetpcmmtd:8d5734a5ac55fe3950ae4466a6b6c19a69ea51da87d26020def7551e6af2f692@ec2-174-129-26-203.compute-1.amazonaws.com:5432/dc82nloal602j1");
const valid = require("valid-url");

app.get("/:id", function(req, res, next) {
  pool.connect(function(err, client, done) {
    if(err) {
      console.log("Error connecting.");
    }
    client.query("INSERT INTO links(url, code) VALUES($1, $2) returning id",
    [req.url], Math.round(Math.random * 10000), function(err, result) {
      done();
      if(err) {
        console.log("Error running query.");
      }
      console.log("Done.");
    });
  });
});
app.listen(process.env.PORT || 3000, function() {
  console.log("Listening on port ", this.address().port, app.settings.env)
});
