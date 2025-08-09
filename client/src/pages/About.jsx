import React, { useEffect } from "react";
import { useContent } from "../contexts/ContentContext";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Card from "../components/common/Card";

const About = () => {
  // get necessary variables/functions from contexts
  const { getContent, fetchContent, loading, error, clearError } = useContent();

  // execute fetchContent for the about page each time the page gets loaded
  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  // Clear any existing errors on component mount
  useEffect(() => {
    clearError();
  }, [clearError]);

  // if about page is slow display loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    );
  }

  // research areas with content from database or fallback to default
  const researchAreas = [
    {
      title: getContent("research-area-mhd-title", "Magnetohydrodynamics"),
      description: getContent(
        "research-area-mhd-description",
        "Study of the magnetic properties and behavior of electrically conducting fluids."
      ),
      icon: "⚡",
    },
    {
      title: getContent("research-area-turbomachinery-title", "Turbomachinery"),
      description: getContent(
        "research-area-turbomachinery-description",
        "Analysis and optimization of machines that transfer energy with moving fluid."
      ),
      icon: "🔧",
    },
    {
      title: getContent("research-area-bioengineering-title", "Bioengineering"),
      description: getContent(
        "research-area-bioengineering-description",
        "Application of fluid mechanics principles to biological systems and medical devices."
      ),
      icon: "🧬",
    },
    {
      title: getContent("research-area-thermal-title", "Thermal Analysis"),
      description: getContent(
        "research-area-thermal-description",
        "Investigation of heat transfer phenomena in various fluid flow conditions."
      ),
      icon: "🌡️",
    },
    {
      title: getContent("research-area-turbulence-title", "Turbulence"),
      description: getContent(
        "research-area-turbulence-description",
        "Advanced modeling and simulation of turbulent flow patterns and structures."
      ),
      icon: "🌪️",
    },
    {
      title: getContent("research-area-multiphase-title", "Multiphase Flow"),
      description: getContent(
        "research-area-multiphase-description",
        "Study of flows involving multiple phases like gas-liquid or solid-fluid mixtures."
      ),
      icon: "💧",
    },
  ];

  // capabilities with content from database or fallback to default
  const capabilities = [
    {
      title: getContent("capability-simulation-title", "Advanced Simulation"),
      description: getContent(
        "capability-simulation-description",
        "State-of-the-art computational fluid dynamics software and high-performance computing resources."
      ),
    },
    {
      title: getContent(
        "capability-experimental-title",
        "Experimental Facilities"
      ),
      description: getContent(
        "capability-experimental-description",
        "Modern laboratory equipment for flow visualization, measurement, and validation studies."
      ),
    },
    {
      title: getContent(
        "capability-collaboration-title",
        "Research Collaboration"
      ),
      description: getContent(
        "capability-collaboration-description",
        "Active partnerships with leading universities and industry organizations worldwide."
      ),
    },
    {
      title: getContent("capability-consulting-title", "Technical Consulting"),
      description: getContent(
        "capability-consulting-description",
        "Expert guidance for complex fluid mechanics challenges in various industries."
      ),
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="pt-24 pb-16 gradient-bg">
        <div className="container-custom">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-6">
              {getContent("about-title", "About Our Lab")}
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              {getContent(
                "about-subtitle",
                "Pioneering research in fluid mechanics and computational fluid dynamics"
              )}
            </p>
          </div>
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

      {/* Mission Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {getContent("about-mission-title", "Our Mission")}
              </h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-6">
                  {getContent(
                    "about-mission-description",
                    "Our laboratory is dedicated to advancing the frontiers of fluid mechanics through cutting-edge research, innovative computational methods, and collaborative partnerships with industry and academia."
                  )}
                </p>
                <p className="mb-6">
                  {getContent(
                    "about-mission-details",
                    "We focus on developing novel solutions to complex fluid flow problems that have significant implications for engineering applications, environmental sustainability, and technological advancement."
                  )}
                </p>
                <p>
                  {getContent(
                    "about-mission-commitment",
                    "Our commitment to excellence in research and education ensures that we continue to train the next generation of fluid mechanics experts while pushing the boundaries of scientific knowledge."
                  )}
                </p>
              </div>
            </div>
            <div>
              <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xl font-semibold">
                {getContent(
                  "about-mission-image-placeholder",
                  "Laboratory Image"
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {getContent("about-research-areas-title", "Research Areas")}
            </h2>
            <p className="text-subtitle text-gray-600 max-w-3xl mx-auto">
              {getContent(
                "about-research-areas-subtitle",
                "Explore our diverse range of research specializations and expertise"
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {researchAreas.map((area, index) => (
              <Card key={index} hover>
                <div className="text-center">
                  <div className="text-4xl mb-4">{area.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {area.title}
                  </h3>
                  <p className="text-gray-600">{area.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities & Facilities */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {getContent("about-capabilities-title", "Our Capabilities")}
            </h2>
            <p className="text-subtitle text-gray-600 max-w-3xl mx-auto">
              {getContent(
                "about-capabilities-subtitle",
                "State-of-the-art facilities and expertise to tackle complex challenges"
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((capability, index) => (
              <Card key={index} hover>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {capability.title}
                </h3>
                <p className="text-gray-600">{capability.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {getContent("about-vision-title", "Our Vision")}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {getContent(
                "about-vision-description",
                "To be a world-leading research center in fluid mechanics, recognized for breakthrough discoveries, innovative solutions, and excellence in education."
              )}
            </p>

            {/* Vision Points */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {getContent("about-vision-point1-title", "Innovation")}
                </h3>
                <p className="text-gray-600">
                  {getContent(
                    "about-vision-point1-description",
                    "Developing groundbreaking research methodologies and computational techniques"
                  )}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {getContent("about-vision-point2-title", "Collaboration")}
                </h3>
                <p className="text-gray-600">
                  {getContent(
                    "about-vision-point2-description",
                    "Building strong partnerships with industry, academia, and research institutions"
                  )}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {getContent("about-vision-point3-title", "Impact")}
                </h3>
                <p className="text-gray-600">
                  {getContent(
                    "about-vision-point3-description",
                    "Creating solutions that address real-world challenges and benefit society"
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="section-padding bg-[#8b7bc7]">
        <div className="container-custom">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-6">
              {getContent("about-cta-title", "Ready to Collaborate?")}
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              {getContent(
                "about-cta-description",
                "Get in touch with our team to explore research opportunities and partnerships"
              )}
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-purple-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {getContent("about-cta-button", "Contact Us")}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
