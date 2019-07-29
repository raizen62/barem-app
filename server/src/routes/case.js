module.exports = app => {
  const cases = require("../controllers/case");

  app.get("/cases/:caseCode", cases.findOne);

    app.get('/cases', cases.findAll);

  app.post("/cases", cases.create);

  app.delete("/cases/:caseCode", cases.delete);
};
