const validator = require('validator');
const { isEmpty } = require('./isEmpty.js');

const validateShopInput = (data) => {
  let alert = '';
  if (isEmpty(data.name)) {
    alert = 'Name cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.address)) {
    alert = 'Address cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.activity)) {
    alert = 'Activity cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.address)) {
    alert = 'Address cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.geo_location.longitude)) {
    alert = 'longitude cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.geo_location.latitude)) {
    alert = 'latitude cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.visible)) {
    alert = 'visible cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (!validator.isBoolean(data.visible.toString())) {
    alert = 'visible must be boolean';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.list_shop_items.phone)) {
    alert = 'phone cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.list_shop_items.phone.title)) {
    alert = 'phone title cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.list_shop_items.phone.link)) {
    alert = 'phone link cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.list_shop_items.phone.data)) {
    alert = 'phone data cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.list_shop_items.whatsapp)) {
    alert = 'whatsapp cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.list_shop_items.whatsapp.title)) {
    alert = 'whatsapp title cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.list_shop_items.whatsapp.link)) {
    alert = 'whatsapp link cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.list_shop_items.whatsapp.data)) {
    alert = 'whatsapp data cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.list_shop_items.telegram)) {
    alert = 'telegram cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.list_shop_items.telegram.title)) {
    alert = 'telegram title cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.list_shop_items.telegram.link)) {
    alert = 'telegram link cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.list_shop_items.telegram.data)) {
    alert = 'telegram data cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.list_shop_items.instagram)) {
    alert = 'instagram cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.list_shop_items.instagram.title)) {
    alert = 'instagram title cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.list_shop_items.instagram.link)) {
    alert = 'instagram link cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.list_shop_items.instagram.data)) {
    alert = 'instagram data cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  return { alert, isValid: isEmpty(alert) };
};
const validateUpdateShopInput = (data) => {
  let alert = '';
  if (isEmpty(data.name)) {
    alert = 'Name cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.address)) {
    alert = 'Address cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.activity)) {
    alert = 'Activity cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.address)) {
    alert = 'Address cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.geo_location.longitude)) {
    alert = 'longitude cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.geo_location.latitude)) {
    alert = 'latitude cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.list_shop_items.phone)) {
    alert = 'phone cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.list_shop_items.phone.title)) {
    alert = 'phone title cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.list_shop_items.phone.link)) {
    alert = 'phone link cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.list_shop_items.phone.data)) {
    alert = 'phone data cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.list_shop_items.whatsapp)) {
    alert = 'whatsapp cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.list_shop_items.whatsapp.title)) {
    alert = 'whatsapp title cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.list_shop_items.whatsapp.link)) {
    alert = 'whatsapp link cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.list_shop_items.whatsapp.data)) {
    alert = 'whatsapp data cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.list_shop_items.telegram)) {
    alert = 'telegram cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.list_shop_items.telegram.title)) {
    alert = 'telegram title cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.list_shop_items.telegram.link)) {
    alert = 'telegram link cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.list_shop_items.telegram.data)) {
    alert = 'telegram data cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.list_shop_items.instagram)) {
    alert = 'instagram cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.list_shop_items.instagram.title)) {
    alert = 'instagram title cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.list_shop_items.instagram.link)) {
    alert = 'instagram link cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  if (isEmpty(data.list_shop_items.instagram.data)) {
    alert = 'instagram data cannot be empty';
    return { alert, isValid: isEmpty(alert) };
  }
  return { alert, isValid: isEmpty(alert) };
};

module.exports = { validateShopInput, validateUpdateShopInput };
