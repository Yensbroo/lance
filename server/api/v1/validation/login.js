const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is vereist";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Dit is geen geldig emailadres';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Wachtwoord is vereist";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}