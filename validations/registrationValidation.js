const validator = require('validator');
const { isEmpty } = require('./isEmpty.js');

const validateRegisterInput = (data) => {
  const errors = {};

  // check email field
  if (isEmpty(data.email)) {
    errors.email = 'Email cannot be empty';
  } else if (!validator.isEmail(data.email)) {
    errors.email = 'Email is not valid';
  }
  // check role field
  if (isEmpty(data.role)) {
    errors.email = 'role cannot be empty';
  }

  // check password
  if (isEmpty(data.password)) {
    errors.password = 'Password cannot be empty';
  } else if (!validator.isLength(data.password, { min: 6, max: 150 })) {
    errors.password = 'Password must be between 6 and 150 characters long';
  }

  // check confirm password
  if (isEmpty(data.confirmPassword)) {
    errors.confirmPassword = 'confirm Password cannot be empty';
  } else if (!validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = 'Password & confirmPassword are not equal';
  }
  return { errors, isValid: isEmpty(errors) };
};

module.exports = { validateRegisterInput };
