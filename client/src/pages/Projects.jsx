import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContent } from "../contexts/ContentContext";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Card from "../components/common/Card";
import Button from "../components/common/Button";

const Projects = () => {
  // get context's necessary variables/functions
  const { projects, fetchProjects, loading } = useContent();
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

  // fetchProjects each time any of the filters changes
  useEffect(() => {
    const filters = {};
    if (selectedCategory !== "all") filters.category = selectedCategory;
    if (selectedStatus !== "all") filters.status = selectedStatus;

    fetchProjects(filters);
  }, [selectedCategory, selectedStatus, fetchProjects]);

  // store the filtered projects in another variable
  const filteredProjects = projects;

  // if projects display is slow display loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading projects..." />
      </div>
    );
  }

  // color adjustment based on the status value
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "planned":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="pt-24 pb-16 gradient-bg">
        <div className="container-custom">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-6">Research Projects</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Explore our current and completed research initiatives in fluid
              mechanics and related fields
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              {/* Category Filter */}
              <div className="min-w-0 flex-1 lg:min-w-64">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="min-w-0 flex-1 lg:min-w-48">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {statuses.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="text-sm text-gray-600">
              {filteredProjects.length} project
              {filteredProjects.length !== 1 ? "s" : ""} found
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No projects found
              </h3>
              <p className="text-gray-600">
                Try adjusting your filters to see more results.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <Card key={project._id} hover>
                  <div className="h-full flex flex-col">
                    {/* Project Image */}
                    {project.images && project.images.length > 0 ? (
                      <div className="mb-4">
                        <img
                          src={project.images[0].url}
                          alt={project.images[0].caption || project.title}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                    ) : (
                      <div className="mb-4">
                        <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                          <svg
                            className="w-12 h-12 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                            />
                          </svg>
                        </div>
                      </div>
                    )}

                    {/* Project Info */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                          {project.category
                            .replace("-", " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                        </span>
                        <span
                          className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(
                            project.status
                          )}`}
                        >
                          {project.status.charAt(0).toUpperCase() +
                            project.status.slice(1)}
                        </span>
                        {project.isFeatured && (
                          <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
                            Featured
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {project.title}
                      </h3>

                      <p className="text-gray-600 mb-4 flex-1">
                        {project.description}
                      </p>

                      {/* Project Metadata */}
                      <div className="space-y-2 mb-4 text-sm text-gray-500">
                        <div className="flex items-center">
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
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                          </svg>
                          Started: {formatDate(project.startDate)}
                        </div>
                        {project.endDate && (
                          <div className="flex items-center">
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
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            Completed: {formatDate(project.endDate)}
                          </div>
                        )}
                        {project.teamMembers &&
                          project.teamMembers.length > 0 && (
                            <div className="flex items-center">
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
                                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                              </svg>
                              {project.teamMembers.length} team member
                              {project.teamMembers.length !== 1 ? "s" : ""}
                            </div>
                          )}
                      </div>

                      {/* Tags */}
                      {project.tags && project.tags.length > 0 && (
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {project.tags.slice(0, 3).map((tag, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                              >
                                {tag}
                              </span>
                            ))}
                            {project.tags.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                +{project.tags.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* View Details Link */}
                      <Link
                        to={`/projects/${project._id}`}
                        className="text-blue-600 hover:text-blue-700 font-medium mt-auto"
                      >
                        View Details →
                      </Link>
                    </div>
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
