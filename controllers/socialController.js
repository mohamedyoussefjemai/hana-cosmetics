const {
  findAllSocial,
  findAllVisibleSocial,
  addSocial,
  updateSocial,
  findSocialById,
} = require('../services/Social.service');

const { validateSocialInput } = require('../validations/socialValidation');
const { isEmpty } = require('../validations/isEmpty.js');

const findAllVisible = async (req, res) => {
  try {
    const { err, socials } = await findAllVisibleSocial();
    if (err) return res.json({ alert: err.message });
    return res.status(200).json({ socials });
  } catch (error) {
    return res.json({ alert: error.message });
  }
};
const findAll = async (req, res) => {
  try {
    const { err, socials } = await findAllSocial();
    if (err) return res.json({ alert: err.message });
    return res.status(200).json({ socials });
  } catch (error) {
    return res.json({ alert: error.message });
  }
};
const add = async (req, res) => {
  try {
    const { file } = req;
    const { isValid, alert } = validateSocialInput(req.body);
    if (alert || !isValid) {
      return res.json({ alert });
    }
    const { name, instagram, visible } = req.body;

    const { err, social } = await addSocial({
      name,
      instagram,
      visible,
      image: file.filename,
    });
    if (err) return res.json({ alert: err.message });
    return res.json({ alert: 'social created', social });
  } catch (error) {
    return res.json({ alert: error.message });
  }
};
const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const social = await findSocialById(id);
    return res.json(social);
  } catch (error) {
    return res.json({ alert: error.message });
  }
};
const updateVisibility = async (req, res) => {
  try {
    const { id } = req.params;
    const { social } = await findSocialById(id);
    if (social) {
      if (social.visible) {
        await updateSocial(id, { visible: false });
        social.visible = false;
        return res.json({ alert: 'Social unpublished', social });
      }
      await updateSocial(id, { visible: true });
      social.visible = true;
      return res.json({ alert: 'Social published', social });
    }
    return res.status(400).json({ alert: 'Social not found' });
  } catch (error) {
    return res.json({ alert: error.message });
  }
};
module.exports = {
  findAllVisible,
  findAll,
  add,
  findById,
  updateVisibility,
};
