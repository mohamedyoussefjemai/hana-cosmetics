const express = require('express');
const { upload } = require('../config/upload.js');
const {
  findAll,
  add,
  put,
  changeImage,
} = require('../controllers/homepageController.js');

const { isSuperAdmin } = require('../middlewares/permissions.js');

const homepageRoute = express.Router();

homepageRoute.post('/', isSuperAdmin, upload, add);
homepageRoute.get('/', findAll);
homepageRoute.put('/', isSuperAdmin, put);
homepageRoute.put('/image/:number', isSuperAdmin, upload, changeImage);

module.exports = homepageRoute;
