const mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

const CaseSchema = mongoose.Schema({
  caseCode: String,
  context: String,
  victims: [
    {
      type: ObjectId,
      ref: 'Victims'
    }
  ]
});

module.exports = mongoose.model("Cases", CaseSchema);
