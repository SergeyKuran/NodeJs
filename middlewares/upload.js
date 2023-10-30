const multer = require("multer");
const path = require("path");

const UPLOAD_PATH = path.resolve("tmp");

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, UPLOAD_PATH);
  },

  filename: (req, file, cd) => {
    const uniquiId = `${Date.now()}`;
    const filename = `${uniquiId}_${file.originalname}`;

    cd(null, filename);
  },

  fileFilter: (req, file, cd) => {
    if (file.originalname.split(",").pop() === "exe") {
      cd(new Error("File extention not allow"));
    }
    cd(null, true);
  },

  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

module.exports = multer({ storage: storage });
