const {
  footerExist,
  addFooterData,
  updateFooterData,
} = require('../services/Footer.service');

const { validateFooterInput } = require('../validations/footerValidation');

const findAll = async (req, res) => {
  try {
    const { footer } = await footerExist();
    if (!footer) return res.json({ alert: 'footer data empty' });
    const top_footer_items = Object.values(footer.top_footer_items);
    const list_footer_items = Object.values(footer.list_footer_items);
    return res.status(200).json({
      footer: {
        top_footer_items,
        list_footer_items,
      },
    });
  } catch (error) {
    return res.json({ alert: error.message });
  }
};
const add = async (req, res) => {
  try {
    const { isValid, alert } = validateFooterInput(req.body);
    if (alert || !isValid) {
      return res.status(400).json({ alert });
    }
    const { top_footer_items, list_footer_items } = req.body;
    const { footerBool } = await footerExist();
    if (footerBool) return res.json({ alert: 'Footer exist' });
    const { err, footer } = await addFooterData({
      top_footer_items,
      list_footer_items,
    });
    if (err) return res.json({ alert: err.message });
    return res.json({ alert: 'footer created', footer });
  } catch (error) {
    return res.json({ alert: error.message });
  }
};
const put = async (req, res) => {
  try {
    const { isValid, alert } = validateFooterInput(req.body);
    if (alert || !isValid) {
      return res.json({ alert });
    }
    const { top_footer_items, list_footer_items } = req.body;
    const { footerBool, footer } = await footerExist();
    if (footer && footerBool) {
      const { updatedFooter } = await updateFooterData(footer._id, {
        top_footer_items,
        list_footer_items,
      });
      return res.json({ alert: 'footer update', updatedFooter });
    }
    return res.status(401).json({ alert: 'Unauthorised' });
  } catch (error) {
    return res.json({ alert: error.message });
  }
};
const changeImage = async (req, res) => {
  try {
    const { type } = req.params;
    const { file, validityFormat } = req;
    if (!validityFormat) {
      fs.unlinkSync(`${process.cwd()}/public/images/${file.filename}`);
      return res.json(400).json({ alert: 'unvailable image format' });
    }
    const { footerBool, footer } = await footerExist();
    if (footer && footerBool) {
      switch (type) {
        case 'facebook': {
          const { updatedFooter } = await updateFooterData(footer._id, {
            'top_footer_items.facebook.icon': file.filename,
          });
          return res.json({ alert: 'facebook updated', updatedFooter });
        }
        case 'instagram': {
          const { updatedFooter } = await updateFooterData(footer._id, {
            'top_footer_items.instagram.icon': file.filename,
          });
          return res.json({ alert: 'instagram updated', updatedFooter });
        }
        case 'youtube': {
          const { updatedFooter } = await updateFooterData(footer._id, {
            'top_footer_items.youtube.icon': file.filename,
          });
          return res.json({ alert: 'youtube updated', updatedFooter });
        }
        case 'linkedin': {
          const { updatedFooter } = await updateFooterData(footer._id, {
            'top_footer_items.linkedin.icon': file.filename,
          });
          return res.json({ alert: 'linkedin updated', updatedFooter });
        }
        case 'twitter': {
          const { updatedFooter } = await updateFooterData(footer._id, {
            'top_footer_items.twitter.icon': file.filename,
          });
          return res.json({ alert: 'twitter updated', updatedFooter });
        }
        case 'phone': {
          const { updatedFooter } = await updateFooterData(footer._id, {
            'list_footer_items.phone.icon': file.filename,
          });
          return res.json({ alert: 'phone updated', updatedFooter });
        }
        case 'whatsapp': {
          const { updatedFooter } = await updateFooterData(footer._id, {
            'list_footer_items.whatsapp.icon': file.filename,
          });
          return res.json({ alert: 'whatsapp updated', updatedFooter });
        }
        case 'telegram': {
          const { updatedFooter } = await updateFooterData(footer._id, {
            'list_footer_items.telegram.icon': file.filename,
          });
          return res.json({ alert: 'telegram updated', updatedFooter });
        }
        case 'address': {
          const { updatedFooter } = await updateFooterData(footer._id, {
            'list_footer_items.address.icon': file.filename,
          });
          return res.json({ alert: 'address updated', updatedFooter });
        }
        case 'email': {
          const { updatedFooter } = await updateFooterData(footer._id, {
            'list_footer_items.email.icon': file.filename,
          });
          return res.json({ alert: 'email updated', updatedFooter });
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
const getFooter = async (req, res) => {
  try {
    const { footer } = await footerExist();
    if (!footer) return res.json({ alert: 'footer data empty' });
    return res.status(200).json({
      footer,
    });
  } catch (error) {
    return res.json({ alert: error.message });
  }
};

module.exports = {
  findAll,
  add,
  put,
  changeImage,
  getFooter,
};
