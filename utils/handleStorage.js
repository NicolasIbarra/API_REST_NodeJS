const multer = require("multer");

/**
 * Storage is the constant used as a disk to store the destination and name of the file.
 * Both "destination" and "filename" are properties of the diskStorage multer function.
 * "destination" --> Gets the destination path using __dirname variable and "cb" callback function.
 * "filename" --> Creates a name for the file using the current date so the names will never be the same.
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const pathStorage = `${__dirname}/../storage`;
    cb(null, pathStorage);
  },
  filename: function (req, file, cb) {
    const fileExtension = file.originalname.split(".").pop();
    const fileName = `file-${Date.now()}.${fileExtension}`;
    cb(null, fileName);
  },
});

/**
 * uploadMiddleware is a constant used to stablish communication between the route and the controller.
 */
const uploadMiddleware = multer({ storage });

module.exports = uploadMiddleware;
