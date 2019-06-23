module.exports = app => {
  const cases = require("../controllers/case");

  app.get("api/cases/:caseCode", cases.findOne);

  app.post("api/cases", cases.create);

  app.delete("api/cases/:caseCode", cases.delete);
};
