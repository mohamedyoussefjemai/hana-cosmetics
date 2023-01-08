const {
  findAllShop,
  addShop,
  findShopByName,
  findAllVisibleShop,
  findShopObjectByName,
  findShopById,
  updateShop,
} = require('../services/Shop.service');
const { findActivityById } = require('../services/Activity.service');

const {
  validateShopInput,
  validateUpdateShopInput,
} = require('../validations/shopValidation');
const { isEmpty } = require('../validations/isEmpty.js');

const findAllVisible = async (req, res) => {
  try {
    const { err, shops } = await findAllVisibleShop();
    if (err) return res.json({ alert: err.message });
    if (shops.length === 0) return res.json({ shops });
    return res.status(200).json({ shops });
  } catch (error) {
    return res.json({ alert: error.message });
  }
};
const findAll = async (req, res) => {
  try {
    const { err, shops } = await findAllShop();
    if (err) return res.json({ alert: err.message });
    if (shops.length === 0) return res.json({ shops });
    return res.status(200).json({ shops });
  } catch (error) {
    return res.json({ alert: error.message });
  }
};
const add = async (req, res) => {
  try {
    const { isValid, alert } = validateShopInput(req.body);
    if (alert || !isValid) {
      return res.json({ alert });
    }
    const { name, address, geo_location, visible, list_shop_items, activity } =
      req.body;
    const { existingName } = await findShopByName({ name });
    if (existingName)
      return res.json({ alert: 'An shop with this name exist' });
    const response = await findActivityById(activity);
    if (!response.activity)
      return res.status(404).json({ alert: 'activity not found' });
    const { err, shop } = await addShop({
      name,
      address,
      geo_location,
      visible,
      list_shop_items,
      activity,
    });
    if (err) return res.json({ alert: err.message });
    return res.json({ alert: 'shop created', shop });
  } catch (error) {
    return res.json({ alert: error.message });
  }
};
const put = async (req, res) => {
  try {
    const { id } = req.params;
    const { isValid, alert } = validateUpdateShopInput(req.body);
    if (alert || !isValid) {
      return res.json({ alert });
    }
    const { name, address, geo_location, list_shop_items, activity } = req.body;
    const response = await findShopById(id);
    if (!response.shop)
      return res.status(404).json({ alert: 'shop not found' });
    const { shopName } = await findShopObjectByName({ name });
    if (
      !isEmpty(shopName) &&
      response.shop._id.toString() !== shopName._id.toString()
    )
      return res.json({ alert: 'A shop with this name exist' });
    const response2 = await findActivityById(activity);
    if (!response2.activity)
      return res.status(404).json({ alert: 'activity not found' });

    const { err, shop } = await updateShop(id, {
      name,
      address,
      geo_location,
      activity,
      list_shop_items,
    });
    if (err) return res.json({ alert: err.message });
    if (shop) return res.json({ alert: 'Shop updated', shop });
    return res.status(400).json({ alert: 'Shop not found' });
  } catch (error) {
    return res.json({ alert: error.message });
  }
};
const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const { shop } = await findShopById(id);
    const finalShops = [];
    const finalShop = {};
    finalShops.push(shop.list_shop_items.phone);
    finalShops.push(shop.list_shop_items.whatsapp);
    finalShops.push(shop.list_shop_items.telegram);
    finalShops.push(shop.list_shop_items.instagram);
    finalShop._id = shop._id;
    finalShop.name = shop.name;
    finalShop.address = shop.address;
    finalShop.geo_location = shop.geo_location;
    finalShop.activity = shop.activity;
    finalShop.list_shop_items = finalShops;
    return res.json({ shop: finalShop });
  } catch (error) {
    return res.json({ alert: error.message });
  }
};
const updateVisibility = async (req, res) => {
  try {
    const { id } = req.params;
    const { shop } = await findShopById(id);
    if (shop) {
      if (shop.visible) {
        await updateShop(id, { visible: false });
        shop.visible = false;
        return res.json({ alert: 'Shop unpublished', shop });
      }
      await updateShop(id, { visible: true });
      shop.visible = true;
      return res.json({ alert: 'Shop published', shop });
    }
    return res.status(400).json({ alert: 'Shop not found' });
  } catch (error) {
    return res.json({ alert: error.message });
  }
};
const calculDistance = async (req, res) => {
  try {
    const { geo_location } = req.body;
    const { shops } = await findAllShop();

    const locations = shops.map(function (el) {
      return {
        longitude: el.geo_location.longitude,
        latitude: el.geo_location.latitude,
      };
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
    const { closest } = locations.reduce(
      (r, o) => {
        const distance = haversine(o, geo_location);
        // eslint-disable-next-line no-unused-expressions
        distance < r.minDistance ||
          (!r.closest && ((r.closest = o), (r.minDistance = distance)));
        return r;
      },
      { closest: null, minDistance: null }
    );
    return res.status(200).json({ closest });
  } catch (error) {
    return res.json({ alert: error.message });
  }
};
module.exports = {
  findAllVisible,
  findAll,
  add,
  put,
  findById,
  updateVisibility,
  calculDistance,
};
