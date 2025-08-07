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
    const { section, key } = req.query;

    let query = { isActive: true };
    if (section) query.section = section;
    if (key) query.key = key;

    const content = await Content.find(query).sort({ createdAt: -1 });

    // If requesting a specific key, return single item
    if (key && content.length > 0) {
      return res.json(content[0]);
    }

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
    const content = await Content.findById(req.params.id);

    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

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

      const content = new Content(req.body);
      await content.save();

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
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const content = await Content.findOneAndUpdate(
        { key: req.params.key },
        {
          ...req.body,
          updatedAt: new Date(),
        },
        { new: true, runValidators: true }
      );

      if (!content) {
        return res.status(404).json({ message: "Content not found" });
      }

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
    const content = await Content.findOneAndUpdate(
      { key: req.params.key },
      { isActive: false },
      { new: true }
    );

    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

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
      const content = await Content.findOneAndDelete({ key: req.params.key });

      if (!content) {
        return res.status(404).json({ message: "Content not found" });
      }

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
    const content = await Content.findOneAndUpdate(
      { key: req.params.key },
      { isActive: true },
      { new: true }
    );

    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

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
    const { section, includeInactive } = req.query;

    let query = {};
    if (section) query.section = section;
    if (!includeInactive || includeInactive === "false") {
      query.isActive = true;
    }

    const content = await Content.find(query).sort({ createdAt: -1 });

    res.json(content);
  } catch (error) {
    console.error("Get all content error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
