const mongoose = require("mongoose");
const dbConfig = require("../config/db.config.js");
const db = {};
mongoose.Promise = global.Promise;

//Collections
db.userModel = require("./user.model.js");
db.performanceModel = require("./performance.model.js");

db.mongoose = mongoose;
db.url = dbConfig.url;

module.exports = db;