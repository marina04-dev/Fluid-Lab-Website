import React, { useState, useEffect } from "react";
import { useContent } from "../../contexts/ContentContext";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Modal from "../../components/common/Modal";
import BackButton from "../../components/common/BackButton";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import toast from "react-hot-toast";

const ProjectManagement = () => {
  // get context's necessary variables/functions
  const {
    projects,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
    loading,
    error,
    clearError,
  } = useContent();

  // state variables to handle add project modal display
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  // state variables to handle edit project modal display
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // state variables to handle editing project
  const [editingProject, setEditingProject] = useState(null);
  // state variables to handle form data display
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    description: "",
    category: "",
    status: "active",
    startDate: "",
    endDate: "",
    teamMembers: "",
    tags: "",
    isFeatured: false,
    images: "",
    isActive: true,
  });
  // state variable to track submitting status
  const [isSubmitting, setIsSubmitting] = useState(false);

  // project categories options
  const categories = [
    "magnetohydrodynamics",
    "turbomachinery",
    "bioengineering",
    "thermal-analysis",
    "turbulence",
    "multiphase-flow",
    "industrial-applications",
    "environmental-applications",
    "fluid-structure-interaction",
  ];

  // project status options
  const statusOptions = ["active", "completed", "planned", "on-hold"];

  // Load projects on component mount using API call from context
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Clear errors on component mount
  useEffect(() => {
    clearError();
  }, [clearError]);

  // function to handle form inputs change
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // function to handle add project modal opening
  const handleAddProject = () => {
    setFormData({
      title: "",
      shortDescription: "",
      description: "",
      category: "",
      status: "active",
      startDate: "",
      endDate: "",
      teamMembers: "",
      tags: "",
      isFeatured: false,
      images: "",
      isActive: true,
    });
    setEditingProject(null);
    setIsAddModalOpen(true);
  };

  // function to handle edit project modal opening
  const handleEditProject = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title || "",
      shortDescription: project.shortDescription || "",
      description: project.description || "",
      category: project.category || "",
      status: project.status || "active",
      startDate: project.startDate ? project.startDate.split("T")[0] : "",
      endDate: project.endDate ? project.endDate.split("T")[0] : "",
      teamMembers: Array.isArray(project.teamMembers)
        ? project.teamMembers
            .map((m) => (typeof m === "string" ? m : m.name || m.email || ""))
            .join(", ")
        : project.teamMembers || "",
      tags: Array.isArray(project.tags)
        ? project.tags.join(", ")
        : project.tags || "",
      isFeatured: project.isFeatured || false,
      images: Array.isArray(project.images)
        ? project.images.join(", ")
        : project.images || "",
      isActive: project.isActive !== undefined ? project.isActive : true,
    });
    setIsEditModalOpen(true);
  };

  // function to handle project save (create or update) using API calls from context
  const handleSaveProject = async () => {
    // Basic validation
    if (!formData.title.trim()) {
      toast.error("Project title is required");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare data for API
      const projectData = {
        ...formData,
        // Convert comma-separated strings to arrays where needed
        teamMembers: formData.teamMembers
          ? formData.teamMembers
              .split(",")
              .map((item) => item.trim())
              .filter((item) => item)
          : [],
        tags: formData.tags
          ? formData.tags
              .split(",")
              .map((item) => item.trim())
              .filter((item) => item)
          : [],
        images: formData.images
          ? formData.images
              .split(",")
              .map((item) => item.trim())
              .filter((item) => item)
          : [],
      };

      let result;
      if (editingProject) {
        // Update existing project using context function
        result = await updateProject(editingProject._id, projectData);
      } else {
        // Create new project using context function
        result = await createProject(projectData);
      }

      if (result.success) {
        toast.success(
          editingProject
            ? "Project updated successfully!"
            : "Project created successfully!"
        );
        setIsEditModalOpen(false);
        setIsAddModalOpen(false);
        setEditingProject(null);
        // Refresh projects list
        fetchProjects();
      } else {
        toast.error(result.error || "Failed to save project");
      }
    } catch (error) {
      console.error("Error saving project:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  // function to handle project deletion using API call from context
  const handleDeleteProject = async (projectId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this project? This action cannot be undone."
      )
    ) {
      try {
        const result = await deleteProject(projectId);
        if (result.success) {
          toast.success("Project deleted successfully!");
          // Refresh projects list
          fetchProjects();
        } else {
          toast.error(result.error || "Failed to delete project");
        }
      } catch (error) {
        console.error("Error deleting project:", error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  // function to handle project status toggle using API call from context
  const handleToggleStatus = async (project) => {
    try {
      const result = await updateProject(project._id, {
        ...project,
        isActive: !project.isActive,
      });

      if (result.success) {
        toast.success("Project status updated!");
        // Refresh projects list
        fetchProjects();
      } else {
        toast.error(result.error || "Failed to update project status");
      }
    } catch (error) {
      console.error("Error updating project status:", error);
      toast.error("An unexpected error occurred");
    }
  };

  // function to handle featured status toggle using API call from context
  const handleToggleFeatured = async (project) => {
    try {
      const result = await updateProject(project._id, {
        ...project,
        isFeatured: !project.isFeatured,
      });

      if (result.success) {
        toast.success("Featured status updated!");
        // Refresh projects list
        fetchProjects();
      } else {
        toast.error(result.error || "Failed to update featured status");
      }
    } catch (error) {
      console.error("Error updating featured status:", error);
      toast.error("An unexpected error occurred");
    }
  };

  // function to format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  // function to truncate text for display
  const truncateText = (text, maxLength = 100) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  // if projects management page is slow display loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading projects..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <BackButton />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Project Management
              </h1>
              <p className="text-gray-600">
                Manage research projects and their details
              </p>
            </div>
          </div>
          <Button
            onClick={handleAddProject}
            className="flex items-center space-x-2"
          >
            <span>+</span>
            <span>Add Project</span>
          </Button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="text-red-800">
                <strong>Error:</strong> {error}
              </div>
              <button
                onClick={clearError}
                className="text-red-600 hover:text-red-800"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Projects List */}
        {projects.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Projects Found
              </h3>
              <p className="text-gray-600 mb-6">
                Get started by adding your first project
              </p>
              <Button onClick={handleAddProject}>Add Your First Project</Button>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project._id}>
                <div className="flex flex-col h-full">
                  {/* Project Status Indicators */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          project.status === "active"
                            ? "bg-green-100 text-green-800"
                            : project.status === "completed"
                            ? "bg-blue-100 text-blue-800"
                            : project.status === "planned"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {project.status?.charAt(0).toUpperCase() +
                          project.status?.slice(1) || "Unknown"}
                      </span>
                      {project.isFeatured && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      <span
                        className={`w-3 h-3 rounded-full ${
                          project.isActive ? "bg-green-400" : "bg-red-400"
                        }`}
                      ></span>
                      <span className="text-xs text-gray-500">
                        {project.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {project.title}
                  </h3>

                  {/* Project Description */}
                  <p className="text-gray-600 mb-4 flex-1">
                    {truncateText(
                      project.shortDescription || project.description
                    )}
                  </p>

                  {/* Project Details */}
                  <div className="space-y-2 mb-4 text-sm text-gray-500">
                    {project.category && (
                      <div>
                        <strong>Category:</strong>{" "}
                        {project.category.replace(/-/g, " ")}
                      </div>
                    )}
                    {project.startDate && (
                      <div>
                        <strong>Started:</strong>{" "}
                        {formatDate(project.startDate)}
                      </div>
                    )}
                    {project.endDate && (
                      <div>
                        <strong>End Date:</strong> {formatDate(project.endDate)}
                      </div>
                    )}
                    <div>
                      <strong>Created:</strong> {formatDate(project.createdAt)}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditProject(project)}
                      className="flex-1 text-purple-600"
                    >
                      Edit
                    </Button>
                    <Button
                      variant={project.isFeatured ? "solid" : "outline"}
                      size="sm"
                      onClick={() => handleToggleFeatured(project)}
                      className={`${
                        project.isFeatured ? "text-white" : "text-purple-600"
                      }`}
                    >
                      {project.isFeatured ? "★" : "☆"}
                    </Button>
                    <Button
                      variant={project.isActive ? "solid" : "outline"}
                      size="sm"
                      onClick={() => handleToggleStatus(project)}
                    >
                      {project.isActive ? "●" : "○"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteProject(project._id)}
                      className="text-red-600 border-red-300 hover:bg-red-50"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Add/Edit Project Modal */}
        <Modal
          isOpen={isAddModalOpen || isEditModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            setIsEditModalOpen(false);
            setEditingProject(null);
          }}
          title={editingProject ? "Edit Project" : "Add New Project"}
          size="lg"
        >
          <div className="space-y-6">
            {/* Title */}
            <Input
              label="Project Title *"
              name="title"
              value={formData.title}
              onChange={handleFormChange}
              placeholder="Enter project title"
              required
            />

            {/* Short Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Description *
              </label>
              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleFormChange}
                rows="3"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief project description for listings"
                required
              />
            </div>

            {/* Full Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                rows="6"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Detailed project description"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category
                        .replace(/-/g, " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleFormChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Start Date */}
              <Input
                label="Start Date"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleFormChange}
              />

              {/* End Date */}
              <Input
                label="End Date"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleFormChange}
              />
            </div>

            {/* Team Members */}
            <Input
              label="Team Members"
              name="teamMembers"
              value={formData.teamMembers}
              onChange={handleFormChange}
              placeholder="Enter team member names separated by commas"
            />

            {/* Tags */}
            <Input
              label="Tags"
              name="tags"
              value={formData.tags}
              onChange={handleFormChange}
              placeholder="Enter tags separated by commas"
            />

            {/* Images */}
            <Input
              label="Image URLs"
              name="images"
              value={formData.images}
              onChange={handleFormChange}
              placeholder="Enter image URLs separated by commas"
            />

            {/* Checkboxes */}
            <div className="flex items-center space-x-6">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleFormChange}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Featured Project
                </span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleFormChange}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Active
                </span>
              </label>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex justify-end space-x-4 mt-8">
            <Button
              variant="outline"
              onClick={() => {
                setIsAddModalOpen(false);
                setIsEditModalOpen(false);
                setEditingProject(null);
              }}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveProject}
              disabled={isSubmitting}
              className="flex items-center space-x-2"
            >
              {isSubmitting && <LoadingSpinner size="sm" />}
              <span>
                {isSubmitting
                  ? "Saving..."
                  : editingProject
                  ? "Update Project"
                  : "Create Project"}
              </span>
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ProjectManagement;
