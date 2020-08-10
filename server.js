require("dotenv-flow").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const expressJwt = require("express-jwt");

const cors = require("cors");
const httpResponder = require("./app/middlewares/httpResponder");

const app = express();

const corsOptions = {
  credentials: true,
};
const secret = process.env.SECRET;

app.use(cors(corsOptions));
app.use(httpResponder);
app.use(cookieParser());
// content-type - application/json
app.use(bodyParser.json());

// content-type - application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//middleware token verify
app.use(
  expressJwt({
    secret: secret,
    algorithms: ["HS256"],
  }).unless({
    path: [
      "/api/users/",
      "/api/user/",
      "/api/user/login",
      "/api/users/login",
      "/api/users/signup",
    ], 
  })
);

//simple interceptor
app.use(function (err, req, res, next) {
  //token failed
  if (err.name === "UnauthorizedError") {
    res.status(401).send({ error: "Invalid token" });
  }
});


const db = require("./app/models/index.js");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Performance85.",
  });
});

require("./app/routes/user.routes")(app);
require("./app/routes/performance.routes")(app);
require("./app/routes/comment.routes")(app);

// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });

module.exports = app;
