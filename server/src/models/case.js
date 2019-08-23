const mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

const CaseSchema = mongoose.Schema({
  caseCode: String,
  context: String,
    createDate: Date.now(),
    weather: String,
    location: String,
    casualties: [
    {
      type: ObjectId,
        ref: 'Casualties'
    }
  ]
});

module.exports = mongoose.model("Cases", CaseSchema);
