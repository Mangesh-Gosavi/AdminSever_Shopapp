const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadImage, deleteImage } = require("../controllers/uploadController");
const authenticateToken = require("../middleware/authenticateToken");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", authenticateToken, upload.single("image"), uploadImage);
router.post("/deleteimage", authenticateToken, deleteImage);

module.exports = router;
