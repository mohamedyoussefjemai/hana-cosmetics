const { Schema, model } = require('mongoose');

const HomepageSchema = new Schema(
  {
    video: {
      type: String,
      default: '',
    },
    image1: {
      type: String,
      default: '',
    },
    image2: {
      type: String,
      default: '',
    },
    image3: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

const Homepage = model('homepage', HomepageSchema);
module.exports = Homepage;
