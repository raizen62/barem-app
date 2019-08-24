require("dotenv/config");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();

app.use(express.static("public"));

// Body Parser pentru JSON bodies in JS objects

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Dam enable la CORS
app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

//Routes
require("./routes/case")(app);
require("./routes/casualty")(app);
require("./routes/injury")(app);
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(
    `mongodb://${process.env.dbUser}:${
      process.env.dbPassword
    }@ds341847.mlab.com:41847/barem-app`,
    {
      useNewUrlParser: true
    }
  )
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

// Adaugam Helmet pentru a imbunatati securitatea

app.use(helmet());

// Sa putem sa logam chestii pentru APIuri

app.use(morgan("combined"));

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
