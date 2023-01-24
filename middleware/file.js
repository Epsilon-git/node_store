const multer = require("multer");

const storage = multer.diskStorage({
  // куда складываем файлы
  destination(req, file, cb) {
    //
    cb(null, "images");
  },

  // формирование названия файла
  filename(req, file, cb) {
    //
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

//

const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = multer({
  storage: storage,
  fileFilter: fileFilter,
});
