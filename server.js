const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const keys = require("./config/keys");
const port = process.env.Port || 4000;
const product = require("./routes/api/Products");

const app = express();
//Middleware BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// connect to MongoDB Atlas
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoDBUrl, { useNewUrlParser: true }).then(() => {
  console.log(`MongoDB connected`);
});

//Passport middleware
app.use(passport.initialize());
//Passport config
require("./config/passport")(passport);
app.use("/api/products", product);

app.listen(port, err => {
  if (err) throw err;
  console.log(`App is live currently listening on port ${port}`);
});
