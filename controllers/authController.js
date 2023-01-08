const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const {
  validateRegisterInput,
} = require('../validations/registrationValidation');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
      res.status(400).json(errors);
    }
    const { email, password, role } = req.body;

    // check email exist
    const existingEmail = await User.findOne({
      email: new RegExp('^' + email + '$', 'i'),
    });
    if (existingEmail) {
      return res.status(500).json({ error: 'email exist' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ email, password: hashedPassword, role });
    const savedUser = await newUser.save();
    const payload = { userId: savedUser._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    res.cookie('hana-token', token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    const returnedUser = { ...savedUser._doc };
    delete returnedUser.password;
    return res.json({ user: returnedUser });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({
      email: new RegExp('^' + email + '$', 'i'),
    });
    if (!user) {
      return res.status(400).json({ error: 'a problem with credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'a problem with credentials' });
    }
    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    res.cookie('hana-token', token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    const returnedUser = { ...user._doc };
    delete returnedUser.password;
    return res.json({ token, user: returnedUser });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const current = async (req, res) => {
  try {
    if (!req.user) {
      res.clearCookie('hana-token');
      return res.redirect('/auth');
    }
    return res.status(200).json({ user: req.user });
  } catch (error) {
    return res.json({ alert: error.message });
  }
};
const logout = async (req, res) => {
  try {
    res.clearCookie('hana-token');
    return res.json({ success: true });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  register,
  login,
  logout,
  current,
};
