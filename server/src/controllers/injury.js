const Injury = require("../models/injury");

exports.findAll = (req, res) => {
    Injury.find()
    .then(injuries => {
        res.send(injuries);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving the injuries."
        });
    });
  };