const { Schema } = require('mongoose');

const GeolocationClass = new Schema({
  longitude: {
    type: Number,
  },
  latitude: {
    type: Number,
  },
});

module.exports = { GeolocationClass };
