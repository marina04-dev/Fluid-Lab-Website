// client/src/pages/Home.jsx - ΔΙΟΡΘΩΜΕΝΟ με consistent purple theme
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useContent } from "../contexts/ContentContext";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Card from "../components/common/Card";

const Home = () => {
  // Hooks
  const { t } = useTranslation();
  const {
    getContent,
    fetchContent,
    projects,
    fetchProjects,
    publications,
    fetchPublications,
    loading,
    error,
    clearError,
  } = useContent();

  // fetch all necessary data on component mount
  useEffect(() => {
    const loadData = async () => {
      await fetchContent();
      // Fetch featured projects and recent publications
      await fetchProjects({ isFeatured: true, limit: 3 });
      await fetchPublications({ limit: 3, sortBy: "year-desc" });
    };

    loadData();
  }, [fetchContent, fetchProjects, fetchPublications]);

  // Clear any existing errors on component mount
  useEffect(() => {
    clearError();
  }, [clearError]);

  // function to truncate text for card display
  const truncateText = (text, maxLength = 120) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  // function to format authors for display
  const formatAuthors = (authors) => {
    if (!authors) return "";
    if (Array.isArray(authors)) {
      return (
        authors.slice(0, 3).join(", ") + (authors.length > 3 ? " et al." : "")
      );
    }
    return authors;
  };

  // get featured projects (max 3)
  const featuredProjects =
    projects?.filter((p) => p.isFeatured && p.isActive !== false).slice(0, 3) ||
    [];

  // get recent publications (max 3)
  const recentPublications = publications?.slice(0, 3) || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section με purple gradient */}
      <section className="hero-section relative flex items-center justify-center text-center">
        <div className="container-custom relative z-10">
          <h1 className="text-hero font-bold text-white mb-8 animate-fade-in-up">
            {getContent("hero-title", "Advanced Research in Fluid Dynamics")}
          </h1>
          <p className="text-subtitle text-white/90 mb-12 max-w-4xl mx-auto animate-fade-in-up animation-delay-200">
            {getContent(
              "hero-subtitle",
              "Pioneering innovative solutions through cutting-edge computational and experimental fluid mechanics research"
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
            {/* Primary CTA - χρησιμοποιεί τα νέα button styles */}
            <Link to="/projects" className="btn btn-primary btn-lg">
              {getContent("hero-cta-primary", "Explore Our Research")}
            </Link>
            {/* Secondary CTA - τώρα θα δουλέψει το btn-outline! */}
            <Link to="/contact" className="btn btn-outline btn-lg">
              {getContent("hero-cta-secondary", "Get In Touch")}
            </Link>
          </div>
        </div>

        {/* Background Animation/Decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-10 rounded-full"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white opacity-5 rounded-full"></div>
        </div>
      </section>

      {/* Error Display */}
      {error && (
        <section className="section-padding">
          <div className="container-custom">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
              <div className="flex items-center">
                <div className="text-red-800">
                  <strong>Error:</strong> {error}
                </div>
                <button
                  onClick={clearError}
                  className="ml-auto text-red-600 hover:text-red-800 transition-colors duration-200"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-left">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {getContent("home-about-title", "About Our Laboratory")}
              </h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-6">
                  {getContent(
                    "home-about-description1",
                    "We are a leading research laboratory specializing in computational fluid dynamics, experimental fluid mechanics, and advanced simulation techniques."
                  )}
                </p>
                <p className="mb-6">
                  {getContent(
                    "home-about-description2",
                    "Our interdisciplinary team combines theoretical knowledge with practical applications to solve complex engineering challenges in various industries."
                  )}
                </p>
              </div>
              {/* Χρησιμοποιεί το νέο purple button theme */}
              <Link to="/about" className="btn btn-primary">
                {getContent("home-about-cta", "Learn More About Us")}
              </Link>
            </div>
            <div className="animate-fade-in-right">
              {/* Διορθωμένο gradient με καλύτερη purple consistency */}
              <div className="aspect-video gradient-bg rounded-lg flex items-center justify-center text-white text-xl font-semibold shadow-lg">
                {getContent(
                  "home-about-image-placeholder",
                  "Laboratory Overview"
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {getContent(
                "home-featured-projects-title",
                "Featured Research Projects"
              )}
            </h2>
            <p className="text-subtitle text-gray-600 max-w-3xl mx-auto">
              {getContent(
                "home-featured-projects-subtitle",
                "Discover our latest research initiatives and breakthrough discoveries"
              )}
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner
                size="lg"
                text="Loading projects..."
                color="purple"
              />
            </div>
          ) : featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredProjects.map((project, index) => (
                <Card
                  key={project._id}
                  hover
                  className={`animate-fade-in-up animation-delay-${
                    200 * (index + 1)
                  }`}
                >
                  {/* Project Image */}
                  {project.images && project.images.length > 0 ? (
                    <div className="aspect-video mb-6 rounded-lg overflow-hidden">
                      <img
                        src={project.images[0].url}
                        alt={project.images[0].alt || project.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video mb-6 gradient-bg rounded-lg flex items-center justify-center text-white font-semibold">
                      {project.title}
                    </div>
                  )}

                  {/* Project Content */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {project.title}
                    </h3>

                    {project.description && (
                      <p className="text-gray-600 mb-4">
                        {truncateText(project.description, 120)}
                      </p>
                    )}

                    {/* Project Status με purple badge */}
                    {project.status && (
                      <div className="mb-4">
                        <span className="badge badge-purple text-xs">
                          {project.status
                            .replace(/-/g, " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                        </span>
                      </div>
                    )}

                    {/* CTA Link */}
                    <Link
                      to={`/projects/${project._id}`}
                      className="btn btn-outline text-sm"
                    >
                      Learn More
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-6">
                {getContent(
                  "home-no-projects",
                  "Featured projects will be displayed here once available."
                )}
              </p>
            </div>
          )}

          <div className="text-center">
            <Link to="/projects" className="btn btn-primary">
              {getContent("home-view-all-projects", "View All Projects")}
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Publications Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {getContent(
                "home-recent-publications-title",
                "Recent Publications"
              )}
            </h2>
            <p className="text-subtitle text-gray-600 max-w-3xl mx-auto">
              {getContent(
                "home-recent-publications-subtitle",
                "Stay updated with our latest research findings and scientific contributions"
              )}
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner
                size="lg"
                text="Loading publications..."
                color="purple"
              />
            </div>
          ) : recentPublications.length > 0 ? (
            <div className="space-y-6 mb-12">
              {recentPublications.map((publication, index) => (
                <Card
                  key={publication._id}
                  hover
                  className={`animate-fade-in-up animation-delay-${
                    200 * (index + 1)
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        <Link
                          to={`/publications/${publication._id}`}
                          className="hover:text-purple-600 transition-colors duration-200"
                        >
                          {publication.title}
                        </Link>
                      </h3>

                      {/* Authors */}
                      {publication.authors &&
                        publication.authors.length > 0 && (
                          <p className="text-gray-600 mb-2">
                            {publication.authors.join(", ")}
                          </p>
                        )}

                      {/* Journal/Conference Info */}
                      {(publication.journal || publication.conference) && (
                        <div className="text-sm text-gray-500 mb-2">
                          <span className="font-medium">
                            {publication.journal || publication.conference}
                          </span>
                          {publication.volume && `, Vol. ${publication.volume}`}
                          {publication.volume && publication.issue && ", "}
                          {publication.issue && `Issue ${publication.issue}`}
                        </div>
                      )}

                      {/* Abstract */}
                      {publication.abstract && (
                        <p className="text-gray-600">
                          {truncateText(publication.abstract, 150)}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 lg:w-32">
                      {/* Publication Type Badge */}
                      {publication.publicationType && (
                        <span className="badge badge-purple text-xs">
                          {publication.publicationType
                            .replace(/-/g, " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                        </span>
                      )}
                      {/* Year Badge */}
                      {publication.year && (
                        <span className="badge badge-gray text-xs">
                          {publication.year}
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-6">
                {getContent(
                  "home-no-publications",
                  "Recent publications will be displayed here once available."
                )}
              </p>
            </div>
          )}

          <div className="text-center">
            <Link to="/publications" className="btn btn-primary">
              {getContent(
                "home-view-all-publications",
                "View All Publications"
              )}
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA Section - ΔΙΟΡΘΩΜΕΝΟ με purple theme */}
      <section className="section-padding gradient-bg">
        <div className="container-custom">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-6">
              {getContent("home-cta-title", "Ready to Collaborate?")}
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              {getContent(
                "home-cta-description",
                "Contact us to discuss research opportunities, partnerships, or consulting services"
              )}
            </p>
            {/* ΔΙΟΡΘΩΣΗ: Χρησιμοποιεί consistent purple styling */}
            <Link
              to="/contact"
              className="btn btn-secondary btn-lg text-purple-700 bg-white hover:bg-gray-100"
            >
              {getContent("home-cta-button", "Get In Touch")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
