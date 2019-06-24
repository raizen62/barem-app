const mongoose = require("mongoose");

const VictimSchema = mongoose.Schema({
  name: String,
  context: [{ type: String }],
  age: Number,
  details: String,
  injuries: [{ type: String }]
});

module.exports = mongoose.model("Victims", VictimSchema);
