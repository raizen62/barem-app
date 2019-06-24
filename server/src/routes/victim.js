module.exports = app => {
  const victims = require("../controllers/victim");

  app.get("/victims/:context", victims.findAllByContext);

  app.post("/victims", victims.create);
};
