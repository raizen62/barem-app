const Victim = require("../models/victim");

exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Continutul victimei nu poate fi gol"
    });
  }

  const victima = new Victim({
    name: req.body.name,
    context: req.body.context,
    age: req.body.age,
    details: req.body.details,
    injuries: req.body.injuries
  });

  victima
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

exports.findAllByContext = (req, res) => {
  Victim.find({ context: req.params.context })
    .then(victima => {
      if (!victima) {
        return res.status(400).send({
          message: "Nu a fost gasit nici un victima cu acest cod"
        });
      }
      res.send(victima);
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
