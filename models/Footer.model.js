const { Schema, model } = require('mongoose');

const { IconLinkClass } = require('../classes/Icon_link.js');

const FooterSchema = new Schema(
  {
    top_footer_items: {
      facebook: {
        type: IconLinkClass,
      },
      instagram: {
        type: IconLinkClass,
      },
      youtube: {
        type: IconLinkClass,
      },
      linkedin: {
        type: IconLinkClass,
      },
      twitter: {
        type: IconLinkClass,
      },
    },
    list_footer_items: {
      phone: {
        type: IconLinkClass,
      },
      whatsapp: {
        type: IconLinkClass,
      },
      telegram: {
        type: IconLinkClass,
      },
      address: {
        type: IconLinkClass,
      },
      email: {
        type: IconLinkClass,
      },
    },
  },
  { timestamps: true }
);

const Footer = model('footer', FooterSchema);
module.exports = Footer;
