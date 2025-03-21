const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });
const uploadMiddleware = upload.single("profilepath");
const uploadMiddlewarePost = upload.single("postFilePath");
module.exports = uploadMiddleware;
module.exports = uploadMiddlewarePost;
