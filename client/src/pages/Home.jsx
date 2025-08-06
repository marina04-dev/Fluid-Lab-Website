// client/src/pages/Home.jsx - με i18n support
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useContent } from "../contexts/ContentContext";
import { useLanguage } from "../contexts/LanguageContext";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Button from "../components/common/Button";
import Card from "../components/common/Card";

const Home = () => {
  const {
    getContent,
    fetchContent,
    fetchProjects,
    fetchPublications,
    projects,
    publications,
    loading,
  } = useContent();
  const { t } = useLanguage();

  useEffect(() => {
    fetchContent("hero");
    fetchContent("about");
    fetchProjects({ featured: true });
    fetchPublications();
  }, [fetchContent, fetchProjects, fetchPublications]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text={t("common.loading")} />
      </div>
    );
  }

  const featuredProjects = projects
    .filter((project) => project.isFeatured)
    .slice(0, 3);
  const recentPublications = publications.slice(0, 3);

  const services = [
    {
      title: t("services.cfd.title"),
      description: t("services.cfd.description"),
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: t("services.experimental.title"),
      description: t("services.experimental.description"),
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      ),
    },
    {
      title: t("services.consulting.title"),
      description: t("services.consulting.description"),
      icon: (
        <svg
          className="w-8 h-8"
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
      ),
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center gradient-bg overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center text-white">
            <h1 className="text-hero md:text-7xl font-bold mb-8 animate-fade-in-up">
              {getContent("hero-title", t("hero.title"))}
            </h1>
            <p className="text-subtitle md:text-2xl mb-10 opacity-90 animate-fade-in-up animation-delay-200">
              {getContent("hero-subtitle", t("hero.subtitle"))}
            </p>
            <p className="text-body-lg mb-14 max-w-4xl mx-auto opacity-80 animate-fade-in-up animation-delay-400">
              {getContent("hero-description", t("hero.description"))}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up animation-delay-600">
              <Link to="/projects">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-lg px-8 py-4"
                >
                  {t("hero.exploreProjects")}
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-lg px-8 py-4 bg-white text-blue-600 border-2 border-white hover:bg-transparent hover:text-white font-semibold transition-all duration-200"
                >
                  {t("hero.getInTouch")}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {t("services.title")}
            </h2>
            <p className="text-subtitle text-gray-600 max-w-4xl mx-auto">
              {t("services.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <Card key={index} hover className="text-center">
                <div className="text-blue-600 mb-6 flex justify-center">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {t("projects.title")}
              </h2>
              <p className="text-subtitle text-gray-600 max-w-4xl mx-auto">
                {t("projects.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <Card key={project._id} hover>
                  <div className="flex flex-col h-full">
                    {project.images && project.images.length > 0 && (
                      <div className="mb-6">
                        <img
                          src={project.images[0]}
                          alt={project.title}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                    )}

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {project.title}
                    </h3>

                    <p className="text-gray-600 mb-4 flex-grow leading-relaxed">
                      {project.shortDescription ||
                        project.description?.substring(0, 150) + "..."}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span className="capitalize">
                        {project.category?.replace("-", " ")}
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          project.status === "active"
                            ? "bg-green-100 text-green-700"
                            : project.status === "completed"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {t(`projects.status.${project.status}`)}
                      </span>
                    </div>

                    <Link
                      to={`/projects/${project._id}`}
                      className="text-blue-600 hover:text-blue-700 font-medium mt-auto text-lg"
                    >
                      {t("projects.viewDetails")} →
                    </Link>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/projects">
                <Button size="lg" variant="outline" className="text-lg">
                  {t("projects.viewAll")}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Recent Publications Section */}
      {recentPublications.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {t("publications.title")}
              </h2>
              <p className="text-subtitle text-gray-600 max-w-4xl mx-auto">
                {t("publications.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPublications.map((publication) => (
                <Card key={publication._id} hover>
                  <div className="flex flex-col h-full">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {publication.title}
                    </h3>

                    <p className="text-gray-600 mb-4 text-sm">
                      {publication.authors?.join(", ")}
                    </p>

                    <div className="text-sm text-gray-500 mb-4">
                      <p>{publication.journal}</p>
                      <p>{publication.year}</p>
                    </div>

                    <Link
                      to={`/publications/${publication._id}`}
                      className="text-blue-600 hover:text-blue-700 font-medium mt-auto text-lg"
                    >
                      {t("publications.readMore")} →
                    </Link>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/publications">
                <Button size="lg" variant="outline" className="text-lg">
                  {t("publications.viewAll")}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">{t("cta.title")}</h2>
          <p className="text-subtitle mb-10 max-w-3xl mx-auto">
            {t("cta.subtitle")}
          </p>
          <Link to="/contact">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4"
            >
              {t("cta.contact")}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
