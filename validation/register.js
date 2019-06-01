const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  //Convert empty fields to an empty string
  data.name = !isEmpty(data.name) ? data.name : "";
  data.userName = !isEmpty(data.userName) ? data.userName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  //Name Checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  if (Validator.isEmpty(data.userName)){
      errors.userName = "Username field is required";
  } else if (!Validator.isLength(data.userName, { min: 5, max: 30 })){
      errors.userName = "Username must be at least 5 characters";
  }
  // Email Checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  //Password Checs
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
