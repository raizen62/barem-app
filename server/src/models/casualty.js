const mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

const CasualtySchema = mongoose.Schema({
    name: String,
    context: [{type: String}],
    age: Number,
    details: String,
    injuries: [{
        type: ObjectId,
        ref: 'Injuries'
    }]
});

module.exports = mongoose.model("Casualties", CasualtySchema);
