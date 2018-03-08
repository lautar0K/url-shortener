const express = require("express");
const app = express();
const pg = require("pg");
const sh = require("shorthash");

let isUrl = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
let json = new Object();

app.get("/:id", function(req, res) {
  req.setTimeout(1000);
  id = req.rawHeaders[req.rawHeaders.indexOf("Referer") + 1];

  if(id.length <= 0) {
    id = req.params.id;
  }

  //Gets path
  let host = "https://fcc-url-shortnr.herokuapp.com/";
  id = id.substr(host.length);
  console.log(id, isUrl.test(id));

  //Checks of the request is a valid URL

app.listen(process.env.PORT || 3000, function() {
  console.log("Listening on port ", this.address().port, app.settings.env)
});
