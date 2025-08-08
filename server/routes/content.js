// server/routes/content.js - UPDATED με delete functionality
const express = require("express");
const { body, validationResult } = require("express-validator");
const Content = require("../models/Content");
const { auth, authorize } = require("../middleware/auth");

const router = express.Router();

// @route GET /api/content
// @desc Get all active content
// @access Public
router.get("/", async (req, res) => {
  try {
    // extract query's values
    const { section, key } = req.query;

    // set the query's object isActive property to true
    let query = { isActive: true };
    // add the section property with the query's value to the query object if provided
    if (section) query.section = section;
    // add the key property with the query's value to the query object if provided
    if (key) query.key = key;

    // find all contents that match the provided query & sort them by creation date
    const content = await Content.find(query).sort({ createdAt: -1 });

    // If requesting a specific key, return single item
    if (key && content.length > 0) {
      return res.json(content[0]);
    }

    // return the content we have found to the response
    res.json(content);
  } catch (error) {
    console.error("Get content error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route GET /api/content/:id
// @desc Get content by ID
// @access Public
router.get("/:id", async (req, res) => {
  try {
    // find the content with the provided id
    const content = await Content.findById(req.params.id);

    // check if no content with this id exists
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    // return the content found to the response
    res.json(content);
  } catch (error) {
    console.error("Get content by ID error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route POST /api/content
// @desc Create new content
// @access Private (admin/editor)
router.post(
  "/",
  [
    auth,
    authorize("admin", "editor"),
    body("key").notEmpty().trim().escape(),
    body("title").notEmpty().trim(),
    body("content").notEmpty(),
    body("section").isIn(["hero", "about", "services", "footer", "general"]),
  ],
  async (req, res) => {
    try {
      // check if errors have occured
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Check if content with this key already exists
      const existingContent = await Content.findOne({ key: req.body.key });
      if (existingContent) {
        return res
          .status(400)
          .json({ message: "Content with this key already exists" });
      }

      // create new Content instance with the data from the request's body
      const content = new Content(req.body);
      // save the newly created content to the database
      await content.save();

      // return success response & the newly created content
      res.status(201).json({
        message: "Content created successfully",
        content,
      });
    } catch (error) {
      console.error("Create content error:", error);
      if (error.code === 11000) {
        res.status(400).json({ message: "Content key must be unique" });
      } else {
        res.status(500).json({ message: "Server error" });
      }
    }
  }
);

// @route PUT /api/content/:key
// @desc Update content by key
// @access Private (admin/editor)
router.put(
  "/:key",
  [
    auth,
    authorize("admin", "editor"),
    body("title").optional().trim(),
    body("content").optional(),
    body("section")
      .optional()
      .isIn(["hero", "about", "services", "footer", "general"]),
  ],
  async (req, res) => {
    try {
      // check if errors have occured
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // find the content with the provided key & update it with the data from request's body
      const content = await Content.findOneAndUpdate(
        { key: req.params.key },
        {
          ...req.body,
          updatedAt: new Date(),
        },
        { new: true, runValidators: true }
      );

      // check if we have not found a content with the provided key
      if (!content) {
        return res.status(404).json({ message: "Content not found" });
      }

      // return success response with the updated content
      res.json({
        message: "Content updated successfully",
        content,
      });
    } catch (error) {
      console.error("Update content error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// @route DELETE /api/content/:key
// @desc Delete content by key (soft delete by setting isActive: false)
// @access Private (admin only)
router.delete("/:key", [auth, authorize("admin")], async (req, res) => {
  try {
    // find the content with the provided key & set it's isActive property to false
    const content = await Content.findOneAndUpdate(
      { key: req.params.key },
      { isActive: false },
      { new: true }
    );

    // check if we haven't found a project with this id
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    // return success response & provide the deactivated content
    res.json({
      message: "Content deleted successfully",
      content,
    });
  } catch (error) {
    console.error("Delete content error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route DELETE /api/content/:key/permanent
// @desc Permanently delete content by key
// @access Private (admin only)
router.delete(
  "/:key/permanent",
  [auth, authorize("admin")],
  async (req, res) => {
    try {
      // find the content with the provided key and delete it
      const content = await Content.findOneAndDelete({ key: req.params.key });

      // check if no content with this key exists in the database
      if (!content) {
        return res.status(404).json({ message: "Content not found" });
      }

      // return success response with the deleted content
      res.json({
        message: "Content permanently deleted",
        content,
      });
    } catch (error) {
      console.error("Permanent delete content error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// @route POST /api/content/:key/restore
// @desc Restore soft-deleted content
// @access Private (admin only)
router.post("/:key/restore", [auth, authorize("admin")], async (req, res) => {
  try {
    // find the content with the provided key and it's isActivate property to true
    const content = await Content.findOneAndUpdate(
      { key: req.params.key },
      { isActive: true },
      { new: true }
    );

    // check if no content with this key exists in the database
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    // return success response with the activated content
    res.json({
      message: "Content restored successfully",
      content,
    });
  } catch (error) {
    console.error("Restore content error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route GET /api/content/admin/all
// @desc Get all content including inactive (admin only)
// @access Private (admin only)
router.get("/admin/all", [auth, authorize("admin")], async (req, res) => {
  try {
    // extract query's values
    const { section, includeInactive } = req.query;

    // initiate the query variable with empty object
    let query = {};
    // add the section property with the query's value to the query object if provided
    if (section) query.section = section;
    // add the includeInactive property with the query's value to the query object if provided
    if (!includeInactive || includeInactive === "false") {
      query.isActive = true;
    }

    // find all contents that match the provided query & sort them by creation date
    const content = await Content.find(query).sort({ createdAt: -1 });

    // return the contents we have found to the response
    res.json(content);
  } catch (error) {
    console.error("Get all content error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
