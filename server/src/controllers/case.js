const Case = require("../models/case");

exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Continutul cazului nu poate fi gol"
    });
  }

  function generateCode(length) {
    let random_string = "";
    let random_ascii;
    for (let i = 0; i < length; i++) {
      random_ascii = Math.floor(Math.random() * 25 + 97);
      random_string += String.fromCharCode(random_ascii);
    }
    return random_string;
  }

  const codCaz = generateCode(4);

  const caz = new Case({
    caseCode: codCaz,
    victims: req.body.victims
  });

  caz
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ceva a decurs prost la crearea cazului."
      });
    });
};

exports.findOne = (req, res) => {
  Case.find({ caseCode: req.params.caseCode })
    .then(caz => {
      if (!caz) {
        return res.status(400).send({
          message: "Nu a fost gasit nici un caz cu acest cod"
        });
      }
      res.send(caz);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Cazul cu acest cod nu se poate gasi"
        });
      }
      return res.status(500).send({
        message: "Ceva a decurs prost in cautarea acestui cod de caz."
      });
    });
};

exports.delete = (req, res) => {
  Case.findOneAndRemove({ caseCode: req.params.caseCode })
    .then(caz => {
      if (!caz) {
        return res.status(404).send({
          message: "Nu a fost gasit nici un caz cu acest cod"
        });
      }
      res.send({ message: "Cazul a fost sters cu succes!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Cazul cu acest cod nu a fost gasit"
        });
      }
      return res.status(500).send({
        message: "Nu s-a putut sterge cazul cu acest cod"
      });
    });
};
