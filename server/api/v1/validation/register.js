const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.full_name = !isEmpty(data.full_name) ? data.full_name : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.full_name, {
      min: 4,
      max: 30
    })) {
    errors.full_name = "Your name must be between 4 and 30 characters";
  }

  if (Validator.isEmpty(data.full_name)) {
    errors.full_name = "A name is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }


  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  if (!Validator.isLength(data.password, {
      min: 6,
      max: 30
    })) {
    errors.password = "Password must be between 6 and 30 characters";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "You have to confirm your password";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match"
  }


  return {
    errors,
    isValid: isEmpty(errors)
  }
}