const { Schema, model } = require('mongoose');

const CategorySchema = new Schema(
  {
    name: String,
    visible: {
      type: Boolean,
      default: false,
    },
    icon: String,
  },
  { timestamps: true }
);

const Category = model('categories', CategorySchema);
module.exports = Category;
