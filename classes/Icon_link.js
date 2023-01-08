const { Schema } = require('mongoose');

const IconLinkClass = new Schema({
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

module.exports = { IconLinkClass };
