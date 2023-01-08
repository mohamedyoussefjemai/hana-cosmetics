const express = require('express');
const { upload } = require('../config/upload.js');
const {
  findAllVisible,
  findAll,
  add,
  put,
  findById,
  updateVisibility,
} = require('../controllers/categoryController.js');

const { isAdmin } = require('../middlewares/permissions');

const categoryRoute = express.Router();

categoryRoute.post('/', isAdmin, upload, add);
categoryRoute.get('/', isAdmin, findAll);
categoryRoute.get('/visible', findAllVisible);
categoryRoute.get('/:id', findById);
categoryRoute.put('/:id', isAdmin, upload, put);
categoryRoute.patch('/:id', isAdmin, updateVisibility);

module.exports = categoryRoute;
