// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api", (req, res) => {
  let fecha = new Date();
  res.json({
    unix: fecha.getTime(),
    utc: fecha.toUTCString(),
  });
});

// your first API endpoint...
app.get("/api/:date?", (req, res) => {
  const consulta = req.params.date;
  let fecha;

  if (consulta.includes("-")) {
    fecha = new Date(consulta);
  } else {
    fecha = new Date(Number(consulta));
  }

  if (fecha.getTime() == null || fecha.toUTCString() == "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: Number(fecha.getTime()),
      utc: fecha.toUTCString(),
    });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
