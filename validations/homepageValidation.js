const { isEmpty } = require('./isEmpty.js');

const validateHomepageInput = (data) => {
  let alert = '';
  if (isEmpty(data.video)) {
    alert = 'Video cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  return { alert, isValid: isEmpty(alert) };
};

module.exports = { validateHomepageInput };
