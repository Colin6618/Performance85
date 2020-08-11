const jwt = require("jsonwebtoken");
const db = require("../models/index.js");
const User = db.userModel.User;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.email || !req.body.name || !req.body.password) {
    res.status(400).send({
      error: "Content can not be empty!",
    });
    return;
  }

  const name = req.body.name;
  const email = req.body.email;
  const username = email.slice(0, email.indexOf("@"));
  // Create a User
  const user = new User({
    name: name,
    username: username,
    email: email,
    password: req.body.password, //TODO: Should be encriped.
    bio: req.body.bio,
    group: req.body.group || "Employee", // TODO: Should be enhanced.
  });

  // Save User in the database
  user
    .save(user)
    .then((data) => {
      res.send({ data });
    })
    .catch((err) => {
      res.status(500).send({
        error: err.message || "Some error occurred while creating the User.",
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const group = req.query.group;
  const condition = group
    ? {
        group: {
          $regex: new RegExp(group),
          $options: "i",
        },
      }
    : {};

  User.find(condition)
    .then((data) => {
      res.send({ data });
    })
    .catch((err) => {
      res.status(500).send({
        error: err.message || "Some error occurred while retrieving users.",
      });
    });
};

const ObjectId = require("mongoose").Types.ObjectId;
// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  const $or = [{ username: id }];

  // Does it look like an ObjectId? If so, convert it to one and
  // add it to the list of OR operands.
  if (ObjectId.isValid(id)) {
    $or.push({ _id: ObjectId(id) });
  }

  User.findOne({ "$or": $or })
    .then((data) => {
      if (!data)
        res.status(404).send({
          error: "Not found User with id " + id,
        });
      else res.send({ data });
    })
    .catch((err) => {
      res.status(500).send({
        error: "Error retrieving User with id=" + id,
      });
    });

  //   User.findById(id)
  //     .then((data) => {
  //       if (!data)
  //         res.status(404).send({
  //           error: "Not found User with id " + id,
  //         });
  //       else res.send({ data });
  //     })
  //     .catch((err) => {
  //       res.status(500).send({
  //         error: "Error retrieving User with id=" + id,
  //       });
  //     });
};
// Update a User by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      error: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          error: `Failed update User with id=${id}. User was not found!`,
        });
      } else
        res.send({
          error: "User was updated successfully.",
        });
    })
    .catch((err) => {
      res.status(500).send({
        error: "Internal error while updating User with id=" + id,
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          error: `Cannot delete User with id=${id}. User was not found!`,
        });
      } else {
        res.send({
          error: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: "Internal error, Could not delete User with id=" + id,
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.deleteMany({})
    .then((data) => {
      res.send({
        error: `${data.deletedCount} Users were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        error: err.message || "Some error occurred while removing all users.",
      });
    });
};

exports.login = async (req, res) => {
  if (!req.body.email) {
    return res.unprocessable({ error: "email can not be empty!" });
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.notFound({ error: "Email does not exists" });

  const secret = process.env.SECRET;

  //generate token
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      group: user.group,
    },
    secret,
    {
      expiresIn: "2h",
    }
  );

  res
    .status(200)
    .cookie("jwt", token, { maxAge: 2 * 3600000 })
    .send({
      data: {
        isVerified: true,
        username: user.username,
        provider: "local",
        name: user.name,
        email: user.email,
        avatarUrl: "",
        id: user.id,
        group: user.group,
      },
    });
};

exports.logout = async (req, res) => {
  res.status(200).clearCookie("jwt").send({ message: "logged out" });
};

exports.checkAuth = async (req, res) => {
  res.ok({ data: req.user });
};
