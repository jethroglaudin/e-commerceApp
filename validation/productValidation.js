const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateProductInput(data) {
  let errors = {};
  let phoneNumberRegx = /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/;
  //Convert empty fields to an empty string so we can validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : "";
  data.productName = !isEmpty(data.productName) ? data.productName : "";
  data.price = !isEmpty(data.price) ? data.price : "";
  data.description = !isEmpty(data.description) ? data.description : "";

  //name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  // Email Checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  // phonenumber checks
  if (Validator.isEmpty(data.phoneNumber)) {
    errors.phoneNumber = "Phone Number field is required";
  } else if (!Validator.matches(data.phoneNumber, phoneNumberRegx)) {
    errors.phoneNumber = "Phone Number is invalid";
  }
  // product name checks
  if (Validator.isEmpty(data.productName)) {
    errors.productName = "Product Name is required";
  }
  if (Validator.isEmpty(data.productName)) {
    errors.productName = "Name field is required";
  }
  // price checks
  if (Validator.isEmpty(data.price)) {
    errors.price = "Price is required";
  } else if (!Validator.isCurrency(data.price)) {
    errors.price = "Price is invalid";
  }
  // Description checks
  if (Validator.isEmpty(data.description)) {
    errors.description = "Description is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
