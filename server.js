const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const keys = require("./config/keys");
const port = process.env.Port || 5000;
const product = require("./routes/api/products");
const users = require("./routes/api/users");
const chalk = require("chalk");
const cors = require("cors");


const app = express();
// Initialize cors
// Allow cross origin
app.use(cors());


//Middleware BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(methodOveride("_method"));
// app.set("view engine", "jsx");

// connect to MongoDB Atlas
mongoose.Promise = global.Promise;
mongoose
  .connect(
    keys.mongoDBUrl,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log(chalk.inverse.green(`MongoDB connected`));
  })
  .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());
//Passport config
require("./config/passport")(passport);
app.use("/api/users", users);
app.use("/api/products", product);

app.listen(port, err => {
  if (err) throw err;
  console.log(chalk.inverse.blue(`App is live currently listening on port ${port}`));
});
