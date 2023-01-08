const { isEmpty } = require('./isEmpty.js');

const validateCategoryInput = (data) => {
  let alert = '';
  if (isEmpty(data.name)) {
    alert = 'Name cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  return { alert, isValid: isEmpty(alert) };
};

module.exports = { validateCategoryInput };
