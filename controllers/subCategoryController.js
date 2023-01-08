const {
  findSubCategoryByName,
  addSubCategory,
  findAllSubCategory,
  findSubCategoryById,
  updateSubCategory,
  findSubCategoryObjectByName,
} = require('../services/SubCategory.service');

const {
  validateSubCategoryInput,
} = require('../validations/subCategoryValidation');
const { isEmpty } = require('../validations/isEmpty.js');

const findAll = async (req, res) => {
  try {
    const { err, sub_categories } = await findAllSubCategory();
    if (err) return res.status(400).json({ alert: err.message });
    return res.status(200).json({ sub_categories });
  } catch (error) {
    return res.json({ alert: error.message });
  }
};
const add = async (req, res) => {
  try {
    const { isValid, alert } = validateSubCategoryInput(req.body);
    if (alert || !isValid) {
      return res.json({ alert });
    }
    const { name, main_category, visible } = req.body;
    const { existingName } = await findSubCategoryByName({ name });
    if (existingName)
      return res.json({ alert: 'A sub category with this name exist' });
    const { err, sub_category } = await addSubCategory({
      name,
      main_category,
      visible,
    });
    const object = await findSubCategoryById(sub_category._id);
    if (err) return res.status(400).json({ alert: err.message });
    return res.status(200).json({
      alert: 'sub category created',
      sub_category: object.sub_category,
    });
  } catch (error) {
    return res.json({ alert: error.message });
  }
};
const put = async (req, res) => {
  try {
    const { id } = req.params;
    const { isValid, alert } = validateSubCategoryInput(req.body);
    if (alert || !isValid) {
      return res.json({ alert });
    }
    const { name, main_category } = req.body;
    const response = await findSubCategoryById(id);
    if (!response.sub_category)
      return res.status(404).json({ alert: 'subCategory not found' });
    const { subCategoryName } = await findSubCategoryObjectByName({ name });
    if (
      !isEmpty(subCategoryName) &&
      response.sub_category._id.toString() !== subCategoryName._id.toString()
    )
      return res.json({ alert: 'A sub category with this name exist' });
    const { err, sub_category } = await updateSubCategory(id, {
      name,
      main_category,
    });
    if (err) return res.json({ alert: err.message });
    if (sub_category) {
      const object = await findSubCategoryById(sub_category._id);
      return res.json({
        alert: 'Sub Category updated',
        sub_category: object.sub_category,
      });
    }
    return res.status(400).json({ alert: 'Sub Category not found' });
  } catch (error) {
    return res.json({ alert: error.message });
  }
};
const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const sub_category = await findSubCategoryById(id);
    return res.json(sub_category);
  } catch (error) {
    return res.json({ alert: error.message });
  }
};
const updateVisibility = async (req, res) => {
  try {
    const { id } = req.params;
    const { sub_category } = await findSubCategoryById(id);
    if (sub_category) {
      if (sub_category.visible) {
        await updateSubCategory(id, { visible: false });
        sub_category.visible = false;
        return res.json({
          alert: 'Sub Category unpublished',
          sub_category,
        });
      }
      await updateSubCategory(id, { visible: true });
      sub_category.visible = true;
      return res.json({ alert: 'Sub Category published', sub_category });
    }
    return res.status(400).json({ alert: 'Sub Catagory not found' });
  } catch (error) {
    return res.json({ alert: error.message });
  }
};
module.exports = {
  findAll,
  add,
  put,
  findById,
  updateVisibility,
};
