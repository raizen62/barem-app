import "dotenv/config";
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();

// Body Parser pentru JSON bodies in JS objects

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
require("./routes/case")(app);

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

// Dam enable la CORS
app.use(cors());

// Adaugam Helmet pentru a imbunatati securitatea

app.use(helmet());

// Sa putem sa logam chestii pentru APIuri

app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);
