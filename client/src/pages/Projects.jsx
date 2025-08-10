import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContent } from "../contexts/ContentContext";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Card from "../components/common/Card";
import Button from "../components/common/Button";

const Projects = () => {
  // get context's necessary variables/functions
  const { projects, fetchProjects, loading, error, clearError } = useContent();
  // category filter state variables
  const [selectedCategory, setSelectedCategory] = useState("all");
  // status filter state variables
  const [selectedStatus, setSelectedStatus] = useState("all");

  // categories filter values
  const categories = [
    { value: "all", label: "All Categories" },
    { value: "magnetohydrodynamics", label: "Magnetohydrodynamics" },
    { value: "turbomachinery", label: "Turbomachinery" },
    { value: "bioengineering", label: "Bioengineering" },
    { value: "thermal-analysis", label: "Thermal Analysis" },
    { value: "turbulence", label: "Turbulence" },
    { value: "multiphase-flow", label: "Multiphase Flow" },
    { value: "industrial-applications", label: "Industrial Applications" },
    {
      value: "environmental-applications",
      label: "Environmental Applications",
    },
    {
      value: "fluid-structure-interaction",
      label: "Fluid-Structure Interaction",
    },
  ];

  // statuses filter values
  const statuses = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" },
    { value: "planned", label: "Planned" },
  ];

  // fetchProjects each time any of the filters changes using the API call from context
  useEffect(() => {
    const filters = {};
    if (selectedCategory !== "all") {
      filters.category = selectedCategory;
    }
    if (selectedStatus !== "all") {
      filters.status = selectedStatus;
    }

    // Call the API using context function
    fetchProjects(filters);
  }, [selectedCategory, selectedStatus, fetchProjects]);

  // Clear any existing errors on component mount
  useEffect(() => {
    clearError();
  }, [clearError]);

  // function to get status badge style based on project status
  const getStatusBadge = (status) => {
    const statusStyles = {
      active: "badge-green",
      completed: "badge-blue",
      planned: "badge-yellow",
      "on-hold": "badge-red",
    };
    return statusStyles[status] || "badge-gray";
  };

  // function to format date display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // function to truncate text for card display
  const truncateText = (text, maxLength = 150) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  // if projects display is slow display loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading projects..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="pt-24 pb-16 gradient-bg">
        <div className="container-custom">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-6">Research Projects</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Explore our cutting-edge research initiatives in fluid mechanics
              and related fields
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category Filter */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Filter by Category
                </label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Filter by Status
                </label>
                <select
                  id="status"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {statuses.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
              <div className="flex items-center">
                <div className="text-red-800">
                  <strong>Error:</strong> {error}
                </div>
                <button
                  onClick={clearError}
                  className="ml-auto text-red-600 hover:text-red-800"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          {/* Projects Grid */}
          {!projects || projects.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  No Projects Found
                </h3>
                <p className="text-gray-600 mb-6">
                  {selectedCategory !== "all" || selectedStatus !== "all"
                    ? "No projects match your current filters. Try adjusting your search criteria."
                    : "No projects are available at the moment."}
                </p>
                {(selectedCategory !== "all" || selectedStatus !== "all") && (
                  <Button
                    onClick={() => {
                      setSelectedCategory("all");
                      setSelectedStatus("all");
                    }}
                    variant="outline"
                    className="text-purple-600"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Card key={project._id} hover className="flex flex-col h-full">
                  {/* Project Image */}
                  {project.images && project.images.length > 0 && (
                    <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-6 overflow-hidden">
                      <img
                        src={project.images[0].url || project.images[0]}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.parentElement.className =
                            "aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-6 flex items-center justify-center";
                          e.target.parentElement.innerHTML =
                            '<span class="text-white font-semibold">No Image</span>';
                        }}
                      />
                    </div>
                  )}

                  {!project.images ||
                    (project.images.length === 0 && (
                      <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-6 flex items-center justify-center">
                        <span className="text-white font-semibold">
                          No Image Available
                        </span>
                      </div>
                    ))}

                  {/* Project Content */}
                  <div className="flex-1 flex flex-col">
                    {/* Status and Featured badges */}
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`badge ${getStatusBadge(project.status)}`}
                      >
                        {project.status.charAt(0).toUpperCase() +
                          project.status.slice(1)}
                      </span>
                      {project.isFeatured && (
                        <span className="badge badge-purple">Featured</span>
                      )}
                    </div>

                    {/* Project Title */}
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      <Link
                        to={`/projects/${project._id}`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {project.title}
                      </Link>
                    </h3>

                    {/* Project Description */}
                    <p className="text-gray-600 mb-4 flex-1">
                      {truncateText(
                        project.shortDescription || project.description
                      )}
                    </p>

                    {/* Project Metadata */}
                    <div className="space-y-2 mb-4">
                      {project.category && (
                        <div className="text-sm text-gray-500">
                          <strong>Category:</strong>{" "}
                          {project.category
                            .split("-")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ")}
                        </div>
                      )}
                      {project.startDate && (
                        <div className="text-sm text-gray-500">
                          <strong>Started:</strong>{" "}
                          {formatDate(project.startDate)}
                        </div>
                      )}
                      {project.endDate && (
                        <div className="text-sm text-gray-500">
                          <strong>Expected End:</strong>{" "}
                          {formatDate(project.endDate)}
                        </div>
                      )}
                    </div>

                    {/* Project Tags */}
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="badge badge-gray text-xs"
                          >
                            {tag.trim()}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="badge badge-gray text-xs">
                            +{project.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* View Project Button */}
                    <Link
                      to={`/projects/${project._id}`}
                      className="btn btn-primary w-full mt-auto"
                    >
                      View Project Details
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;
