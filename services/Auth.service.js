import connectMongo from '../lib/db.js';
import User from '../models/User.model.js';

const findOne = async (data) => {
  try {
    const { email } = data;
    const user = await User.findOne({ email });
    if (user) return { user };
    return { user: null };
  } catch (err) {
    return { err: err.message };
  }
};
const createUser = async (data) => {
  try {
    const { email, password: hashedPassword, name, role } = data;
    const newUser = new User({ email, password: hashedPassword, name, role });
    const savedUser = await newUser.save();
    return { savedUser };
  } catch (err) {
    return { savedUser: null };
  }
};

export { findOne, createUser };
