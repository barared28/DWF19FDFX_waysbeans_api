const formidable = require("formidable");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadImage = async (req, res, next) => {
  const form = formidable();
  try {
    form.parse(req, async (err, fields, file) => {
      if (err) {
        next(err);
        return;
      }
      req.body = fields;
      await cloudinary.uploader.upload(
        file.image.path,
        function (error, result) {
          if (result) {
            req.file = result;
            next();
          }
          if (error) {
            return res.status(500).send({
              status: "server error",
              data: {},
            });
          }
        }
      );
    });
  } catch (error) {
    res.status(500).send({
      status: "server error",
      data: {},
    });
  }
};
