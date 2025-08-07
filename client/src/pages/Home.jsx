// client/src/pages/Home.jsx - FIXED με react-i18next
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useContent } from "../contexts/ContentContext";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import LoadingSpinner from "../components/common/LoadingSpinner";

const Home = () => {
  // useTranslation use
  const { t } = useTranslation();
  // get necessary variables/functions from the context
  const { fetchContent, loading, error } = useContent();

  // Φόρτωση περιεχομένου κατά την εκκίνηση
  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  // hard coded services with translation
  const services = [
    {
      title: t("services.research.title"),
      description: t("services.research.description"),
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
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
    },
    {
      title: t("services.simulation.title"),
      description: t("services.simulation.description"),
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
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
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

  // if services or home components is slow display loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" text={t("common.loading")} />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section - Full Screen με Navbar μέσα στο gradient background */}
      <section className="hero-section relative flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="container-custom relative z-10 pt-20">
          <div className="text-center text-white">
            <h1 className="text-hero md:text-7xl font-bold mb-8 animate-fade-in-up">
              {t("hero.title")}
            </h1>
            <p className="text-subtitle md:text-2xl mb-10 opacity-90 animate-fade-in-up animation-delay-200">
              {t("hero.subtitle")}
            </p>
            <p className="text-body-lg mb-14 max-w-4xl mx-auto opacity-80 animate-fade-in-up animation-delay-400">
              {t("hero.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up animation-delay-600">
              <Link to="/projects">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-lg px-8 py-4 btn-hover"
                >
                  {t("hero.exploreProjects")}
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-lg px-8 py-4 bg-white text-blue-600 border-2 border-white hover:bg-transparent hover:text-white font-semibold transition-all duration-200 btn-hover"
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
              <Card key={index} className="text-center card-hover">
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

      {/* About Section Preview */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-left">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {t("about.title")}
              </h2>
              <p className="text-body-lg text-gray-600 mb-8 leading-relaxed">
                {t("about.description")}
              </p>
              <Link to="/about">
                <Button className="btn-hover">{t("common.learnMore")}</Button>
              </Link>
            </div>
            <div className="animate-fade-in-right">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-semibold mb-4">
                  {t("home.stats.title")}
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-3xl font-bold mb-2">15+</div>
                    <div className="text-sm opacity-90">
                      {t("home.stats.years")}
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-2">50+</div>
                    <div className="text-sm opacity-90">
                      {t("home.stats.projects")}
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-2">100+</div>
                    <div className="text-sm opacity-90">
                      {t("home.stats.publications")}
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-2">20+</div>
                    <div className="text-sm opacity-90">
                      {t("home.stats.collaborations")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {t("home.featuredProjects.title")}
            </h2>
            <p className="text-subtitle text-gray-600 max-w-3xl mx-auto">
              {t("home.featuredProjects.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Project Cards με real data από translations */}
            <Card className="card-hover">
              <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-6"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t("home.sampleProject.title1")}
              </h3>
              <p className="text-gray-600 mb-4">
                {t("home.sampleProject.description1")}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="badge badge-blue">CFD</span>
                <span className="badge badge-purple">Turbulence</span>
                <span className="badge badge-green">Research</span>
              </div>
            </Card>

            <Card className="card-hover">
              <div className="aspect-video bg-gradient-to-br from-green-500 to-blue-600 rounded-lg mb-6"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t("home.sampleProject.title2")}
              </h3>
              <p className="text-gray-600 mb-4">
                {t("home.sampleProject.description2")}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="badge badge-green">Heat Transfer</span>
                <span className="badge badge-orange">Industry</span>
                <span className="badge badge-blue">Simulation</span>
              </div>
            </Card>

            <Card className="card-hover">
              <div className="aspect-video bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg mb-6"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t("home.sampleProject.title3")}
              </h3>
              <p className="text-gray-600 mb-4">
                {t("home.sampleProject.description3")}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="badge badge-purple">Bioengineering</span>
                <span className="badge badge-red">Medical</span>
                <span className="badge badge-yellow">Innovation</span>
              </div>
            </Card>
          </div>

          <div className="text-center">
            <Link to="/projects">
              <Button size="lg" className="btn-hover">
                {t("home.viewAllProjects")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="section-padding gradient-bg text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">{t("home.cta.title")}</h2>
          <p className="text-body-lg mb-10 max-w-3xl mx-auto opacity-90">
            {t("home.cta.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 btn-hover"
              >
                {t("home.cta.contact")}
              </Button>
            </Link>
            <Link to="/team">
              <Button
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 btn-hover"
              >
                {t("home.cta.meetTeam")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Admin Login Link - Only visible when scrolled to bottom */}
      <div className="relative">
        <Link
          to="/admin/login"
          className="admin-login-link fixed bottom-4 right-4 z-40"
          title="Admin Login"
        >
          Admin
        </Link>
      </div>
    </div>
  );
};

export default Home;
