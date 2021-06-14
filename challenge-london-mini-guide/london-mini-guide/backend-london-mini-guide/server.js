const express = require("express");
const app = express();
const cors = require("cors");
const harrow = require("./data/Harrow.json");
const stratford = require("./data/Stratford.json");
const heathrow = require("./data/Heathrow.json");

const port = 3001;

app.use(cors()); 

const cities = { harrow, stratford, heathrow };

app.get("/:city/:category", (request, response) => {
  const city = request.params.city;
  const category = request.params.category;
  response.send(cities[city][category]);
});

const listener = app.listen(process.env.PORT || port, () => {
  console.log("listening on", port);
});
