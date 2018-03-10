const express = require("express");
const app = express();
const pg = require("pg");
const sh = require("shorthash");

let isUrl = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
let json = new Object();

app.get("/:url/:id", function(req, res) {
  console.log(req);
  res.end();


 /*
  //Gets path
  let host = "https://fcc-url-shortnr.herokuapp.com/url/";

  //Checks of the request is a valid URL
  if(id.length > 0 && isUrl.test(id)) {
    if (id != "favicon.ico") {
      console.log(id);
        pg.connect(process.env.DATABASE_URL, function(err, client, done) {
          if(err) {
            console.log("Error connecting.");
          }
          let hash = sh.unique(id);
          json.original = host + id;
          json.short = hash;

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
              })

           } else {
             console.log("Already in DB.");
          }
        })
      })
    }
    res.json(json);
  } */
});
app.listen(process.env.PORT || 3000, function() {
  console.log("Listening on port ", this.address().port, app.settings.env)
});
