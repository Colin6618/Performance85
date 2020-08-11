module.exports = app => {
  const performances = require("../controllers/performance.controller.js");

  const router = require("express").Router();

  // Create a new Performance
  router.post("/", performances.create);

  // Retrieve all Performances, params allowed
  router.get("/", performances.findAll);

  // Retrieve a single Performance with id
  router.get("/:id", performances.findOne);

  // Update a Performance with id
  router.put("/:id", performances.update);

  // Delete a Performance with id
  router.delete("/:id", performances.delete);

  // Create a new Performance
  router.delete("/", performances.deleteAll);

  app.use('/api/performances', router);

};