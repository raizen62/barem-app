module.exports = app => {
    const injuries = require("../controllers/injury");

    app.get("/injuries", injuries.findAll);

    app.get("/injuries/:id", injuries.findOne)

    app.post("/injuries", injuries.create);

    app.delete("/injuries/:id", injuries.delete);
};
  