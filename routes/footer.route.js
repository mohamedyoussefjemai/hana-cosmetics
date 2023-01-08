const express = require('express');
const { upload } = require('../config/upload.js');
const {
  findAll,
  add,
  put,
  changeImage,
  getFooter,
} = require('../controllers/footerController.js');

const { isSuperAdmin } = require('../middlewares/permissions');

const footerRoute = express.Router();

footerRoute.post('/', isSuperAdmin, add);
footerRoute.get('/', findAll);
footerRoute.get('/get', isSuperAdmin, getFooter);
footerRoute.put('/', isSuperAdmin, put);
footerRoute.put('/upload/:type', isSuperAdmin, upload, changeImage);

module.exports = footerRoute;
