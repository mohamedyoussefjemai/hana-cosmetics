const { isEmpty } = require('./isEmpty.js');

const validateFooterInput = (data) => {
  let alert = '';
  if (isEmpty(data.top_footer_items.facebook)) {
    alert = 'facebook cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.top_footer_items.facebook.link)) {
    alert = 'facebook link cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.top_footer_items.instagram)) {
    alert = 'instagram cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.top_footer_items.instagram.link)) {
    alert = 'instagram link cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.top_footer_items.youtube)) {
    alert = 'youtube cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.top_footer_items.youtube.link)) {
    alert = 'youtube link cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.top_footer_items.linkedin)) {
    alert = 'linkedin cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.top_footer_items.linkedin.link)) {
    alert = 'linkedin link cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.top_footer_items.twitter)) {
    alert = 'twitter cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.top_footer_items.twitter.link)) {
    alert = 'twitter link cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.list_footer_items.phone)) {
    alert = 'phone cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.list_footer_items.phone.link)) {
    alert = 'phone link cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.list_footer_items.phone.data)) {
    alert = 'phone data cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.list_footer_items.whatsapp)) {
    alert = 'whatsapp cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.list_footer_items.whatsapp.link)) {
    alert = 'whatsapp link cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.list_footer_items.whatsapp.data)) {
    alert = 'whatsapp data cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.list_footer_items.telegram)) {
    alert = 'telegram cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.list_footer_items.telegram.link)) {
    alert = 'telegram link cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.list_footer_items.telegram.data)) {
    alert = 'telegram data cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }

  if (isEmpty(data.list_footer_items.address)) {
    alert = 'address cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.list_footer_items.address.data)) {
    alert = 'address data cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.list_footer_items.email)) {
    alert = 'email cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.list_footer_items.email.link)) {
    alert = 'email link cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.list_footer_items.email.data)) {
    alert = 'email data cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  return { alert, isValid: isEmpty(alert) };
};

module.exports = { validateFooterInput };
