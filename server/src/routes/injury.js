module.exports = app => {
    const injuries = require("../controllers/injury");
  
    app.get("/injuries", injuries.findAll);
  };
  