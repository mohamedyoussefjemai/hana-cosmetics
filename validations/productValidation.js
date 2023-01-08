const validator = require('validator');

const { isEmpty } = require('./isEmpty.js');
const { isNumber } = require('./isNumber.js');

const validateProductInput = (data) => {
  let alert = '';
  if (isEmpty(data.name)) {
    alert = 'Name cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.description1)) {
    alert = 'description1 cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.description2)) {
    alert = 'description2 cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.price)) {
    alert = 'price cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (!isNumber(data.price)) {
    alert = 'price must be a number';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.is_new)) {
    alert = 'is_new cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (!validator.isBoolean(data.is_new.toString())) {
    alert = 'is_new must be boolean';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.main_category)) {
    alert = 'main_category cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.sub_category)) {
    alert = 'sub_category cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.instagram_link)) {
    alert = 'instagram link cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  return { alert, isValid: isEmpty(alert) };
};
const validateUpdateProductInput = (data) => {
  let alert = '';
  if (isEmpty(data.name)) {
    alert = 'Name cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.description1)) {
    alert = 'description1 cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.description2)) {
    alert = 'description2 cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.price)) {
    alert = 'price cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (!isNumber(data.price)) {
    alert = 'price must be a number';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.is_new)) {
    alert = 'is_new cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (!validator.isBoolean(data.is_new.toString())) {
    alert = 'is_new must be boolean';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.main_category)) {
    alert = 'main_category cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.sub_category)) {
    alert = 'sub_category cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.instagram_link)) {
    alert = 'Name cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  return { alert, isValid: isEmpty(alert) };
};

module.exports = { validateProductInput, validateUpdateProductInput };
