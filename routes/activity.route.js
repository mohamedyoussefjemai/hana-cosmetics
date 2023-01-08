const express = require('express');
const {
  findAll,
  add,
  put,
  findById,
} = require('../controllers/activityController.js');

const { isAdmin } = require('../middlewares/permissions');

const activityRoute = express.Router();

activityRoute.post('/', isAdmin, add);
activityRoute.get('/', isAdmin, findAll);
activityRoute.get('/:id', isAdmin, findById);
activityRoute.put('/:id', isAdmin, put);

module.exports = activityRoute;
