const fs = require('fs');

const {
  addProduct,
  findProductById,
  findPopulatedProductById,
  findProductByName,
  findAllProduct,
  findAllNewProduct,
  updateProduct,
  findProductObjectByName,
} = require('../services/Product.service');
const { findCategoryById } = require('../services/Category.service');
const { findSubCategoryById } = require('../services/SubCategory.service');

const {
  validateProductInput,
  validateUpdateProductInput,
} = require('../validations/productValidation');
const { isEmpty } = require('../validations/isEmpty');

const findAllNew = async (req, res) => {
  try {
    const { err, products } = await findAllNewProduct();
    if (err) return res.json({ alert: err.message });
    return res.status(200).json({ products });
  } catch (error) {
    return res.json({ alert: error.message });
  }
};
const findAll = async (req, res) => {
  try {
    const { err, products } = await findAllProduct();
    if (err) return res.json({ alert: err.message });
    return res.status(200).json({ products });
  } catch (error) {
    return res.json({ alert: error.message });
  }
};
const add = async (req, res) => {
  try {
    const { file } = req;

    const { isValid, alert } = validateProductInput(req.body);
    if (alert || !isValid) {
      return res.json({ alert });
    }
    const {
      name,
      description1,
      description2,
      price,
      main_category,
      sub_category,
      is_new,
      instagram_link,
    } = req.body;
    const { existingName } = await findProductByName({ name });
    if (existingName)
      return res.json({ alert: 'A product with this name exist' });
    const category = await findCategoryById(main_category);
    if (!category) return res.status(400).json('main category unvailable');
    const subCategory = await findSubCategoryById(sub_category);
    if (!subCategory) return res.status(400).json('sub category unvailable');
    const { err, product } = await addProduct({
      name,
      description1,
      description2,
      price,
      main_category,
      sub_category,
      is_new,
      image: file.filename,
      instagram_link,
    });
    if (err) return res.json({ alert: err.message });
    const finalProduct = await findPopulatedProductById(product._id);
    return res.json({
      alert: 'product created',
      product: finalProduct.product,
    });
  } catch (error) {
    return res.json({ alert: error.message });
  }
};
const put = async (req, res) => {
  try {
    const { file } = req;
    const { id } = req.params;
    const { isValid, alert } = validateUpdateProductInput(req.body);
    if (alert || !isValid) {
      return res.json({ alert });
    }
    const {
      name,
      description1,
      description2,
      price,
      main_category,
      sub_category,
      is_new,
      instagram_link,
    } = req.body;
    const response = await findProductById(id);
    if (!response.product)
      return res.status(404).json({ alert: 'product not found' });
    const { productName } = await findProductObjectByName({ name });
    if (
      !isEmpty(productName) &&
      response.product._id.toString() !== productName._id.toString()
    )
      return res.json({ alert: 'A product with this name exist' });

    const cat_response = await findCategoryById(main_category);
    if (!cat_response.category)
      return res.status(404).json({ alert: 'main category not found' });
    const sub_response = await findSubCategoryById(sub_category);
    if (!sub_response.sub_category)
      return res.status(404).json({ alert: 'sub category not found' });

    let data = {};
    if (file) {
      data = {
        name,
        description1,
        description2,
        price,
        main_category,
        sub_category,
        is_new,
        image: file.filename,
        instagram_link,
      };
    } else {
      data = {
        name,
        description1,
        description2,
        price,
        main_category,
        sub_category,
        is_new,
        instagram_link,
      };
    }
    const { err, product } = await updateProduct(id, data);
    const finalProduct = await findPopulatedProductById(product._id);

    if (err) return res.json({ alert: err.message });
    if (finalProduct)
      return res.json({
        alert: 'Product updated',
        product: finalProduct.product,
      });
    return res.status(400).json({ alert: 'Product not found' });
  } catch (error) {
    return res.json({ alert: error.message });
  }
};
const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await findProductById(id);
    return res.json(product);
  } catch (error) {
    return res.json({ alert: error.message });
  }
};
const updateNewState = async (req, res) => {
  try {
    const { id } = req.params;
    const { product } = await findProductById(id);
    if (product) {
      if (product.is_new) {
        await updateProduct(id, { is_new: false });
        product.is_new = false;
        return res.json({ alert: 'Product new seller setted', product });
      }
      await updateProduct(id, { is_new: true });
      product.is_new = true;
      return res.json({ alert: 'Product new seller unsetted', product });
    }
    return res.status(400).json({ alert: 'Product not found' });
  } catch (error) {
    return res.json({ alert: error.message });
  }
};
module.exports = {
  findAllNew,
  findAll,
  add,
  put,
  findById,
  updateNewState,
};
