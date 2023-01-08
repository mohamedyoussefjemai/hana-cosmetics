const express = require('express');
const {
  findAllVisible,
  findAll,
  add,
  put,
  findById,
  updateVisibility,
  calculDistance,
} = require('../controllers/shopController.js');
const { isAdmin } = require('../middlewares/permissions.js');

const shopRoute = express.Router();

shopRoute.post('/', isAdmin, add);
shopRoute.get('/', isAdmin, findAll);
shopRoute.get('/visible', findAllVisible);
shopRoute.get('/:id', findById);
shopRoute.put('/:id', isAdmin, put);
shopRoute.patch('/:id', isAdmin, updateVisibility);
shopRoute.post('/distance', calculDistance);

module.exports = shopRoute;
