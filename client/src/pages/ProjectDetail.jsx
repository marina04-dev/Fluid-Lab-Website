import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useContent } from "../contexts/ContentContext";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Card from "../components/common/Card";

const ProjectDetail = () => {
  // get the project's id from url params
  const { id } = useParams();
  // get necessary variables/functions from ContentContext
  const { fetchProjectById, loading, error, clearError } = useContent();
  // state variable for project display
  const [project, setProject] = useState(null);
  // state variables for local loading (for this specific project)
  const [localLoading, setLocalLoading] = useState(true);
  // state variables for local error
  const [localError, setLocalError] = useState(null);

  // fetch project by id each time the id changes using ContentContext function
  useEffect(() => {
    const loadProject = async () => {
      setLocalLoading(true);
      setLocalError(null);

      try {
        // Use the fetchProjectById function from ContentContext
        const result = await fetchProjectById(id);

        if (result.success) {
          setProject(result.data);
        } else {
          setLocalError(result.error || "Failed to load project");
        }
      } catch (err) {
        console.error("Error loading project:", err);
        setLocalError("An unexpected error occurred");
      } finally {
        setLocalLoading(false);
      }
    };

    if (id) {
      loadProject();
    }
  }, [id, fetchProjectById]);

  // Clear any existing errors on component mount
  useEffect(() => {
    clearError();
  }, [clearError]);

  // function to format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // function to format team members for display
  const formatTeamMembers = (teamMembers) => {
    if (!teamMembers || teamMembers.length === 0)
      return "No team members assigned";

    if (Array.isArray(teamMembers)) {
      return teamMembers
        .map((member, index) => {
          // Handle if member is an object with name/email or just a string
          if (typeof member === "object" && member.name) {
            return member.name;
          } else if (typeof member === "object" && member.email) {
            return member.email;
          } else {
            return member.toString();
          }
        })
        .join(", ");
    }

    return teamMembers.toString();
  };

  // function to get status badge style
  const getStatusBadge = (status) => {
    const statusStyles = {
      active: "bg-green-100 text-green-800",
      completed: "bg-blue-100 text-blue-800",
      planned: "bg-yellow-100 text-yellow-800",
      "on-hold": "bg-red-100 text-red-800",
    };
    return statusStyles[status] || "bg-gray-100 text-gray-800";
  };

  // if project's display is slow display loading
  if (localLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading project..." />
      </div>
    );
  }

  // if project's display has an error or no project with this id exists display error & link to navigate back to all projects
  if (localError || error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Project Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            {localError || error || "The requested project could not be found."}
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="pt-24 pb-16 gradient-bg">
        <div className="container-custom">
          <div className="text-center text-white">
            {/* Breadcrumb */}
            <div className="mb-6">
              <Link
                to="/projects"
                className="text-white/80 hover:text-white text-sm"
              >
                ← Back to Projects
              </Link>
            </div>

            <h1 className="text-4xl font-bold mb-6">{project.title}</h1>

            {/* Project Meta */}
            <div className="flex flex-wrap justify-center gap-4 text-sm opacity-90">
              <span
                className={`px-3 py-1 rounded-full ${getStatusBadge(
                  project.status
                )}`}
              >
                {project.status?.charAt(0).toUpperCase() +
                  project.status?.slice(1) || "Unknown"}
              </span>

              {project.category && (
                <span className="px-3 py-1 bg-white/20 rounded-full">
                  {project.category
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </span>
              )}

              {project.isFeatured && (
                <span className="px-3 py-1 bg-yellow-500/80 text-yellow-900 rounded-full">
                  Featured Project
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Project Images */}
              {project.images && project.images.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Project Images
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.images.map((image, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-lg shadow-md overflow-hidden"
                      >
                        <img
                          src={image.url || image}
                          alt={image.caption || `Project image ${index + 1}`}
                          className="w-full h-64 object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.parentElement.className =
                              "w-full h-64 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold";
                            e.target.parentElement.innerHTML =
                              "Image Not Available";
                          }}
                        />
                        {typeof image === "object" && image.caption && (
                          <div className="p-3">
                            <p className="text-sm text-gray-600">
                              {image.caption}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Project Overview
                </h2>
                <Card>
                  <div className="prose prose-lg text-gray-600">
                    {project.description || project.shortDescription ? (
                      <p className="whitespace-pre-wrap">
                        {project.description || project.shortDescription}
                      </p>
                    ) : (
                      <p className="text-gray-500 italic">
                        No detailed description available for this project.
                      </p>
                    )}
                  </div>
                </Card>
              </div>

              {/* Project Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Research Tags
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="badge badge-blue">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Publications (if any) */}
              {project.publications && project.publications.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Related Publications
                  </h2>
                  <div className="space-y-4">
                    {project.publications.map((publication) => (
                      <Card key={publication._id} hover>
                        <h3 className="font-semibold text-gray-900 mb-2">
                          <Link
                            to={`/publications/${publication._id}`}
                            className="hover:text-blue-600"
                          >
                            {publication.title}
                          </Link>
                        </h3>
                        <p className="text-gray-600 mb-2">
                          {Array.isArray(publication.authors)
                            ? publication.authors.join(", ")
                            : publication.authors}
                        </p>
                        <p className="text-sm text-gray-500">
                          {publication.journal && `${publication.journal} • `}
                          {publication.year}
                        </p>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Project Details */}
              <Card className="sticky top-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Project Details
                </h3>

                <div className="space-y-6">
                  {/* Status */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Status
                    </h4>
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(
                        project.status
                      )}`}
                    >
                      {project.status?.charAt(0).toUpperCase() +
                        project.status?.slice(1) || "Unknown"}
                    </span>
                  </div>

                  {/* Category */}
                  {project.category && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">
                        Category
                      </h4>
                      <p className="text-gray-900">
                        {project.category
                          .replace(/-/g, " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </p>
                    </div>
                  )}

                  {/* Timeline */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Timeline
                    </h4>
                    <div className="text-gray-900">
                      <p>
                        <strong>Started:</strong>{" "}
                        {formatDate(project.startDate)}
                      </p>
                      {project.endDate && (
                        <p>
                          <strong>Expected End:</strong>{" "}
                          {formatDate(project.endDate)}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Team Members */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Team Members
                    </h4>
                    <p className="text-gray-900">
                      {formatTeamMembers(project.teamMembers)}
                    </p>
                  </div>

                  {/* Created Date */}
                  {project.createdAt && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">
                        Created
                      </h4>
                      <p className="text-gray-900">
                        {formatDate(project.createdAt)}
                      </p>
                    </div>
                  )}

                  {/* Last Updated */}
                  {project.updatedAt && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">
                        Last Updated
                      </h4>
                      <p className="text-gray-900">
                        {formatDate(project.updatedAt)}
                      </p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="space-y-3">
                    <Link
                      to="/projects"
                      className="w-full btn btn-outline text-center block"
                    >
                      ← Back to All Projects
                    </Link>

                    <Link
                      to="/contact"
                      className="w-full btn btn-primary text-center block"
                    >
                      Contact About This Project
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
