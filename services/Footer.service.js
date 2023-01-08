const Footer = require('../models/Footer.model');

const footerExist = async () => {
  try {
    const footer = await Footer.find();
    if (footer.length > 0) return { footerBool: true, footer: footer[0] };
    return { footerBool: false };
  } catch (err) {
    return { err: err.message };
  }
};
const addFooterData = async (data) => {
  try {
    const footer = await new Footer(data);
    const returnedFooter = await footer.save();
    if (returnedFooter) return { footer: returnedFooter };
    return { footer: null };
  } catch (err) {
    return { err: err.message };
  }
};
const updateFooterData = async (id, data) => {
  try {
    const updatedFooter = await Footer.findByIdAndUpdate(id, data, {
      new: false,
    });
    if (updatedFooter) return { updatedFooter };
    return { updatedFooter: null };
  } catch (err) {
    return { err: err.message };
  }
};

module.exports = { addFooterData, updateFooterData, footerExist };
