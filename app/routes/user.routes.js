module.exports = (app) => {
  const users = require("../controllers/user.controller.js");

  const router = require("express").Router();

  // Create a new User
  router.post("/", users.create);
  router.post("/signup", users.create);

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

  // Login
  router.post("/login", users.login);

  router.post("/logout", users.logout);

  // check-auth
  router.post("/check-auth", users.checkAuth);

  app.use("/api/users", router);
  app.use("/api/user", router);
};
