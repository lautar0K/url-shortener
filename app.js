const express = require("express");
const app = express();
const pg = require("pg");
const validUrl = require("valid-url");
const sh = require("shorthash");


let json = new Object();

app.post("/:id", function(req, res) {
  let id = req;
  console.log(id);
  //Checks of the request is a valid URL
  /*if(id != "favicon.ico") {
    console.log(id1);
    if(validUrl.isUri(id) || validUrl.isUri("https://" + id)) {
      console.log(id);
      console.log('Valid URL.');
    } else {
      console.log(id);
      console.log("Invalid URL.")
    }
  }
 */
    /*if (id != "favicon.ico") {
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
    */
});
app.listen(process.env.PORT || 3000, function() {
  console.log("Listening on port ", this.address().port, app.settings.env)
});
