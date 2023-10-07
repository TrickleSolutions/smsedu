const multer = require("multer");
const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const { default: axios } = require("axios");

const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const absolutePath = path.join(__dirname, `../assets/uploads`);
    cb(null, absolutePath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    // Create a new filename with the original extension
    const newFilename = uniqueSuffix + file.originalname;

    cb(null, newFilename);
  },
});

const storage = multer({ storage: Storage });

// upload the file

router.post("/uploadfile", storage.single("myfile"), (req, res) => {
  const fileName = req.file.filename;
  res.status(200).json({
    message: "Successfully Uploaded",
    fileName: `${fileName}`,
  });
});

module.exports = router;
