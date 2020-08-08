const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const httpResponder = require("./app/middlewares/httpResponder");
require('dotenv').config()
const app = express();

const corsOptions = {
  credentials: true
};

app.use(cors(corsOptions));
app.use(httpResponder);
// content-type - application/json
app.use(bodyParser.json());

// content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

const db = require("./app/models");
// console.log(db)
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Performance85."
  });
});

require("./app/routes/user.routes")(app);
require("./app/routes/performance.routes")(app);
require("./app/routes/comment.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});