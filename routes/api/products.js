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
const validateProductInput = require("../../validation/productValidation");

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
