const Product = require('../models/Product.model.js');

const findAllProduct = async () => {
  try {
    const products = await Product.find(
      {},
      '-createdAt -updatedAt -__v -status'
    ).populate([
      {
        path: 'main_category',
        model: 'categories',
        select: 'name _id',
      },
      {
        path: 'sub_category',
        model: 'sub_categories',
        select: 'name _id',
      },
    ]);
    if (products) return { products };
    return { products: [] };
  } catch (err) {
    return { err: err.message };
  }
};
const findAllNewProduct = async () => {
  try {
    const products = await Product.find(
      { is_new: true },
      '-createdAt -updatedAt -__v -is_new -status'
    )
      .populate([
        {
          path: 'main_category',
          model: 'categories',
          select: 'name _id',
          match: { visible: true },
        },
        {
          path: 'sub_category',
          model: 'sub_categories',
          select: 'name _id',
          match: { visible: true },
        },
      ])
      .then((data) =>
        data.filter((v) => v.main_category !== null && v.sub_category !== null)
      );

    if (products) return { products };
    return { products: [] };
  } catch (err) {
    return { err: err.message };
  }
};
const addProduct = async (data) => {
  try {
    const product = await new Product(data);
    const returnedProduct = await product.save();
    if (returnedProduct) return { product: returnedProduct };
    return { product: null };
  } catch (err) {
    return { err: err.message };
  }
};
const findProductById = async (id) => {
  try {
    const product = await Product.findById(
      id,
      '-createdAt -updatedAt -__v -main_category -sub_category -status'
    );
    if (product) return { product };
    return { product: null };
  } catch (err) {
    return { err: err.message };
  }
};
const findProductByName = async (data) => {
  try {
    const product = await Product.findOne(
      data,
      '-createdAt -updatedAt -__v -main_category -sub_category -is_new -status'
    );
    if (product) return { existingName: true };
    return { existingName: false };
  } catch (err) {
    return { err: err.message };
  }
};
const findProductObjectByName = async (data) => {
  try {
    const productName = await Product.findOne(
      data,
      '-createdAt -updatedAt -__v -main_category -sub_category -is_new -status'
    );
    if (productName) return { productName };
    return { productName: null };
  } catch (err) {
    return { err: err.message };
  }
};
const updateProduct = async (id, data) => {
  try {
    const product = await Product.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (product) return { product };
    return { product: null };
  } catch (err) {
    return { err: err.message };
  }
};
const findAllProductByMainCategory = async (data) => {
  try {
    const { main_category } = data;

    const products = await Product.find(
      {
        main_category,
      },
      '-createdAt -updatedAt -__v -is_new -status'
    ).populate([
      {
        path: 'main_category',
        model: 'categories',
        select: 'name _id',
        match: { visible: true },
      },
      {
        path: 'sub_category',
        model: 'sub_categories',
        select: 'name _id',
        match: { visible: true },
      },
    ]);
    if (products) return { products };
    return { products: [] };
  } catch (err) {
    return { err: err.message };
  }
};
const findPopulatedProductById = async (id) => {
  try {
    const product = await Product.findById(
      id,
      '-createdAt -updatedAt -__v'
    ).populate([
      {
        path: 'main_category',
        model: 'categories',
        select: 'name _id',
      },
      {
        path: 'sub_category',
        model: 'sub_categories',
        select: 'name _id',
      },
    ]);
    if (product) return { product };
    return { products: null };
  } catch (err) {
    return { err: err.message };
  }
};
module.exports = {
  findAllProduct,
  addProduct,
  updateProduct,
  findProductById,
  findProductByName,
  findAllProductByMainCategory,
  findAllNewProduct,
  findProductObjectByName,
  findPopulatedProductById,
};
