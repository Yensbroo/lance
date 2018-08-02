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
    errors.title = "Your title must be between 10 and 100 characters";
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = "A title is required";
  }

  if (Validator.isEmpty(data.category_id)) {
    errors.category_id = "A category is required";
  }

  if (!Validator.isLength(data.body, {
      min: 50,
      max: 1000
    })) {
    errors.body = "Your description must be between 50 and 1000 characters";
  }

  if (Validator.isEmpty(data.body)) {
    errors.body = "A description is required";
  }

  if (!Validator.isInt(data.budget)) {
    errors.budget = "Your budget must be a number"
  }

  if (Validator.isEmpty(data.budget)) {
    errors.budget = "A budget is required"
  }

  if (Validator.isEmpty(data.project_start)) {
    errors.project_start = "A start date is required";
  }

  if (!Validator.isAfter(data.project_end, data.project_start)) {
    errors.project_end = "Your end date must be after your start date"
  }

  if (Validator.isEmpty(data.project_end)) {
    errors.project_end = "An end date is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}