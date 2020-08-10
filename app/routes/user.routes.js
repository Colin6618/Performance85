module.exports = app => {
  const users = require("../controllers/user.controller.js");

  const router = require("express").Router();

  // Create a new User
  router.post("/", users.create);

  // Retrieve all Users, params allowed
  router.get("/", users.findAll);

  // Retrieve a single User with id
  router.get("/:id", users.findOne);

  // Update a User with id
  router.put("/:id", users.update);

  // Delete a User with id
  router.delete("/:id", users.delete);

  // Create a new User
  router.delete("/", users.deleteAll);

  // mock login
  router.post("/login", users.login);

  app.use('/api/users', router);
  app.use('/api/user', router);
};