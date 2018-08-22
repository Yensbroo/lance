const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function isValidBidInput(data) {
  errors = {};

  data.price = !isEmpty(data.price) ? data.price : "";


  if (Validator.isEmpty(data.price)) {
    errors.price = "Je kan geen leeg bod plaatsen";
  } else if (!Validator.isInt(data.price)) {
    errors.price = "Dit is geen geldig bod";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}