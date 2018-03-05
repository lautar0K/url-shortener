const express = require("express");
const app = express();
const pg = require("pg");
const valid = require("valid-url");
const sh = require("shorthash");

let urlRegex = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
let json = new Object();

app.get("/:id", function(req, res, next) {
  let id = req.params.id;
  //Checks of the request is a valid URL
  if (id.test(urlRegex) && id != "favicon.ico") {
    console.log("Valid URL");
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
        }
      })
    })
  }
});
app.listen(process.env.PORT || 3000, function() {
  console.log("Listening on port ", this.address().port, app.settings.env)
});
