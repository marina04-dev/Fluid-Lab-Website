import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Card from "../components/common/Card";

const ProjectDetail = () => {
  // get the project's id from url params
  const { id } = useParams();
  // state variable for project display
  const [project, setProject] = useState(null);
  // state variables for loading display
  const [loading, setLoading] = useState(true);
  // state variables for error display
  const [error, setError] = useState(null);

  // fetch project by id each time the id changes & do the api call & adjust loading & error state variables accordingly
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/projects/${id}`);
        setProject(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  // if project's display is slow display loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading project..." />
      </div>
    );
  }

  // if project's display has a result of an error occur or no project with this id exists display error & link to navigate back to all projects
  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Project Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            {error || "The requested project could not be found."}
          </p>
          <Link to="/projects" className="text-blue-600 hover:text-blue-700">
            ← Back to Projects
          </Link>
        </div>
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
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-24 pb-8 bg-gray-50">
        <div className="container-custom">
          <Link
            to="/projects"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Projects
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
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
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </span>
            {project.isFeatured && (
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
                Featured
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {project.title}
          </h1>

          <p className="text-xl text-gray-600 max-w-4xl">
            {project.description}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Project Images */}
              {project.images && project.images.length > 0 && (
                <div className="mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.images.map((image, index) => (
                      <div key={index} className="rounded-lg overflow-hidden">
                        <img
                          src={image.url}
                          alt={image.caption || `Project image ${index + 1}`}
                          className="w-full h-64 object-cover"
                        />
                        {image.caption && (
                          <p className="text-sm text-gray-600 mt-2 px-1">
                            {image.caption}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Full Description */}
              {project.fullDescription && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Project Overview
                  </h2>
                  <div className="prose prose-lg text-gray-600">
                    <p>{project.fullDescription}</p>
                  </div>
                </div>
              )}

              {/* Team Members */}
              {project.teamMembers && project.teamMembers.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Team Members
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.teamMembers.map((member) => (
                      <Card key={member._id} hover>
                        <div className="flex items-center space-x-4">
                          {member.image ? (
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                              <svg
                                className="w-8 h-8 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                              </svg>
                            </div>
                          )}
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {member.name}
                            </h3>
                            <p className="text-blue-600">{member.position}</p>
                            {member.email && (
                              <a
                                href={`mailto:${member.email}`}
                                className="text-sm text-gray-600 hover:text-blue-600"
                              >
                                {member.email}
                              </a>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Publications */}
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
                          {publication.authors.join(", ")}
                        </p>
                        <p className="text-sm text-gray-500">
                          {publication.journal} • {publication.year}
                        </p>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Project Details
                </h3>

                <div className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Status
                    </dt>
                    <dd className="mt-1">
                      <span
                        className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(
                          project.status
                        )}`}
                      >
                        {project.status.charAt(0).toUpperCase() +
                          project.status.slice(1)}
                      </span>
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Start Date
                    </dt>
                    <dd className="mt-1 text-gray-900">
                      {formatDate(project.startDate)}
                    </dd>
                  </div>

                  {project.endDate && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        End Date
                      </dt>
                      <dd className="mt-1 text-gray-900">
                        {formatDate(project.endDate)}
                      </dd>
                    </div>
                  )}

                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Category
                    </dt>
                    <dd className="mt-1 text-gray-900">
                      {project.category
                        .replace("-", " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </dd>
                  </div>

                  {project.tags && project.tags.length > 0 && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500 mb-2">
                        Tags
                      </dt>
                      <dd className="flex flex-wrap gap-2">
                        {project.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </dd>
                    </div>
                  )}
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
