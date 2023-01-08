const express = require('express');
const { upload } = require('../config/upload.js');
const {
  findAllVisible,
  findAll,
  add,
  findById,
  updateVisibility,
} = require('../controllers/socialController.js');
const { isAdmin } = require('../middlewares/permissions.js');

const socialRoute = express.Router();

socialRoute.post('/', isAdmin, upload, add);
socialRoute.get('/', isAdmin, findAll);
socialRoute.get('/visible', findAllVisible);
socialRoute.get('/:id', isAdmin, findById);
socialRoute.patch('/:id', isAdmin, updateVisibility);

module.exports = socialRoute;
