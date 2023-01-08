const { Schema, model } = require('mongoose');

const { GeolocationClass } = require('../classes/Geolocation.class');
const { IconShopClass } = require('../classes/Icon_Shop');

const ShopSchema = new Schema(
  {
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    geo_location: {
      type: GeolocationClass,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    activity: { type: Schema.Types.ObjectId, ref: 'Activity' },
    list_shop_items: {
      phone: {
        type: IconShopClass,
      },
      whatsapp: {
        type: IconShopClass,
      },
      telegram: {
        type: IconShopClass,
      },
      instagram: {
        type: IconShopClass,
      },
    },
  },
  { timestamps: true }
);

const Shop = model('shops', ShopSchema);
module.exports = Shop;
