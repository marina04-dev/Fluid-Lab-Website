import React, { useEffect } from "react";
import { useContent } from "../contexts/ContentContext";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Card from "../components/common/Card";

const About = () => {
  // get necessary variables/functions from contexts
  const { getContent, fetchContent, loading } = useContent();

  // execute fetchContent for the about page each time the page gets loaded
  useEffect(() => {
    fetchContent("about");
  }, [fetchContent]);

  // if about page is slow display loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    );
  }

  // hard coded research areas
  const researchAreas = [
    {
      title: "Magnetohydrodynamics",
      description:
        "Study of the magnetic properties and behavior of electrically conducting fluids.",
      icon: "⚡",
    },
    {
      title: "Turbomachinery",
      description:
        "Analysis and optimization of machines that transfer energy with moving fluid.",
      icon: "🔧",
    },
    {
      title: "Bioengineering",
      description:
        "Application of fluid mechanics principles to biological systems and medical devices.",
      icon: "🧬",
    },
    {
      title: "Thermal Analysis",
      description:
        "Investigation of heat transfer phenomena in various fluid flow conditions.",
      icon: "🌡️",
    },
    {
      title: "Turbulence",
      description:
        "Advanced modeling and simulation of turbulent flow patterns and structures.",
      icon: "🌪️",
    },
    {
      title: "Multiphase Flow",
      description:
        "Study of flows involving multiple phases like gas-liquid or solid-fluid mixtures.",
      icon: "💧",
    },
  ];

  const capabilities = [
    {
      title: "Advanced Simulation",
      description:
        "State-of-the-art computational fluid dynamics software and high-performance computing resources.",
    },
    {
      title: "Experimental Facilities",
      description:
        "Modern laboratory equipment for flow visualization, measurement, and validation studies.",
    },
    {
      title: "Research Collaboration",
      description:
        "Active partnerships with leading universities and industry organizations worldwide.",
    },
    {
      title: "Technical Consulting",
      description:
        "Expert guidance for complex fluid mechanics challenges in various industries.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="pt-24 pb-16 gradient-bg">
        <div className="container-custom">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-6">
              {getContent("about-page-title", "About Our Research")}
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              {getContent(
                "about-page-subtitle",
                "Advancing fluid mechanics through innovative research and cutting-edge technology"
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <div className="prose prose-lg text-gray-600">
                <p>
                  {getContent(
                    "mission-statement",
                    "Flow Analysis and Simulation Team offers efficient research and consulting services in many aspects of Fluid Flow, Hydraulics and Convective Heat Transfer, that include Magnetohydrodynamics, Turbomachinery, Bioengineering, Thermal Analysis, Turbulence, Multiphase Flow, Industrial and Environmental Applications and Fluid-Structure Interaction."
                  )}
                </p>
                <p>
                  The aforementioned credentials, in conjunction with a sense of
                  cooperation and solidarity which characterizes and motivates
                  all of our team members, along with being results-oriented and
                  having a passion for detail, guarantee that the final output
                  of our work will be nothing short of exquisite.
                </p>
                <p>
                  We will be more than happy to give you a full and detailed
                  presentation of what we have to offer, discuss your case –
                  regardless its size or how demanding it might be – address the
                  key points to resolve it and finally suggest a suitable
                  solution through our experience and expertise.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/api/placeholder/600/400"
                alt="Research Team"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Research Areas Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Research Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our expertise spans multiple disciplines in fluid mechanics and
              related fields
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

      {/* Capabilities Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Capabilities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              State-of-the-art facilities and expertise to tackle complex fluid
              mechanics challenges
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((capability, index) => (
              <Card key={index} hover>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {capability.title}
                </h3>
                <p className="text-gray-600">{capability.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
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
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Excellence
              </h3>
              <p className="text-gray-600">
                We strive for the highest quality in all our research endeavors
                and deliverables.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
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
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Collaboration
              </h3>
              <p className="text-gray-600">
                We believe in the power of teamwork and partnerships to achieve
                breakthrough results.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Innovation
              </h3>
              <p className="text-gray-600">
                We continuously push the boundaries of fluid mechanics research
                and technology.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
