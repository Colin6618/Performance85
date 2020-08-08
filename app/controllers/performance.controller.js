const db = require("../models/index.js");
const Performance = db.performanceModel.Performance;

// TODO: performance input should be validated

// Create and Save a new Performance
exports.create = (req, res) => {
    // Simple Validation request 
    if (!req.body.title || !req.body.body || !req.body.assignBy || !req.body.subject) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a Performance
    const performance = new Performance({
        title: req.body.title,
        body: req.body.body,
        assignBy: req.body.assignBy,
        subject: req.body.subject,
        invitees: req.body.invitees || []
    });

    // Save 
    performance
        .save(performance)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Performance."
            });
        });
};


// Retrieve all 
exports.findAll = (req, res) => {
    const subject = req.query.subject;
    const condition = subject ? {
        subject: {
            $regex: new RegExp(subject),
            $options: "i"
        }
    } : {};

    Performance.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving performances."
            });
        });
};

// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Performance.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({
                    message: "Not found with id " + id
                });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({
                    message: "Error retrieving with id=" + id
                });
        });
};
// Update by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Performance.findByIdAndUpdate(id, req.body, {
            useFindAndModify: false
        })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Failed update User with id=${id}. Performance was not found!`
                });
            } else res.send({
                message: "Performance was updated successfully."
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Internal error while updating with id=" + id
            });
        });
};

// Delete a Performance with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Performance.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Performance with id=${id}. Performance was not found!`
                });
            } else {
                res.send({
                    message: "Performance was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Internal error, Could not delete Performance with id=" + id
            });
        });
};

// Delete all Performances from the database.
exports.deleteAll = (req, res) => {
    Performance.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} data were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all performances."
            });
        });
};