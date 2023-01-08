const express = require('express');
const { upload } = require('../config/upload.js');
const {
  findAllNew,
  findAll,
  add,
  put,
  findById,
  updateNewState,
} = require('../controllers/productController.js');
const { isAdmin } = require('../middlewares/permissions.js');

const productRoute = express.Router();

productRoute.post('/', isAdmin, upload, add);
productRoute.get('/', findAll);
productRoute.get('/new', findAllNew);
productRoute.get('/:id', findById);
productRoute.put('/:id', isAdmin, upload, put);
productRoute.patch('/:id', isAdmin, updateNewState);

module.exports = productRoute;
