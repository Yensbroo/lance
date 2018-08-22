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
    errors.full_name = "Je naam moet tussen de 4 en 30 karakters bevatten";
  }

  if (Validator.isEmpty(data.full_name)) {
    errors.full_name = "Een naam is verplicht";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Een emailadres is verplicht";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Dit is geen geldig emailadres';
  }


  if (Validator.isEmpty(data.password)) {
    errors.password = "Een wachtwoord is verplicht";
  }

  if (!Validator.isLength(data.password, {
      min: 6,
      max: 30
    })) {
    errors.password = "Je wachtwoord moet tussen de 6 en 30 karakters bevatten";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Je moet je wachtwoord bevestigen";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "De wachtwoorden komen niet overeen"
  }


  return {
    errors,
    isValid: isEmpty(errors)
  }
}