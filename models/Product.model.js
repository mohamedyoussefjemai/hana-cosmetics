const { Schema, model } = require('mongoose');

const ProductSchema = new Schema(
  {
    name: String,
    description1: String,
    description2: String,
    image: String,
    price: Number,
    main_category: { type: Schema.Types.ObjectId, ref: 'categories' },
    sub_category: { type: Schema.Types.ObjectId, ref: 'sub_categories' },
    is_new: {
      type: Boolean,
      default: false,
    },
    instagram_link: String,
  },
  { timestamps: true }
);

const Product = model('products', ProductSchema);
module.exports = Product;
