const express = require("express");
const { body, validationResult } = require("express-validator");
const Publication = require("../models/Publication");
const { auth, authorize } = require("../middleware/auth");

const router = express.Router();

// @route GET /api/publications
// @desc Get all active publications with sorting and filter support
// @access Public
router.get("/", async (req, res) => {
  try {
    const { year, type, author, sortBy, limit, search } = req.query;

    let query = { isActive: true };

    // Προσθήκη φιλτραρίσματος βάσει τύπου
    if (type && type !== "all") {
      query.publicationType = type;
    }

    // Προσθήκη αναζήτησης κειμένου (regex)
    if (search) {
      const searchRegex = new RegExp(search, "i");
      query.$or = [
        { title: { $regex: searchRegex } },
        { abstract: { $regex: searchRegex } },
        { authors: { $regex: searchRegex } }, // Αναζήτηση στους συγγραφείς
        // Μπορείτε να προσθέσετε και άλλα πεδία εδώ
      ];
    }

    // ... (υπόλοιπος κώδικας για sort και limit)

    let sortObject = { year: -1, createdAt: -1 };
    if (sortBy) {
      // ... (η λογική για ταξινόμηση παραμένει η ίδια)
    }

    let publicationsQuery = Publication.find(query)
      .populate("projects", "title category")
      .sort(sortObject);

    if (limit) {
      const limitNum = parseInt(limit);
      if (limitNum > 0) {
        publicationsQuery = publicationsQuery.limit(limitNum);
      }
    }

    const publications = await publicationsQuery;
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

    // check if no publication with this id exists or the publication is not active
    if (!publication || !publication.isActive) {
      return res.status(404).json({ message: "Publication not found" });
    }

    // return the publication we have found to the response
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
    // Validation rules for publication creation
    body("title").notEmpty().trim().withMessage("Title is required"),
    body("authors").notEmpty().withMessage("Authors are required"),
    body("year")
      .isInt({ min: 1900, max: new Date().getFullYear() + 5 })
      .withMessage("Year must be valid"),
    body("publicationType")
      .isIn([
        "journal",
        "conference",
        "book-chapter",
        "thesis",
        "report",
        "preprint",
      ])
      .withMessage("Invalid publication type"),
  ],
  async (req, res) => {
    try {
      // check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // create a new publication using the data from request's body
      const publication = new Publication(req.body);
      await publication.save();

      // populate the publication before sending response
      await publication.populate("projects", "title category");

      // return success response with the newly created publication
      res.status(201).json({
        message: "Publication created successfully",
        publication,
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
      {
        new: true,
        runValidators: true,
      }
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
