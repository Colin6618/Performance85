const mongoose = require("mongoose");
const { UserInfoSchema } = require("./user.model");

const CommentSchema = mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
      maxLength: 1000,
    },
    date_opened: {
      type: Date,
      default: Date.now,
    },
    author: {
      type: UserInfoSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

CommentSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Comment = mongoose.model("comment", CommentSchema);

module.exports.Comment = Comment;
module.exports.CommentSchema = CommentSchema;
