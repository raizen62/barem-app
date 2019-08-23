const Casualty = require("../models/casualty");

exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Continutul victimei nu poate fi gol"
    });
  }

    const casualty = new Casualty({
    name: req.body.name,
    context: req.body.context,
    age: req.body.age,
    details: req.body.details,
    injuries: req.body.injuries
  });

    casualty
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ceva a decurs prost la crearea victimei."
      });
    });
};

exports.deleteOne = (req, res) => {
    Casualty.findOneAndRemove({id: req.params.id})
        .then(casualty => {
            if (!casualty) {
        return res.status(404).send({
          message: "Nu a fost gasit nici o victima cu acest cod"
        });
      }
      res.send({ message: "Victima a fost stears cu succes!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Victima cu acest cod nu a fost gasit"
        });
      }
      return res.status(500).send({
        message: "Nu s-a putut sterge victima cu acest cod"
      });
    });
};

exports.findAllByContext = (req, res) => {
    Casualty.find({context: req.params.context})
    .populate("injuries")
        .then(casualty => {
            if (!casualty) {
        return res.status(400).send({
          message: "Nu a fost gasit nici un victima cu acest cod"
        });
      }
            res.send(casualty);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Victima cu acest context nu se poate gasi"
        });
      }
      return res.status(500).send({
        message: "Ceva a decurs prost in cautarea acestui context de victime."
      });
    });
};

exports.findAll = (req, res) => {
    Casualty.find()
    .populate("injuries")
        .then(casualties => {
            res.send(casualties);
    })
    .catch(err => {
      res.status(500).send({
          message: err.message || "Something wrong while retrieving the casualties."
      });
    });
};

exports.findOne = (req, res) => {
    Casualty.findById(req.params.id)
        .populate('injuries')
        .then(casualty => {
            if (!casualty) {
                return res.status(400).send({
                    message: "No casualty with this id was found"
                })
            }
            res.send(casualty)
        })
        .catch(err => {
            return res.status(500).send({
                message: "Something went wrong in finding this casualty"
            })
        })
}
