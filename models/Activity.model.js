const { Schema, model } = require('mongoose');

const ActivitySchema = new Schema(
  {
    name: String,
  },
  { timestamps: true }
);

const Activity = model('activities', ActivitySchema);
module.exports = Activity;
