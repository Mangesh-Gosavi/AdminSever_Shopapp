const cloudinary = require("../config/cloudinary");

async function uploadImage(req, res) {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file provided" });
  }

  try {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "uploads" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    return res.status(200).json({ success: true, url: result.secure_url });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return res.status(500).json({ success: false, message: "Upload failed" });
  }
}

module.exports = { uploadImage };
