const express = require("express");
const { body, validationResult } = require("express-validator");
const Project = require("../models/Project");
const { auth, authorize } = require("../middleware/auth");

const router = express.Router();

// @route GET /api/projects
// @desc Get all active projects
// @access Public
router.get("/", async (req, res) => {
  try {
    // extract query's values
    const { category, status, featured } = req.query;

    // set the query's object isActive property to true
    let query = { isActive: true };
    // add the category property with the query's value to the query object if provided
    if (category) query.category = category;
    // add the status property with the query's value to the query object if provided
    if (status) query.status = status;
    // add the featured property with the query's value to the query object if provided
    if (featured === "true") query.isFeatured = true;

    // find all projects that match the provided query & sort them by creation date
    const projects = await Project.find(query)
      .populate("teamMembers", "name position image")
      .populate("publications", "title authors year journal")
      .sort({ isFeatured: -1, createdAt: -1 });

    // return the publications we have found to the response
    res.json(projects);
  } catch (error) {
    console.error("Get projects error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route GET /api/projects/:id
// @desc Get project by ID
// @access Public
router.get("/:id", async (req, res) => {
  try {
    // find the project with the provided id & populate the instance with the necessary info
    const project = await Project.findById(req.params.id)
      .populate("teamMembers", "name position image email expertise")
      .populate("publications");

    // check if no project with this id exists or the project with this id is not active
    if (!project || !project.isActive) {
      return res.status(404).json({ message: "Project not found" });
    }

    // return the project found to the response
    res.json(project);
  } catch (error) {
    console.error("Get project error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route POST /api/projects
// @desc Create new project
// @access Private (admin/editor)
router.post(
  "/",
  [
    auth,
    authorize("admin", "editor"),
    body("title").notEmpty().trim(),
    body("description").notEmpty().trim(),
    body("category").isIn([
      "magnetohydrodynamics",
      "turbomachinery",
      "bioengineering",
      "thermal-analysis",
      "turbulence",
      "multiphase-flow",
      "industrial-applications",
      "environmental-applications",
      "fluid-structure-interaction",
    ]),
    body("startDate").isISO8601(),
  ],
  async (req, res) => {
    try {
      // check if errors have occured
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // create new Project instance with the data from the request's body
      const project = new Project(req.body);
      // save the newly created project to the database
      await project.save();

      // find the project with the id with which it has been saved to the database & populate with the needed extra info
      const populatedProject = await Project.findById(project._id)
        .populate("teamMembers", "name position image")
        .populate("publications", "title authors year");

      // return success response & the newly created & populated project
      res.status(201).json({
        message: "Project created successfully",
        project: populatedProject,
      });
    } catch (error) {
      console.error("Create project error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// @route PUT /api/projects/:id
// @desc Update project
// @access Private (admin/editor)
router.put("/:id", [auth, authorize("admin", "editor")], async (req, res) => {
  try {
    // find the project with the provided id & update it with the data from request's body
    // also populate it with the extra necessary info
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("teamMembers", "name position image")
      .populate("publications", "title authors year");

    // check if we have not found a project with the provided id
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // return success response with the updated project
    res.json({
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    console.error("Update project error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route DELETE /api/projects/:id
// @desc Delete project (soft delete)
// @access Private (admin only)
router.delete("/:id", [auth, authorize("admin")], async (req, res) => {
  try {
    // find the project with the provided id & set it's isActive property to false
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    // check if we haven't found a project with this id
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // return success response
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Delete project error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
