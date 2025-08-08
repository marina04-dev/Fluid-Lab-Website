const express = require("express");
const { body, validationResult } = require("express-validator");
const TeamMember = require("../models/TeamMember");
const { auth, authorize } = require("../middleware/auth");

const router = express.Router();

// @route GET /api/team
// @desc Get all active team members
// @access Public
router.get("/", async (req, res) => {
  try {
    // find all active team members from the database
    const teamMembers = await TeamMember.find({ isActive: true }).sort({
      order: 1,
      createdAt: -1,
    });

    // return the found team members to the response
    res.json(teamMembers);
  } catch (error) {
    console.error("Get team members error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route GET /api/team/:id
// @desc Get team member by ID
// @access Public
router.get("/:id", async (req, res) => {
  try {
    // get the team member with the provided id
    const teamMember = await TeamMember.findById(req.params.id);

    // check if the team member is active or a team member with this id is not available
    if (!teamMember || !teamMember.isActive) {
      return res.status(404).json({ message: "Team member not found" });
    }

    // return the found team member to the response
    res.json(teamMember);
  } catch (error) {
    console.error("Get team member error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route POST /api/team
// @desc Create new team member
// @access Private (admin/editor)
router.post(
  "/",
  [
    auth,
    authorize("admin", "editor"),
    body("name").notEmpty().trim(),
    body("position").notEmpty().trim(),
    body("bio").notEmpty().trim(),
    body("email").optional().isEmail().normalizeEmail(),
  ],
  async (req, res) => {
    try {
      // check if errors have occured
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // create a new instance a TeamMember with the data from the request's body
      const teamMember = new TeamMember(req.body);
      // save the newly created team member to the database
      await teamMember.save();

      // return success response
      res.status(201).json({
        message: "Team member created successfully",
        teamMember,
      });
    } catch (error) {
      console.error("Create team member error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// @route PUT /api/team/:id
// @desc Update team member
// @access Private (admin/editor)
router.put(
  "/:id",
  [
    auth,
    authorize("admin", "editor"),
    body("name").optional().trim(),
    body("position").optional().trim(),
    body("bio").optional().trim(),
    body("email").optional().isEmail().normalizeEmail(),
  ],
  async (req, res) => {
    try {
      // check if errors have occured
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // find the team member with the provided id and update it
      const teamMember = await TeamMember.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      // if we did not find a team member with the provided id
      if (!teamMember) {
        return res.status(404).json({ message: "Team member not found" });
      }

      // return success response with the team member we have found
      res.json({
        message: "Team member updated successfully",
        teamMember,
      });
    } catch (error) {
      console.error("Update team member error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// @route DELETE /api/team/:id
// @desc Delete team member (soft delete)
// @access Private (admin only)
router.delete("/:id", [auth, authorize("admin")], async (req, res) => {
  try {
    // find the team member with the provided id and deactivate it
    const teamMember = await TeamMember.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    // check if no team member with this id was found
    if (!teamMember) {
      return res.status(404).json({ message: "Team member not found" });
    }

    // return success response
    res.json({ message: "Team member deleted successfully" });
  } catch (error) {
    console.error("Delete team member error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
