const Activity = require('../models/Activity.model.js');

const findAllActivity = async () => {
  try {
    const activities = await Activity.find(
      {},
      '-createdAt -updatedAt -visible -__v'
    );
    if (activities) return { activities };
    return { activities: [] };
  } catch (err) {
    return { err: err.message };
  }
};
const findActivityByName = async (data) => {
  try {
    const activity = await Activity.findOne(
      data,
      '-createdAt -updatedAt -visible -__v'
    );
    if (activity) return { existingName: true };
    return { existingName: false };
  } catch (err) {
    return { err: err.message };
  }
};
const addActivity = async (data) => {
  try {
    const activity = await new Activity(data);
    const returnedActivity = await activity.save();
    if (returnedActivity) return { activity: returnedActivity };
    return { activity: null };
  } catch (err) {
    return { err: err.message };
  }
};
const findActivityById = async (id) => {
  try {
    const activity = await Activity.findById(
      id,
      '-createdAt -updatedAt -visible -__v'
    );
    if (activity) return { activity };
    return { activity: null };
  } catch (err) {
    return { err: err.message };
  }
};
const updateActivity = async (id, data) => {
  try {
    const activity = await Activity.findByIdAndUpdate(id, data, { new: true });
    if (activity) return { activity };
    return { activity: null };
  } catch (err) {
    return { err: err.message };
  }
};
const findActivityObjectByName = async (data) => {
  try {
    const activityName = await Activity.findOne(
      data,
      {},
      '-createdAt -updatedAt -visible -__v'
    );
    if (activityName) return { activityName };
    return { activityName: null };
  } catch (err) {
    return { err: err.message };
  }
};

module.exports = {
  findAllActivity,
  addActivity,
  findActivityByName,
  findActivityById,
  updateActivity,
  findActivityObjectByName,
};
