const express = require('express');
const {
  register,
  login,
  logout,
  current,
} = require('../controllers/authController.js');
const { requireAuth } = require('../middlewares/permissions');

const authRoute = express.Router();

authRoute.post('/register', register);
authRoute.post('/login', login);
authRoute.get('/', requireAuth, current);
authRoute.patch('/', logout);

module.exports = authRoute;
