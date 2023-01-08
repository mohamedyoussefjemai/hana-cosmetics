const SubCategory = require('../models/SubCategory.model');

const findAllSubCategory = async () => {
  try {
    const sub_categories = await SubCategory.find().populate('main_category');
    if (sub_categories) return { sub_categories };
    return { sub_categories: [] };
  } catch (err) {
    return { err: err.message };
  }
};
const findSubCategoryByName = async (data) => {
  try {
    const sub_category = await SubCategory.findOne(data);
    if (sub_category) return { existingName: true };
    return { existingName: false };
  } catch (err) {
    return { err: err.message };
  }
};
const addSubCategory = async (data) => {
  try {
    const sub_category = await new SubCategory(data);
    const returnedSubCategory = await sub_category.save();
    if (returnedSubCategory) return { sub_category: returnedSubCategory };
    return { sub_category: null };
  } catch (err) {
    return { err: err.message };
  }
};
const findSubCategoryById = async (id) => {
  try {
    const sub_category = await SubCategory.findById(id).populate(
      'main_category'
    );
    if (sub_category) return { sub_category };
    return { sub_category: null };
  } catch (err) {
    return { err: err.message };
  }
};
const updateSubCategory = async (id, data) => {
  try {
    const sub_category = await SubCategory.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (sub_category) return { sub_category };
    return { sub_category: null };
  } catch (err) {
    return { err: err.message };
  }
};
const findAllSubCategoryByMainCategory = async (data) => {
  try {
    const sub_categories = await SubCategory.find(
      data,
      '-createdAt -updatedAt -__v -main_category -visible'
    ).populate('main_category');
    if (sub_categories) return { sub_categories };
    return { sub_categories: [] };
  } catch (err) {
    return { err: err.message };
  }
};
const findSubCategoryObjectByName = async (data) => {
  try {
    const subCategoryName = await SubCategory.findOne(data);
    if (subCategoryName) return { subCategoryName };
    return { subCategoryName: null };
  } catch (err) {
    return { err: err.message };
  }
};
module.exports = {
  findAllSubCategory,
  addSubCategory,
  findSubCategoryById,
  findSubCategoryByName,
  updateSubCategory,
  findAllSubCategoryByMainCategory,
  findSubCategoryObjectByName,
};
