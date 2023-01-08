const Shop = require('../models/Shop.model');

const findAllShop = async () => {
  try {
    const shops = await Shop.find({}, '-createdAt -updatedAt -__v').populate({
      path: 'activity',
      model: 'activities',
      select: 'name',
    });
    if (shops) return { shops };
    return { shops: [] };
  } catch (err) {
    return { err: err.message };
  }
};
const findAllVisibleShop = async () => {
  try {
    const shops = await Shop.find(
      { visible: true },
      '-createdAt -updatedAt -__v -visible'
    ).populate({
      path: 'activity',
      model: 'activities',
      select: 'name',
    });
    if (shops) return { shops };
    return { shops: [] };
  } catch (err) {
    return { err: err.message };
  }
};
const findShopByName = async (data) => {
  try {
    const shop = await Shop.findOne(data, '-createdAt -updatedAt -__v');
    if (shop) return { existingName: true };
    return { existingName: false };
  } catch (err) {
    return { err: err.message };
  }
};
const addShop = async (data) => {
  try {
    const shop = await new Shop(data);
    const returnedShop = await shop.save();
    if (returnedShop) return { shop: returnedShop };
    return { shop: null };
  } catch (err) {
    return { err: err.message };
  }
};
const findShopById = async (id) => {
  try {
    const shop = await Shop.findById(id, '-createdAt -updatedAt -__v').populate(
      {
        path: 'activity',
        model: 'activities',
        select: 'name',
      }
    );
    if (shop) return { shop };
    return { shop: null };
  } catch (err) {
    return { err: err.message };
  }
};
const updateShop = async (id, data) => {
  try {
    const shop = await Shop.findByIdAndUpdate(id, data, { new: true });
    if (shop) return { shop };
    return { shop: null };
  } catch (err) {
    return { err: err.message };
  }
};
const findShopObjectByName = async (data) => {
  try {
    const shopName = await Shop.findOne(
      data,
      '-createdAt -updatedAt -__v'
    ).populate({
      path: 'activity',
      model: 'activities',
      select: 'name',
    });
    if (shopName) return { shopName };
    return { shopName: null };
  } catch (err) {
    return { err: err.message };
  }
};
const shopExist = async () => {
  try {
    const shop = await Shop.find();
    if (shop.length > 0) return { shopBool: true, shop: shop[0] };
    return { shopBool: false };
  } catch (err) {
    return { err: err.message };
  }
};
// eslint-disable-next-line consistent-return
const calcCloserPoint = async (geo_location) => {
  try {
    const locations = await Shop.find().filter(function (el) {
      return el.geo_location;
    });
    const haversine = (
      { longitude: lonA, latitude: latA },
      { longitude: lonB, latitude: latB }
    ) => {
      const { PI, sin, cos, atan2 } = Math;
      const r = PI / 180;
      const R = 6371;
      const deltaLat = (latB - latA) * r;
      const deltaLon = (lonB - lonA) * r;
      const a =
        sin(deltaLat / 2) ** 2 +
        cos(cos(latB * r) * latA * r) * sin(deltaLon / 2) ** 2;
      const c = 2 * atan2(a ** 0.5, (1 - a) ** 0.5);
      const d = R * c;
      return d;
    };
    locations.reduce(
      (r, o) => {
        const distance = haversine(o, geo_location);
        // eslint-disable-next-line no-unused-expressions
        distance < r.minDistance ||
          (!r.closest && ((r.closest = o), (r.minDistance = distance)));
        return r;
      },
      { closest: null, minDistance: null }
    );
  } catch (err) {
    return { err: err.message };
  }
};

module.exports = {
  findAllShop,
  addShop,
  findShopByName,
  findShopById,
  updateShop,
  findShopObjectByName,
  findAllVisibleShop,
  shopExist,
  calcCloserPoint,
};
