const {
  findAllVisibleCategory,
  findAllCategory,
  addCategory,
  findCategoryByName,
  findCategoryById,
  updateCategory,
  findCategoryObjectByName,
} = require('../services/Category.service');
const {
  findAllSubCategoryByMainCategory,
} = require('../services/SubCategory.service');

const { validateCategoryInput } = require('../validations/categoryValidation');
const { isEmpty } = require('../validations/isEmpty.js');

const findAllVisible = async (req, res) => {
  try {
    const finalData = [];
    const { err, categories } = await findAllVisibleCategory();
    if (err) return res.json({ alert: err.message });
    if (categories.length === 0) return res.json({ categories });
    return categories.forEach(async (cat) => {
      const { sub_categories } = await findAllSubCategoryByMainCategory({
        main_category: cat._id,
      });
      const doc = cat._doc;
      if (sub_categories.length > 0) {
        doc.sub_categories = sub_categories;
        finalData.push(doc);
      } else finalData.push(doc);
      if (finalData.length === categories.length)
        return res.status(200).json({ categories: finalData });
      return false;
    });
  } catch (error) {
    return res.json({ alert: error.message });
  }
};
const findAll = async (req, res) => {
  try {
    const finalData = [];
    const { err, categories } = await findAllCategory();
    if (err) return res.json({ alert: err.message });
    if (categories.length === 0) return res.json({ categories });
    return categories.forEach(async (cat) => {
      const { sub_categories } = await findAllSubCategoryByMainCategory({
        main_category: cat._id,
      });
      const doc = cat._doc;
      if (sub_categories.length > 0) {
        doc.sub_categories = sub_categories;
        finalData.push(doc);
      } else finalData.push(doc);
      if (finalData.length === categories.length)
        return res.status(200).json({ categories: finalData });
      return false;
    });
  } catch (error) {
    return res.json({ alert: error.message });
  }
};
const add = async (req, res) => {
  try {
    const { file } = req;

    const { isValid, alert } = validateCategoryInput(req.body);
    if (alert || !isValid) {
      return res.json({ alert });
    }
    const { name, label, visible } = req.body;
    const { existingName } = await findCategoryByName({ name });
    if (existingName)
      return res.json({ alert: 'A category with this name exist' });
    const { err, category } = await addCategory({
      name,
      label,
      visible,
      icon: file.filename,
    });
    if (err) return res.json({ alert: err.message });
    return res.json({ alert: 'category created', category });
  } catch (error) {
    return res.json({ alert: error.message });
  }
};
const put = async (req, res) => {
  try {
    const { file } = req;
    const { id } = req.params;
    const { isValid, alert } = validateCategoryInput(req.body);
    if (alert || !isValid) {
      return res.json({ alert });
    }
    const { name } = req.body;
    const response = await findCategoryById(id);
    if (!response.category)
      return res.status(404).json({ alert: 'category not found' });
    const { categoryName } = await findCategoryObjectByName({ name });
    if (
      !isEmpty(categoryName) &&
      response.category._id.toString() !== categoryName._id.toString()
    )
      return res.json({ alert: 'A category with this name exist' });
    let data = {};
    if (file) {
      data = {
        name,
        icon: file.filename,
      };
    } else {
      data = {
        name,
      };
    }
    const { err, category } = await updateCategory(id, data);
    if (err) return res.json({ alert: err.message });
    if (category) return res.json({ alert: 'Category updated', category });
    return res.status(400).json({ alert: 'Category not found' });
  } catch (error) {
    return res.json({ alert: error.message });
  }
};
const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const { category } = await findCategoryById(id);
    const { sub_categories } = await findAllSubCategoryByMainCategory({
      main_category: category._id,
    });
    category._doc.sub_categories = sub_categories;

    return res.json({ category });
  } catch (error) {
    return res.json({ alert: error.message });
  }
};
const updateVisibility = async (req, res) => {
  try {
    const { id } = req.params;
    const { category } = await findCategoryById(id);
    if (category) {
      if (category.visible) {
        await updateCategory(id, { visible: false });
        category.visible = false;
        return res.json({ alert: 'Category unpublished', category });
      }
      await updateCategory(id, { visible: true });
      category.visible = true;
      return res.json({ alert: 'Category published', category });
    }
    return res.status(400).json({ alert: 'Catagory not found' });
  } catch (error) {
    return res.json({ alert: error.message });
  }
};
module.exports = {
  findAllVisible,
  findAll,
  add,
  put,
  findById,
  updateVisibility,
};
