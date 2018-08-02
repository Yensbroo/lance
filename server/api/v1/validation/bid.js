const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function isValidBidInput(data) {
  errors = {};

  data.price = !isEmpty(data.price) ? data.price : "";


  if (Validator.isEmpty(data.price)) {
    errors.price = "You cannot submit an empty bid";
  }

  if (!Validator.isInt(data.price)) {
    errors.price = "This is not a valid bid";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}