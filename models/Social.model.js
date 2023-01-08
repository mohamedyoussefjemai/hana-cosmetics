const { Schema, model } = require('mongoose');

const SocialSchema = new Schema(
  {
    name: String,
    image: String,
    instagram: String,
    visible: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Social = model('socials', SocialSchema);
module.exports = Social;
