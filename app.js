const express = require("express");
const app = express();
const pg = require("pg");
const valid = require("valid-url");
const crypto = require("crypto");

let json = new Object();

app.get("/:id", function(req, res, next) {
  let id = req.params.id;
  console.log(valid.isUri(id));
  if(valid.isUri(id) == false) {
    json.short = "Invalid URL";
  } else if (id != "favicon.ico") {
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
      if(err) {
        console.log("Error connecting.");
      }
      let hash = crypto.createHash("sha1")
                        .update(id)
                        .digest("hex"));

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
    })
  }
});
app.listen(process.env.PORT || 3000, function() {
  console.log("Listening on port ", this.address().port, app.settings.env)
});
