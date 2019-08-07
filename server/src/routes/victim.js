module.exports = app => {
  const victims = require("../controllers/victim");

    app.get("/victims/context/:context", victims.findAllByContext);

    app.get("/victims/:id", victims.findOne);
  
  app.get("/victims", victims.findAll);

  app.post("/victims", victims.create);

  app.delete("/victims/:id", victims.deleteOne)
};
