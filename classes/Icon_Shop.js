const { Schema } = require('mongoose');

const IconShopClass = new Schema({
  title: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
  link: {
    type: String,
    default: '',
  },
  data: {
    type: String,
    default: null,
  },
});

module.exports = { IconShopClass };
