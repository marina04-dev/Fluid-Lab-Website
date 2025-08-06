// client/src/pages/admin/ProjectManagement.jsx
import React, { useState, useEffect } from "react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Modal from "../../components/common/Modal";
import BackButton from "../../components/common/BackButton";
import toast from "react-hot-toast";

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
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

  const statusOptions = ["active", "completed", "planned", "on-hold"];

  // Mock data για demo
  useEffect(() => {
    const mockProjects = [
      {
        id: 1,
        title: "Advanced CFD Modeling of Turbulent Flows",
        shortDescription:
          "Development of advanced computational models for complex turbulent flow scenarios.",
        description:
          "This project focuses on creating sophisticated computational fluid dynamics models that can accurately predict turbulent flow behavior in various industrial applications. We utilize state-of-the-art numerical methods and validation against experimental data.",
        category: "turbulence",
        status: "active",
        startDate: "2024-01-15",
        endDate: "2024-12-31",
        teamMembers: "Dr. Maria Papadakis, Dr. Nikos Georgiadis",
        tags: "CFD, Turbulence, Modeling, Simulation",
        isFeatured: true,
        images:
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
        isActive: true,
        createdAt: "2024-01-15",
      },
      {
        id: 2,
        title: "Biofluid Mechanics in Cardiovascular Systems",
        shortDescription:
          "Investigation of blood flow dynamics in cardiovascular applications.",
        description:
          "Research into the complex fluid mechanics of blood flow within the cardiovascular system, including the development of patient-specific models for medical applications.",
        category: "bioengineering",
        status: "active",
        startDate: "2024-02-01",
        endDate: "2024-11-30",
        teamMembers: "Dr. Anna Christou, Dr. Maria Papadakis",
        tags: "Bioengineering, Medical, Blood Flow, Cardiovascular",
        isFeatured: true,
        images:
          "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
        isActive: true,
        createdAt: "2024-02-01",
      },
      {
        id: 3,
        title: "Heat Transfer Optimization in Industrial Systems",
        shortDescription:
          "Optimization of heat transfer processes in industrial equipment.",
        description:
          "Development of optimization strategies for heat transfer enhancement in various industrial systems, focusing on energy efficiency and performance improvements.",
        category: "thermal-analysis",
        status: "completed",
        startDate: "2023-06-01",
        endDate: "2024-01-31",
        teamMembers: "Dr. Nikos Georgiadis",
        tags: "Heat Transfer, Optimization, Industrial, Energy Efficiency",
        isFeatured: false,
        images:
          "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
        isActive: true,
        createdAt: "2023-06-01",
      },
    ];
    setProjects(mockProjects);
  }, []);

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

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
    setIsAddModalOpen(true);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      shortDescription: project.shortDescription,
      description: project.description,
      category: project.category,
      status: project.status,
      startDate: project.startDate,
      endDate: project.endDate,
      teamMembers: project.teamMembers,
      tags: project.tags,
      isFeatured: project.isFeatured,
      images: project.images,
      isActive: project.isActive,
    });
    setIsEditModalOpen(true);
  };

  const handleSaveProject = () => {
    if (editingProject) {
      // Update existing project
      setProjects((prev) =>
        prev.map((project) =>
          project.id === editingProject.id
            ? { ...project, ...formData }
            : project
        )
      );
      toast.success("Project updated successfully!");
      setIsEditModalOpen(false);
    } else {
      // Add new project
      const newProject = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setProjects((prev) => [...prev, newProject]);
      toast.success("New project added successfully!");
      setIsAddModalOpen(false);
    }
    setEditingProject(null);
  };

  const handleDeleteProject = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setProjects((prev) => prev.filter((project) => project.id !== id));
      toast.success("Project deleted successfully!");
    }
  };

  const handleToggleStatus = (id) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id
          ? { ...project, isActive: !project.isActive }
          : project
      )
    );
    toast.success("Project status updated!");
  };

  const handleToggleFeatured = (id) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id
          ? { ...project, isFeatured: !project.isFeatured }
          : project
      )
    );
    toast.success("Featured status updated!");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "completed":
        return "bg-blue-100 text-blue-700";
      case "planned":
        return "bg-yellow-100 text-yellow-700";
      case "on-hold":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-4 mb-2">
            <BackButton variant="back" text="Back to Dashboard" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Project Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage research projects and publications
          </p>
        </div>
        <Button onClick={handleAddProject}>
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add Project
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {projects.length}
            </div>
            <div className="text-sm text-gray-600">Total Projects</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {projects.filter((p) => p.status === "active").length}
            </div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {projects.filter((p) => p.status === "completed").length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">
              {projects.filter((p) => p.status === "planned").length}
            </div>
            <div className="text-sm text-gray-600">Planned</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {projects.filter((p) => p.isFeatured).length}
            </div>
            <div className="text-sm text-gray-600">Featured</div>
          </div>
        </Card>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.id}>
            <div className="flex flex-col space-y-4">
              {/* Project Image & Title */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <img
                    src={project.images || "https://via.placeholder.com/80x60"}
                    alt={project.title}
                    className="w-20 h-15 rounded-lg object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                      {project.title}
                    </h3>
                    <div className="flex items-center space-x-2 ml-2">
                      {project.isFeatured && (
                        <span className="text-yellow-500" title="Featured">
                          ⭐
                        </span>
                      )}
                      <div
                        className={`w-3 h-3 rounded-full ${
                          project.isActive ? "bg-green-500" : "bg-gray-400"
                        }`}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {project.shortDescription}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span
                      className={`px-2 py-1 rounded ${getStatusColor(
                        project.status
                      )}`}
                    >
                      {project.status}
                    </span>
                    <span>{project.category.replace("-", " ")}</span>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Team:</strong> {project.teamMembers}
                </div>
                <div>
                  <strong>Period:</strong> {project.startDate} -{" "}
                  {project.endDate}
                </div>
                <div>
                  <strong>Tags:</strong> {project.tags}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 pt-4 border-t">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEditProject(project)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant={project.isFeatured ? "secondary" : "outline"}
                  onClick={() => handleToggleFeatured(project.id)}
                >
                  {project.isFeatured ? "Unfeature" : "Feature"}
                </Button>
                <Button
                  size="sm"
                  variant={project.isActive ? "outline" : "secondary"}
                  onClick={() => handleToggleStatus(project.id)}
                >
                  {project.isActive ? "Deactivate" : "Activate"}
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDeleteProject(project.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add/Edit Project Modal */}
      <Modal
        isOpen={isAddModalOpen || isEditModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setIsEditModalOpen(false);
          setEditingProject(null);
        }}
        title={editingProject ? "Edit Project" : "Add Project"}
        size="xl"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Input
                label="Project Title"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="md:col-span-2">
              <Input
                label="Short Description"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleFormChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleFormChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat
                      .replace("-", " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleFormChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status
                      .replace("-", " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
            <Input
              label="Start Date"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleFormChange}
            />
            <Input
              label="End Date"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleFormChange}
            />
            <div className="md:col-span-2">
              <Input
                label="Team Members"
                name="teamMembers"
                value={formData.teamMembers}
                onChange={handleFormChange}
                placeholder="e.g., Dr. John Doe, Dr. Jane Smith"
              />
            </div>
            <div className="md:col-span-2">
              <Input
                label="Tags"
                name="tags"
                value={formData.tags}
                onChange={handleFormChange}
                placeholder="e.g., CFD, Simulation, Research"
              />
            </div>
            <div className="md:col-span-2">
              <Input
                label="Image URL"
                name="images"
                value={formData.images}
                onChange={handleFormChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleFormChange}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Detailed project description..."
            />
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleFormChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">
                Featured project
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleFormChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">
                Active project
              </label>
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => {
                setIsAddModalOpen(false);
                setIsEditModalOpen(false);
                setEditingProject(null);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveProject}>
              {editingProject ? "Update Project" : "Add Project"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectManagement;
