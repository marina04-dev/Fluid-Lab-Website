const express = require("express");
const { body, validationResult } = require("express-validator");
const Publication = require("../models/Publication");
const { auth, authorize } = require("../middleware/auth");

const router = express.Router();

// @route GET /api/publications
// @desc Get all active publications
// @access Public
router.get("/", async (req, res) => {
  try {
    // extract query parameters
    const { year, type, author } = req.query;

    // set the isActive property to true to the query object
    let query = { isActive: true };
    // add the year property with the query's value to the query object if provided
    if (year) query.year = parseInt(year);
    // add the type property with the query's value to the query object if provided
    if (type) query.type = type;
    // add the authors property with the query's value to the query object if provided
    if (author) {
      query.authors = { $regex: author, $options: "i" };
    }

    // find all publications that match the provided query & sort them by creation date
    const publications = await Publication.find(query)
      .populate("projects", "title category")
      .sort({ year: -1, createdAt: -1 });

    // return the publications we have found to the response
    res.json(publications);
  } catch (error) {
    console.error("Get publications error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route GET /api/publications/:id
// @desc Get publication by ID
// @access Public
router.get("/:id", async (req, res) => {
  try {
    // find the publication with the provided id & populate the instance with the necessary info
    const publication = await Publication.findById(req.params.id).populate(
      "projects",
      "title description category"
    );

    // check if no publication with this id exists or the publication with this id is not active
    if (!publication || !publication.isActive) {
      return res.status(404).json({ message: "Publication not found" });
    }

    // return the publication found to the response
    res.json(publication);
  } catch (error) {
    console.error("Get publication error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route POST /api/publications
// @desc Create new publication
// @access Private (admin/editor)
router.post(
  "/",
  [
    auth,
    authorize("admin", "editor"),
    body("title").notEmpty().trim(),
    body("authors").isArray({ min: 1 }),
    body("year").isInt({ min: 1900, max: new Date().getFullYear() + 5 }),
    body("type")
      .optional()
      .isIn(["journal", "conference", "book", "thesis", "preprint"]),
  ],
  async (req, res) => {
    try {
      // check if errors have occured
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // create new Publication instance with the data from the request's body
      const publication = new Publication(req.body);
      // save the newly created publication to the database
      await publication.save();

      // find the publication with the id with which it has been saved to the database & populate with the needed extra info
      const populatedPublication = await Publication.findById(
        publication._id
      ).populate("projects", "title category");

      // return success response & the newly created & populated publication
      res.status(201).json({
        message: "Publication created successfully",
        publication: populatedPublication,
      });
    } catch (error) {
      console.error("Create publication error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// @route PUT /api/publications/:id
// @desc Update publication
// @access Private (admin/editor)
router.put("/:id", [auth, authorize("admin", "editor")], async (req, res) => {
  try {
    // find the publication with the provided id & update it with the data from request's body
    // also populate it with the extra necessary info
    const publication = await Publication.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate("projects", "title category");

    // check if we have not found a publication with the provided id
    if (!publication) {
      return res.status(404).json({ message: "Publication not found" });
    }

    // return success response with the updated publication
    res.json({
      message: "Publication updated successfully",
      publication,
    });
  } catch (error) {
    console.error("Update publication error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route DELETE /api/publications/:id
// @desc Delete publication (soft delete)
// @access Private (admin only)
router.delete("/:id", [auth, authorize("admin")], async (req, res) => {
  try {
    // find the publication with the provided id & set it's isActive property to false
    const publication = await Publication.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    // check if we haven't found a publication with this id
    if (!publication) {
      return res.status(404).json({ message: "Publication not found" });
    }

    // return success response
    res.json({ message: "Publication deleted successfully" });
  } catch (error) {
    console.error("Delete publication error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
