const User = require('../models/User.model');
const jwt = require('jsonwebtoken');

const requireAuth = async (req, res, next) => {
  const token = req.cookies['hana-token'];
  let isAuthed = false;
  if (token) {
    try {
      const { userId } = jwt.verify(token, process.env.JWT_SECRET);
      try {
        const user = await User.findById(userId);
        if (user) {
          const userToReturn = { ...user._doc };
          delete userToReturn.password;
          req.user = userToReturn;
          isAuthed = true;
        }
      } catch {
        isAuthed = false;
      }
    } catch {
      isAuthed = false;
    }
  }

  if (isAuthed) {
    return next();
  } else {
    return res.status(400).json({ alert: 'unauthorised' });
  }
};
const isAdmin = async (req, res, next) => {
  const token = req.cookies['hana-token'];
  let isAuthed = false;
  if (token) {
    try {
      const { userId } = jwt.verify(token, process.env.JWT_SECRET);
      try {
        const user = await User.findById(userId);
        if (user && (user.role === 'Admin' || user.role === 'SuperAdmin')) {
          const userToReturn = { ...user._doc };
          delete userToReturn.password;
          req.user = userToReturn;
          isAuthed = true;
        }
      } catch {
        isAuthed = false;
      }
    } catch {
      isAuthed = false;
    }
  }
  if (isAuthed) {
    return next();
  } else {
    return res.status(401).json({ alert: 'unauthorised' });
  }
};
const isSuperAdmin = async (req, res, next) => {
  const token = req.cookies['hana-token'];
  let isAuthed = false;
  if (token) {
    try {
      const { userId } = jwt.verify(token, process.env.JWT_SECRET);
      try {
        const user = await User.findById(userId);
        if (user && user.role === 'SuperAdmin') {
          const userToReturn = { ...user._doc };
          delete userToReturn.password;
          req.user = userToReturn;
          isAuthed = true;
        }
      } catch {
        isAuthed = false;
      }
    } catch {
      isAuthed = false;
    }
  }
  if (isAuthed) {
    return next();
  } else {
    return res.status(400).json({ alert: 'unauthorised' });
  }
};

module.exports = { requireAuth, isAdmin, isSuperAdmin };
