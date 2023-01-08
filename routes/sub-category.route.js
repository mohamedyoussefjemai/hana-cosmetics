const express = require('express');
const {
  findAll,
  add,
  put,
  findById,
  updateVisibility,
} = require('../controllers/subCategoryController');
const { isAdmin } = require('../middlewares/permissions');

const subCategoryRoute = express.Router();

subCategoryRoute.post('/', isAdmin, add);
subCategoryRoute.get('/', isAdmin, findAll);
subCategoryRoute.get('/:id', isAdmin, findById);
subCategoryRoute.put('/:id', isAdmin, put);
subCategoryRoute.patch('/:id', isAdmin, updateVisibility);

module.exports = subCategoryRoute;
