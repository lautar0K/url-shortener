const express = require("express");
const app = express();
const pg = require("pg");
const sh = require("shorthash");

let isUrl = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
let json = new Object();

app.get("/url/*", function(req, res) {
  id = req.params.id;
  console.log(id);

});
app.listen(process.env.PORT || 3000, function() {
  console.log("Listening on port ", this.address().port, app.settings.env)
});
