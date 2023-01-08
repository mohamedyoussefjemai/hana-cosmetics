const {
  homepageExist,
  addHomepageData,
  updateHomepageData,
} = require('../services/Homepage.service');

const { validateHomepageInput } = require('../validations/homepageValidation');

const findAll = async (req, res) => {
  try {
    const { homepage } = await homepageExist();
    if (!homepage) return res.json({ alert: 'homepage data empty' });
    const images = [homepage.image1, homepage.image2, homepage.image3];
    const { video } = homepage;
    return res.status(200).json({
      homepage: {
        video,
        images,
      },
    });
  } catch (error) {
    return res.json({ alert: error.message });
  }
};
const add = async (req, res) => {
  try {
    const { isValid, alert } = validateHomepageInput(req.body);
    if (alert || !isValid) {
      return res.json({ alert });
    }
    const { video } = req.body;
    const { homepageBool } = await homepageExist();
    if (homepageBool) return res.json({ alert: 'Homepage exist' });
    const { err, homepage } = await addHomepageData({
      video,
    });
    if (err) return res.json({ alert: err.message });
    return res.json({ alert: 'homepage created', homepage });
  } catch (error) {
    return res.json({ alert: error.message });
  }
};
const put = async (req, res) => {
  try {
    const { isValid, alert } = validateHomepageInput(req.body);
    if (alert || !isValid) {
      return res.json({ alert });
    }
    const { video } = req.body;
    const { homepageBool, homepage } = await homepageExist();
    if (homepage && homepageBool) {
      const { updatedHomepage } = await updateHomepageData(homepage._id, {
        video,
      });
      return res.json({ alert: 'homepage updated', updatedHomepage });
    }
    return res.status(401).json({ alert: 'Unauthorised' });
  } catch (error) {
    return res.json({ alert: error.message });
  }
};
const changeImage = async (req, res) => {
  try {
    const { file } = req;

    const { number } = req.params;
    const { homepageBool, homepage } = await homepageExist();
    if (homepage && homepageBool) {
      switch (number) {
        case '1': {
          const { updatedHomepage } = await updateHomepageData(homepage._id, {
            image1: file.filename,
          });
          return res.json({ alert: 'image 1 update', updatedHomepage });
        }
        case '2': {
          const { updatedHomepage } = await updateHomepageData(homepage._id, {
            image2: file.filename,
          });
          return res.json({ alert: 'image 2 update', updatedHomepage });
        }
        case '3': {
          const { updatedHomepage } = await updateHomepageData(homepage._id, {
            image3: file.filename,
          });
          return res.json({ alert: 'image 3 update', updatedHomepage });
        }
        default:
          return res.status(404).json({ alert: 'Type not found' });
      }
    }
    return res.status(401).json({ alert: 'Unauthorised' });
  } catch (error) {
    return res.json({ alert: error.message });
  }
};
module.exports = {
  findAll,
  add,
  put,
  changeImage,
};
