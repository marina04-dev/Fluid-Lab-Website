const express = require("express");
const {
  uploadImage,
  uploadDocument,
  handleUploadError,
} = require("../middleware/upload");
const { auth, authorize } = require("../middleware/auth");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// @route POST /api/upload/image
// @desc Upload image file
// @access Private (editor/admin)
router.post(
  "/image",
  [
    auth,
    authorize("editor", "admin"),
    uploadImage.single("image"),
    handleUploadError,
  ],
  async (req, res) => {
    try {
      // check if the user has provided a file
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // get the file url
      const fileUrl = `${req.protocol}://${req.get("host")}/${req.file.path}`;

      // return success response with the file's data for the next middleware to handle them
      res.json({
        message: "Image uploaded successfully",
        file: {
          filename: req.file.filename,
          originalName: req.file.originalname,
          path: req.file.path,
          url: fileUrl,
          size: req.file.size,
          mimetype: req.file.mimetype,
        },
      });
    } catch (error) {
      console.error("Image upload error:", error);
      res.status(500).json({ message: "Error uploading image" });
    }
  }
);

// @route POST /api/upload/document
// @desc Upload document file
// @access Private (editor/admin)
router.post(
  "/document",
  [
    auth,
    authorize("editor", "admin"),
    uploadDocument.single("document"),
    handleUploadError,
  ],
  async (req, res) => {
    // check if the user has provided a file
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // get the file url
      const fileUrl = `${req.protocol}://${req.get("host")}/${req.file.path}`;

      // return success response with the file's data for the next middleware to handle them
      res.json({
        message: "Document uploaded successfully",
        file: {
          filename: req.file.filename,
          originalName: req.file.originalname,
          path: req.file.path,
          url: fileUrl,
          size: req.file.size,
          mimetype: req.file.mimetype,
        },
      });
    } catch (error) {
      console.error("Document upload error:", error);
      res.status(500).json({ message: "Error uploading document" });
    }
  }
);

// @route DELETE /api/upload/:filename
// @desc Delete uploaded file
// @access Private (admin only)
router.delete("/:filename", [auth, authorize("admin")], async (req, res) => {
  try {
    // get the file name from url params
    const { filename } = req.params;

    // Find file in upload directories
    const possiblePaths = [
      `uploads/team/${filename}`,
      `uploads/projects/${filename}`,
      `uploads/publications/${filename}`,
      `uploads/general/${filename}`,
    ];

    // do the finding process for each possible path
    let filePath = null;
    for (const possiblePath of possiblePaths) {
      if (fs.existsSync(possiblePath)) {
        filePath = possiblePath;
        break;
      }
    }

    // case if we do not find the file
    if (!filePath) {
      return res.status(404).json({ message: "File not found" });
    }

    // remove the file from the folder
    fs.unlinkSync(filePath);

    // return success response
    res.json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("File deletion error:", error);
    res.status(500).json({ message: "Error deleting file" });
  }
});

// @route GET /api/upload/files
// @desc Get list of uploaded files
// @access Private (editor/admin)
router.get("/files", [auth, authorize("editor", "admin")], async (req, res) => {
  try {
    /* This line destructures the req.query object to extract the value of the type query parameter (e.g., ?type=projects). */
    const { type } = req.query; // 'team', 'projects', 'publications', 'general'

    /* This is a conditional block. If a type query parameter was provided in the request (e.g., ?type=projects), this line modifies the directory path to include the type, resulting in a path like "uploads/projects/". This allows the route to serve files from different subdirectories based on the request. */
    let uploadDir = "uploads/";
    if (type) {
      uploadDir += `${type}/`;
    }

    /*This line uses Node.js's built-in fs (file system) module to check if the constructed uploadDir directory actually exists. If the directory doesn't exist, the function immediately returns an empty array of files, preventing a file system error and providing a clean response.*/
    if (!fs.existsSync(uploadDir)) {
      return res.json({ files: [] });
    }

    /* fs.readdirSync to synchronously read the contents of the uploadDir directory. The withFileTypes: true option is important because it returns an array of fs.Dirent objects instead of just strings. Dirent objects have properties like isFile() and isDirectory(), which makes filtering easier.
    .filter((dirent) => dirent.isFile())
    This chain method filters the array of directory entries, keeping only the ones that are files. This ensures the endpoint doesn't return subdirectories.
    .map((dirent) => { ... });
    This maps over the filtered array of file entries, transforming each one into a new object containing detailed file information.
    const filePath = path.join(uploadDir, dirent.name);
    This line uses Node.js's built-in path module to safely join the directory path with the filename. This is better than string concatenation because path.join handles platform-specific path separators (e.g., / on Linux, \ on Windows).
    const stats = fs.statSync(filePath);
    This gets detailed metadata about the file, such as its size, creation time, and modification time.
    return { ... };
    This returns an object for each file, containing key information:
    filename: The name of the file (e.g., document.pdf).
    path: The server-side path to the file (e.g., uploads/projects/document.pdf).
    url: The full public URL to access the file, constructed using the request's protocol (http or https) and host. This allows the client to download or view the file.
    size: The size of the file in bytes.
    createdAt: The file's creation date.
    modifiedAt: The file's last modification date. */
    const files = fs
      .readdirSync(uploadDir, { withFileTypes: true })
      .filter((dirent) => dirent.isFile())
      .map((dirent) => {
        const filePath = path.join(uploadDir, dirent.name);
        const stats = fs.statSync(filePath);

        return {
          filename: dirent.name,
          path: filePath,
          url: `${req.protocol}://${req.get("host")}/${filePath}`,
          size: stats.size,
          createdAt: stats.birthtime,
          modifiedAt: stats.mtime,
        };
      });

    // return the files to the response
    res.json({ files });
  } catch (error) {
    console.error("Get files error:", error);
    res.status(500).json({ message: "Error retrieving files" });
  }
});

module.exports = router;
