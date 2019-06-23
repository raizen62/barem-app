const mongoose = require("mongoose");

const CaseSchema = mongoose.Schema({
  caseCode: String,
  victims: [
    {
      type: String
    }
  ]
});

module.exports = mongoose.model("Cases", CaseSchema);
