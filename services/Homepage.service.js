const Homepage = require('../models/Homepage.model.js');

const homepageExist = async () => {
  try {
    const homepage = await Homepage.find();
    if (homepage.length > 0)
      return { homepageBool: true, homepage: homepage[0] };
    return { homepageBool: false };
  } catch (err) {
    return { err: err.message };
  }
};
const addHomepageData = async (data) => {
  try {
    const homepage = await new Homepage(data);
    const returnedHomepage = await homepage.save();
    if (returnedHomepage) return { homepage: returnedHomepage };
    return { homepage: null };
  } catch (err) {
    return { err: err.message };
  }
};
const updateHomepageData = async (id, data) => {
  try {
    const updatedHomepage = await Homepage.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (updatedHomepage) return { updatedHomepage };
    return { updatedHomepage: null };
  } catch (err) {
    return { err: err.message };
  }
};

module.exports = { addHomepageData, updateHomepageData, homepageExist };
