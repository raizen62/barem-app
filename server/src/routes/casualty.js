module.exports = app => {
    const casualties = require("../controllers/casualty");

    app.get("/casualties/context/:context", casualties.findAllByContext);

    app.get("/casualties/:id", casualties.findOne);

    app.get("/casualties", casualties.findAll);

    app.post("/casualties", casualties.create);

    app.delete("/casualties/:id", casualties.deleteOne)
};
