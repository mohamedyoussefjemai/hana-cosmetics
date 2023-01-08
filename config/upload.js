const multer = require('multer');
const fs = require('fs');

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const balayAudPath = `./uploads`;
      fs.mkdirSync(balayAudPath, { recursive: true });
      cb(null, balayAudPath);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
}).single('image');

module.exports = { upload };
