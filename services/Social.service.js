const Social = require('../models/Social.model.js');

const findAllSocial = async () => {
  try {
    const socials = await Social.find({}, '-updatedAt -__v');
    if (socials) return { socials };
    return { socials: [] };
  } catch (err) {
    return { err: err.message };
  }
};
const findAllVisibleSocial = async () => {
  try {
    const socials = await Social.find({ visible: true }, '-updatedAt -__v');
    if (socials) return { socials };
    return { socials: [] };
  } catch (err) {
    return { err: err.message };
  }
};
const findSocialByName = async (data) => {
  try {
    const social = await Social.findOne(data, ' -updatedAt -__v');
    if (social) return { existingName: true };
    return { existingName: false };
  } catch (err) {
    return { err: err.message };
  }
};
const addSocial = async (data) => {
  try {
    const social = await new Social(data);
    const returnedSocial = await social.save();
    if (returnedSocial) return { social: returnedSocial };
    return { social: null };
  } catch (err) {
    return { err: err.message };
  }
};
const findSocialById = async (id) => {
  try {
    const social = await Social.findById(id, ' -updatedAt -__v');
    if (social) return { social };
    return { social: null };
  } catch (err) {
    return { err: err.message };
  }
};
const updateSocial = async (id, data) => {
  try {
    const social = await Social.findByIdAndUpdate(id, data, { new: true });
    if (social) return { social };
    return { social: null };
  } catch (err) {
    return { err: err.message };
  }
};
const findSocialObjectByName = async (data) => {
  try {
    const socialName = await Social.findOne(data, '-updatedAt -__v');
    if (socialName) return { socialName };
    return { socialName: null };
  } catch (err) {
    return { err: err.message };
  }
};

module.exports = {
  findAllSocial,
  addSocial,
  findSocialByName,
  findSocialById,
  updateSocial,
  findSocialObjectByName,
  findAllVisibleSocial,
};
