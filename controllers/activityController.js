const {
  findAllActivity,
  addActivity,
  findActivityByName,
  findActivityById,
  updateActivity,
  findActivityObjectByName,
} = require('../services/Activity.service');
const { isEmpty } = require('../validations/isEmpty.js');

const {
  validateActivityInput,
} = require('../validations/activityValidation.js');

const findAll = async (req, res) => {
  try {
    const { err, activities } = await findAllActivity();
    if (err) return res.json({ alert: err.message });
    if (activities.length === 0) return res.json({ activities });
    return res.status(200).json({ activities });
  } catch (error) {
    return res.json({ alert: error.message });
  }
};
const add = async (req, res) => {
  try {
    const { isValid, alert } = validateActivityInput(req.body);
    if (alert || !isValid) {
      return res.json({ alert });
    }
    const { name } = req.body;
    const { existingName } = await findActivityByName({ name });
    if (existingName)
      return res.json({ alert: 'An activity with this name exist' });
    const { err, activity } = await addActivity({ name });
    if (err) return res.json({ alert: err.message });
    return res.json({ alert: 'activity created', activity });
  } catch (error) {
    return res.json({ alert: error.message });
  }
};
const put = async (req, res) => {
  try {
    const { id } = req.params;
    const { isValid, alert } = validateActivityInput(req.body);
    if (alert || !isValid) {
      return res.json({ alert });
    }
    const { name } = req.body;
    const response = await findActivityById(id);
    if (!response.activity)
      return res.status(404).json({ alert: 'activity not found' });
    const { activityName } = await findActivityObjectByName({ name });
    if (
      !isEmpty(activityName) &&
      response.activity._id.toString() !== activityName._id.toString()
    )
      return res.json({ alert: 'An activity with this name exist' });
    const { err, activity } = await updateActivity(id, { name });
    if (err) return res.json({ alert: err.message });
    if (activity) return res.json({ alert: 'Activity updated', activity });
    return res.status(400).json({ alert: 'Activity not found' });
  } catch (error) {
    return res.json({ alert: error.message });
  }
};
const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await findActivityById(id);
    return res.json(activity);
  } catch (error) {
    return res.json({ alert: error.message });
  }
};

module.exports = {
  findAll,
  add,
  put,
  findById,
};
