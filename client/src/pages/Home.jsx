import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useContent } from "../contexts/ContentContext";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Card from "../components/common/Card";
import Button from "../components/common/Button";

const Home = () => {
  // get necessary variables/functions from contexts
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
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center gradient-bg overflow-hidden">
        <div className="container-custom text-center text-white relative z-10">
          <h1 className="text-6xl font-bold mb-6">
            {getContent("hero-title", "Advanced Fluid Mechanics Research")}
          </h1>
          <p className="text-2xl mb-8 opacity-90">
            {getContent(
              "hero-subtitle",
              "Leading the Future of Fluid Dynamics"
            )}
          </p>
          <p className="text-xl mb-12 max-w-4xl mx-auto opacity-80">
            {getContent(
              "hero-description",
              "Our research team offers efficient research and consulting services in many aspects of Fluid Flow, Hydraulics and Convective Heat Transfer."
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/projects" className="btn btn-primary btn-lg">
              {getContent("hero-cta-primary", "Explore Our Research")}
            </Link>
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
                  className="ml-auto text-red-600 hover:text-red-800"
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
            <div>
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
              <Link to="/about" className="btn btn-primary">
                {getContent("home-about-cta", "Learn More About Us")}
              </Link>
            </div>
            <div>
              <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xl font-semibold shadow-lg">
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
              <LoadingSpinner size="lg" text="Loading projects..." />
            </div>
          ) : featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredProjects.map((project) => (
                <Card key={project._id} hover>
                  {/* Project Image */}
                  {project.images && project.images.length > 0 ? (
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
                            '<span class="text-white font-semibold">Project Image</span>';
                        }}
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-6 flex items-center justify-center">
                      <span className="text-white font-semibold">
                        Project Image
                      </span>
                    </div>
                  )}

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    <Link
                      to={`/projects/${project._id}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {project.title}
                    </Link>
                  </h3>

                  <p className="text-gray-600 mb-4">
                    {truncateText(
                      project.shortDescription || project.description
                    )}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.status && (
                      <span className="badge badge-blue">
                        {project.status.charAt(0).toUpperCase() +
                          project.status.slice(1)}
                      </span>
                    )}
                    {project.category && (
                      <span className="badge badge-purple">
                        {project.category
                          .replace(/-/g, " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </span>
                    )}
                    {project.tags && project.tags.length > 0 && (
                      <span className="badge badge-green">
                        {project.tags[0]}
                      </span>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-6">
                {getContent(
                  "home-no-featured-projects",
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

      {/* Research Areas Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {getContent("home-research-areas-title", "Research Areas")}
            </h2>
            <p className="text-subtitle text-gray-600 max-w-3xl mx-auto">
              {getContent(
                "home-research-areas-subtitle",
                "Our expertise spans multiple domains of fluid mechanics and related fields"
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card hover>
              <div className="text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {getContent("home-area1-title", "Magnetohydrodynamics")}
                </h3>
                <p className="text-gray-600">
                  {getContent(
                    "home-area1-description",
                    "Advanced study of electrically conducting fluids in magnetic fields"
                  )}
                </p>
              </div>
            </Card>

            <Card hover>
              <div className="text-center">
                <div className="text-4xl mb-4">🔧</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {getContent("home-area2-title", "Turbomachinery")}
                </h3>
                <p className="text-gray-600">
                  {getContent(
                    "home-area2-description",
                    "Optimization of rotating machinery and fluid energy conversion systems"
                  )}
                </p>
              </div>
            </Card>

            <Card hover>
              <div className="text-center">
                <div className="text-4xl mb-4">🌡️</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {getContent("home-area3-title", "Heat Transfer")}
                </h3>
                <p className="text-gray-600">
                  {getContent(
                    "home-area3-description",
                    "Thermal analysis and heat exchange in complex flow systems"
                  )}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Publications Section */}
      <section className="section-padding bg-gray-50">
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
                "Latest research findings and academic contributions"
              )}
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" text="Loading publications..." />
            </div>
          ) : recentPublications.length > 0 ? (
            <div className="space-y-6 mb-12">
              {recentPublications.map((publication) => (
                <Card key={publication._id} hover>
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        <Link
                          to={`/publications/${publication._id}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {publication.title}
                        </Link>
                      </h3>

                      <p className="text-gray-700 font-medium mb-2">
                        {formatAuthors(publication.authors)}
                      </p>

                      <div className="text-sm text-gray-600 mb-3">
                        {publication.journal && (
                          <span>
                            <strong>{publication.journal}</strong>
                            {publication.year && ` • ${publication.year}`}
                            {publication.volume &&
                              ` • Vol. ${publication.volume}`}
                          </span>
                        )}
                      </div>

                      {publication.abstract && (
                        <p className="text-gray-600">
                          {truncateText(publication.abstract, 150)}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 lg:w-32">
                      {publication.publicationType && (
                        <span className="badge badge-blue text-xs">
                          {publication.publicationType
                            .replace(/-/g, " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                        </span>
                      )}
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

      {/* Contact CTA Section */}
      <section className="section-padding bg-blue-600">
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
            <Link
              to="/contact"
              className="btn btn-primary btn-lg bg-white text-blue-600 hover:bg-gray-100"
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
