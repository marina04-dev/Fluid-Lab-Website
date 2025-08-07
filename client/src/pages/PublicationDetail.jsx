import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Card from "../components/common/Card";

const PublicationDetail = () => {
  // get the publication's id from url params
  const { id } = useParams();
  // state variables for publication display
  const [publication, setPublication] = useState(null);
  // state variables for loading display
  const [loading, setLoading] = useState(true);
  // state variables for error display
  const [error, setError] = useState(null);

  // fetch publication by id each time the id changes & do the api call & adjust loading & error state variables accordingly
  useEffect(() => {
    const fetchPublication = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/publications/${id}`);
        setPublication(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load publication");
      } finally {
        setLoading(false);
      }
    };

    fetchPublication();
  }, [id]);

  // if publication's display is slow display loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading publication..." />
      </div>
    );
  }

  // if publication's display has a result of an error occur or no publication with this id exists display error & link to navigate back to all publications
  if (error || !publication) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Publication Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            {error || "The requested publication could not be found."}
          </p>
          <Link
            to="/publications"
            className="text-blue-600 hover:text-blue-700"
          >
            ← Back to Publications
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-24 pb-8 bg-gray-50">
        <div className="container-custom">
          <Link
            to="/publications"
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
            Back to Publications
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              {publication.type.charAt(0).toUpperCase() +
                publication.type.slice(1)}
            </span>
            <span className="text-2xl font-bold text-blue-600">
              {publication.year}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {publication.title}
          </h1>

          <div className="text-xl text-gray-700 mb-4">
            {publication.authors.join(", ")}
          </div>

          {publication.journal && (
            <div className="text-lg text-gray-600">
              <span className="font-medium">{publication.journal}</span>
              {publication.volume && ` • Volume ${publication.volume}`}
              {publication.issue && ` • Issue ${publication.issue}`}
              {publication.pages && ` • Pages ${publication.pages}`}
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Abstract */}
              {publication.abstract && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Abstract
                  </h2>
                  <div className="prose prose-lg text-gray-600">
                    <p>{publication.abstract}</p>
                  </div>
                </div>
              )}

              {/* Related Projects */}
              {publication.projects && publication.projects.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Related Projects
                  </h2>
                  <div className="space-y-4">
                    {publication.projects.map((project) => (
                      <Card key={project._id} hover>
                        <h3 className="font-semibold text-gray-900 mb-2">
                          <Link
                            to={`/projects/${project._id}`}
                            className="hover:text-blue-600"
                          >
                            {project.title}
                          </Link>
                        </h3>
                        <p className="text-gray-600 mb-2">
                          {project.description}
                        </p>
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                          {project.category
                            .replace("-", " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                        </span>
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
                  Publication Details
                </h3>

                <div className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Type</dt>
                    <dd className="mt-1 text-gray-900 capitalize">
                      {publication.type}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Year</dt>
                    <dd className="mt-1 text-gray-900">{publication.year}</dd>
                  </div>

                  {publication.journal && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Journal
                      </dt>
                      <dd className="mt-1 text-gray-900">
                        {publication.journal}
                      </dd>
                    </div>
                  )}

                  {publication.volume && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Volume
                      </dt>
                      <dd className="mt-1 text-gray-900">
                        {publication.volume}
                      </dd>
                    </div>
                  )}

                  {publication.issue && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Issue
                      </dt>
                      <dd className="mt-1 text-gray-900">
                        {publication.issue}
                      </dd>
                    </div>
                  )}

                  {publication.pages && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Pages
                      </dt>
                      <dd className="mt-1 text-gray-900">
                        {publication.pages}
                      </dd>
                    </div>
                  )}

                  {publication.doi && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">DOI</dt>
                      <dd className="mt-1">
                        <a
                          href={`https://doi.org/${publication.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 break-all"
                        >
                          {publication.doi}
                        </a>
                      </dd>
                    </div>
                  )}

                  {publication.url && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Full Text
                      </dt>
                      <dd className="mt-1">
                        <a
                          href={publication.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          View Publication →
                        </a>
                      </dd>
                    </div>
                  )}

                  {publication.tags && publication.tags.length > 0 && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500 mb-2">
                        Tags
                      </dt>
                      <dd className="flex flex-wrap gap-2">
                        {publication.tags.map((tag, index) => (
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

export default PublicationDetail;
