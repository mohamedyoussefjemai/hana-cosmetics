const { isEmpty } = require('./isEmpty.js');

const validateSubCategoryInput = (data) => {
  let alert = '';
  if (isEmpty(data.name)) {
    alert = 'Name cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.main_category)) {
    alert = 'main category cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  return { alert, isValid: isEmpty(alert) };
};

module.exports = { validateSubCategoryInput };
