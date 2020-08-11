module.exports = (app) => {
  const comments = require("../controllers/comment.controller.js");

  const router = require("express").Router();

  // Get all comments
  router.get("/:performanceId/comments", comments.getComments);
  // Create
  router.patch("/:performanceId/comments", comments.createComment);
  // Update a comment
  router.patch("/:performanceId/comments/:comment_id", comments.updateComment);
  // Delete a comment
  router.delete("/:performanceId/comments/:comment_id", comments.deleteComment);

  app.use("/api/performances", router);
};
