const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const crypto = require('crypto');

//Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateProductInput = require("../../validation/productValidation");

// Load User Model
const User = require("../../models/User");

// Load Product Model
const Product = require("../../models/Products");


// create storage
// const storage = new GridFsStorage({
//   url: keys.mongoDBUrl,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString("hex") + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: "uploads"
//         };
//         resolve(fileInfo)
//       });
//     });
//   }
// });
// const upload = multer({ storage })




//@route GET api/products
// @desc get all products listed

router.get('/', (req, res) => {
  Product.find()
    .sort({date: -1})
    .then(products => res.json(products))
    .catch(err => res.status(404).json({
      error: "No listed items"
    }));
});

//@route POST api/products/register
//@desc Register new users
//@access Public
router.post("/register", (req, res) => {
  //Form validation

  const  { errors, isValid } = validateRegisterInput(req.body)

  //Check Validation
  if(!isValid){
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user =>{
    if(user){
      return res.status(400).json({ email: "Email already exists" })
    }
    const newUser = new User({
      name: req.body.name,
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password
    });
    // Hash password before saving in database

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err,hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
      });
    });
  });  
});

//@route POST api/products/login
//@desc Login user and return JWT token
//@access Public

router.post("/login", (req, res) => {
  //Form validation
  const { errors, isValid } = validateLoginInput(req.body);

  //Check validaiton
  if(!isValid){
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  //Find by user email
  User.findOne({ email }).then(user => {
    //Check if email exists
    if(!user){
      return res.status(404).json({ emailNotFound: "Email not found" });
    }
    //Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if(isMatch){
        //User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };
        //Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
        .status(400)
        .json({ passwordIncorrect: "Incorrect password" })
      }
    });
  });
});

// @route GET api/products/name
// @desc Search by ProductName
router.get("/name", (req, res) => {
  const { errors, isValid } = validateProductInput(req.query);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  let nameRegex = new RegExp(req.query.productName);
  Product.find({ productName: nameRegex })
    .then(results => {
      if (!results.length) {
        res.send(`No Results Found`);
      }
      res.json(results);
      // console.log(results)
    })
    .catch(error =>
      res.status(404).json({
        error: "No results found"
      })
    );
});

// @route GET api/products/
// @desc Search by ProductName
// Create new user Route
router.post("/", (req, res) => {
  const { errors, isValid } = validateProductInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const newProduct = new Product({
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    productName: req.body.productName,
    price: req.body.price,
    description: req.body.description
  });
  newProduct.save().then(product => {
    console.log(`New Product Listed`);
    console.log(product);
    res.json(product);
  });
});

module.exports = router;
