const { isEmpty } = require('./isEmpty.js');

const validateSocialInput = (data) => {
  let alert = '';
  if (isEmpty(data.name)) {
    alert = 'Name cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.instagram)) {
    alert = 'Instagram cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  return { alert, isValid: isEmpty(alert) };
};

module.exports = { validateSocialInput };
