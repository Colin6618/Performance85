const db = require("../models/index.js");

const Performance = db.performanceModel.Performance;

//TODO: Validation against params

/**
 * @route GET /api/performances/:performanceId/comments
 * @description GET all comments with a specified performanceId
 * @type RequestHandler
 */
exports.getComments = async (req, res) => {
  try {
    const pfmc = await Performance.findOne({ _id: req.params.performanceId });
    if (!pfmc)
      return res.notFound({
        message: `Performance#${req.params.performanceId} Not Found`,
      });

    res.ok({ data: pfmc.comments });
  } catch (err) {
    console.log(err);
    res.internalError({
      message: "Something went wrong while getting comments",
    });
  }
};

/**
 * @route PATCH /api/performances/:performanceId/comments
 * @description add a comments to a specified performanceId
 * @type RequestHandler
 */
exports.createComment = async (req, res) => {
  if (!req.body.body || !req.user.username)
    return res.unprocessable({ message: "Content can not be empty!" });

  try {
    const pfmc = await Performance.findOne({ _id: req.params.performanceId });
    if (!pfmc)
      return res.notFound({
        message: `Performance#${req.params.performanceId} Not Found`,
      });

    // TODO: User info should be in session or get by token.
    let authorDetails = {
      username: req.user.username,
      name: req.user.name,
      _id: req.user.id,
    };

    pfmc.comments.push({
      body: req.body.body,
      author: authorDetails,
    });

    let newPFMC = await pfmc.save();

    res.ok({ data: newPFMC.comments[newPFMC.comments.length - 1] });
  } catch (err) {
    res.internalError({
      message: "Something went wrong while adding new comment",
    });
  }
};

/**
 * @route PATCH /api/performances/:performanceId/comments/:comment_id
 * @description update a comments from specified performanceId, comment_id
 * @type RequestHandler
 */
exports.updateComment = async (req, res) => {
  if (!req.body.body || !req.body.author)
    return res.unprocessable({ message: "Content can not be empty!" });

  try {
    const pfmc = await Performance.findOneAndUpdate(
      {
        _id: req.params.performanceId,
        comments: {
          $elemMatch: {
            _id: req.params.comment_id,
            "author._id": req.body.author.id,
          },
        },
      },
      { $set: { "comments.$.body": req.body.body } },
      { new: true, runValidators: true }
    );

    if (!pfmc)
      return res.notFound({
        message: `Performance#${req.params.performanceId} Not Found`,
      });

    res.ok({
      data: pfmc.comments.filter((e) => e.id === req.params.comment_id)[0],
    });
  } catch (err) {
    console.log(err);
    res.internalError({
      message: `Something went wrong while updating comment #${req.params.comment_id}`,
    });
  }
};

/**
 * @route DELETE /api/performances/:performanceId/comments/:comment_id
 * @description remove a comments from specified performanceId
 * @type RequestHandler
 */
exports.deleteComment = async (req, res) => {
  try {
    const pfmc = await Performance.findOneAndUpdate(
      { _id: req.params.performanceId },
      {
        $pull: {
          comments: {
            _id: req.params.comment_id
          },
        },
      },
      { new: true, select: "comments" }
    );
    if (!pfmc)
      return res.notFound({
        message: `Performance#${req.params.performanceId} Not Found`,
      });

    res.ok({ data: pfmc.comments });
  } catch (err) {
    res.internalError({
      message: `Something went wrong while deleting comment #${req.params.comment_id}`,
    });
  }
};
