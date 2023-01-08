const { Schema, model } = require('mongoose');

const SubCategorySchema = new Schema(
  {
    name: String,
    visible: {
      type: Boolean,
      default: false,
    },
    main_category: { type: Schema.Types.ObjectId, ref: 'categories' },
  },
  { timestamps: true }
);

const SubCategory = model('sub_categories', SubCategorySchema);
module.exports = SubCategory;
