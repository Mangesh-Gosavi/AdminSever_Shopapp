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

async function deleteImage(req, res) {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ success: false, message: "url required" });

    const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z0-9]+$/);
    if (!match) return res.status(400).json({ success: false, message: "invalid cloudinary url" });
    const publicId = match[1];

    const result = await cloudinary.uploader.destroy(publicId);
    return res.json({ success: result.result === "ok", result });
  } catch (error) {
    console.error("deleteimage error:", error);
    return res.status(500).json({ success: false, message: "delete failed" });
  }
}

module.exports = { uploadImage, deleteImage };
