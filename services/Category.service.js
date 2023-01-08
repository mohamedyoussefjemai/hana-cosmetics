const Category = require('../models/Category.model.js');

const findAllCategory = async () => {
  try {
    const categories = await Category.find(
      {},
      '-createdAt -updatedAt -__v -label'
    );
    if (categories) return { categories };
    return { categories: [] };
  } catch (err) {
    return { err: err.message };
  }
};
const findAllVisibleCategory = async () => {
  try {
    const categories = await Category.find(
      { visible: true },
      '-createdAt -updatedAt -__v -label -visible'
    );
    if (categories) return { categories };
    return { categories: [] };
  } catch (err) {
    return { err: err.message };
  }
};
const findCategoryByName = async (data) => {
  try {
    const category = await Category.findOne(
      data,
      '-createdAt -updatedAt -__v -label'
    );
    if (category) return { existingName: true };
    return { existingName: false };
  } catch (err) {
    return { err: err.message };
  }
};
const addCategory = async (data) => {
  try {
    const category = await new Category(data);
    const returnedCategory = await category.save();
    if (returnedCategory) return { category: returnedCategory };
    return { category: null };
  } catch (err) {
    return { err: err.message };
  }
};
const findCategoryById = async (id) => {
  try {
    const category = await Category.findById(
      id,
      '-createdAt -updatedAt -__v -label'
    );
    if (category) return { category };
    return { category: null };
  } catch (err) {
    return { err: err.message };
  }
};
const updateCategory = async (id, data) => {
  try {
    const category = await Category.findByIdAndUpdate(id, data, { new: true });
    if (category) return { category };
    return { category: null };
  } catch (err) {
    return { err: err.message };
  }
};
const findCategoryObjectByName = async (data) => {
  try {
    const categoryName = await Category.findOne(
      data,
      '-createdAt -updatedAt -__v -label'
    );
    if (categoryName) return { categoryName };
    return { categoryName: null };
  } catch (err) {
    return { err: err.message };
  }
};

module.exports = {
  findAllCategory,
  addCategory,
  findCategoryByName,
  findCategoryById,
  updateCategory,
  findCategoryObjectByName,
  findAllVisibleCategory,
};
