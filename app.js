const express = require("express");
const app = express();
const pg = require("pg");
const valid = require("valid-url");
const sh = require("shorthash");

let json = new Object();

app.get("/:id", function(req, res, next) {
  let id = req.params.id;

  //Checks of the request is a valid URL
  if (id != "favicon.ico") {
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
      if(err) {
        console.log("Error connecting.");
      }
      let hash = sh.unique(id);

      //Checks if the request is already in DB
      client.query("SELECT FROM links WHERE name = '" + id + "'", function(err, result) {
        done();
        if(err) {
          console.log("Error in query.", err);
        }
        //If it's not in DB it's added
        if(result.rowCount == 0) {
          console.log("Added.")
          client.query("INSERT INTO links(name, short) VALUES($1, $2)",
          [id, hash], function(err, result) {
            done();
            if(err) {
              console.log("Error running query.", err);
            }
            json.original = id;
            json.short = hash;
            res.json(json);
          })
        } else {
          console.log("Already in DB.")
          client.query("SELECT name FROM links WHERE short = '" + id + "'", function(err, result) {
            done();
            if(err) {
              console.log("Error in query.", err);
            }
          })
        }
      })
    })
  }
});
app.listen(process.env.PORT || 3000, function() {
  console.log("Listening on port ", this.address().port, app.settings.env)
});
