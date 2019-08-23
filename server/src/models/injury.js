const mongoose = require("mongoose");

const InjurySchema = mongoose.Schema({
    name: String,
    maneuvers: [{
        description: String,
        score: {
            maximum: Number,
            average: Number
        }
    }],
    location: [String]
});

module.exports = mongoose.model("Injuries", InjurySchema);
