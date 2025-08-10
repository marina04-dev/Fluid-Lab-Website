const mongoose = require("mongoose");

const publicationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    authors: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    journal: {
      type: String,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
      min: 1900,
      max: new Date().getFullYear() + 5,
    },
    volume: String,
    issue: String,
    pages: String,
    doi: String,
    url: String,
    abstract: String,
    type: {
      type: String,
      enum: ["journal", "conference", "book", "thesis", "preprint"],
      default: "journal",
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Publication", publicationSchema);
