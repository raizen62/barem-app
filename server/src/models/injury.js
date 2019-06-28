const mongoose = require("mongoose");

const InjurySchema = mongoose.Schema({
  nume: String,
  manevre: [{
      descriere: String,
      punctajMaxim: Number,
      punctajMinim: Number
  }],
  locatie: [String]
});

module.exports = mongoose.model("Injuries", InjurySchema);
