const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProjectInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.body = !isEmpty(data.body) ? data.body : "";
  data.budget = !isEmpty(data.budget) ? data.budget : "";
  data.category_id = !isEmpty(data.category_id) ? data.category_id : "";
  data.project_start = !isEmpty(data.project_start) ? data.project_start : "";
  data.project_end = !isEmpty(data.project_end) ? data.project_end : "";
  data.project_start = !isEmpty(data.project_start) ? data.project_start : "";

  if (!Validator.isLength(data.title, {
      min: 10,
      max: 100
    })) {
    errors.title = "Je titel moet tussen de 10 en 100 karakters bevatten";
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = "Een titel is verplicht";
  }

  if (Validator.isEmpty(data.category_id)) {
    errors.category_id = "Een categorie is verplicht";
  }

  if (!Validator.isLength(data.body, {
      min: 50,
      max: 1000
    })) {
    errors.body = "Je beschrijving moet tussen de 50 en 1000 karakters bevatten";
  }

  if (Validator.isEmpty(data.body)) {
    errors.body = "Een beschrijving is verplicht";
  }

  if (!Validator.isInt(data.budget)) {
    errors.budget = "Je budget moet een getal zijn"
  }

  if (Validator.isEmpty(data.budget)) {
    errors.budget = "Een budget is verplicht"
  }

  if (Validator.isEmpty(data.project_start)) {
    errors.project_start = "Een start datum is verplicht";
  }

  if (!Validator.isAfter(data.project_end, data.project_start)) {
    errors.project_end = "Je eind datum mag niet voor je start datum zijn"
  }

  if (Validator.isEmpty(data.project_end)) {
    errors.project_end = "Een eind datum is verplicht";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}