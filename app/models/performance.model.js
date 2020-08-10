const mongoose = require("mongoose");
const { UserInfoSchema } = require("./user.model");
const { CommentSchema } = require("./comment.model");

const schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      maxlength: 100,
    },
    body: {
      type: String,
      required: true,
      maxLength: 1000,
    },
    date_opened: {
      type: Date,
      default: Date.now,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    assignBy: {
      type: UserInfoSchema,
      required: true,
    },
    subject: {
      type: UserInfoSchema,
      required: true,
    },
    invitees: [
      {
        type: UserInfoSchema,
      },
    ],
    comments: [
      {
        type: CommentSchema,
      },
    ],
  },
  {
    timestamps: true,
  }
);

schema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  object.author = object.assignBy;

  return object;
});

const Performance = mongoose.model("performance", schema);

module.exports.Performance = Performance;
