// client/src/pages/Contact.jsx - ΔΙΟΡΘΩΜΕΝΟ με consistent purple theme
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useContent } from "../contexts/ContentContext";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Input from "../components/common/Input";

const Contact = () => {
  // States
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [error, setError] = useState(null);

  // Hooks
  const { t } = useTranslation();
  const { getContent } = useContent();

  // Clear error function
  const clearError = () => setError(null);

  // Form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setSubmitMessage(
          getContent(
            "contact-success-message",
            "Thank you for your message! We'll get back to you soon."
          )
        );
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (err) {
      console.error("Contact form error:", err);
      setError(
        getContent(
          "contact-error-message",
          "There was an error sending your message. Please try again."
        )
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Contact information με purple theme
  const contactInfo = [
    {
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: getContent("contact-email-title", "Email"),
      content: getContent("contact-email", "contact@fluidlab.university.edu"),
      link: `mailto:${getContent(
        "contact-email",
        "contact@fluidlab.university.edu"
      )}`,
    },
    {
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      title: getContent("contact-address-title", "Address"),
      content: getContent(
        "contact-address",
        "Fluid Dynamics Laboratory\nEngineering Department\nUniversity Campus\nAthens, Greece"
      ),
      multiline: true,
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2l8 4-8 4-8-4 8-4zm0 8.5l-6-3v4c0 2.5 2.5 4.5 6 4.5s6-2 6-4.5v-4l-6 3z" />
        </svg>
      ),
      title: getContent("contact-department-title", "Department"),
      content: getContent("contact-department", "Engineering Sciences"),
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2l8 4-8 4-8-4 8-4zm0 8.5l-6-3v4c0 2.5 2.5 4.5 6 4.5s6-2 6-4.5v-4l-6 3z" />
        </svg>
      ),
      title: getContent("contact-university-title", "University"),
      content: getContent("contact-university", "Technical University"),
    },
    {
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      title: getContent("contact-phone-title", "Phone"),
      content: getContent("contact-phone", "+30 210 123 4567"),
      link: `tel:${getContent("contact-phone", "+30 210 123 4567")}`,
    },
    {
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: getContent("contact-hours-title", "Office Hours"),
      content: getContent("contact-hours", "Mon - Fri: 9:00 AM - 5:00 PM"),
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header Section με purple gradient */}
      <section className="pt-24 pb-16 gradient-bg">
        <div className="container-custom">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-6">
              {getContent("contact-title", "Contact Us")}
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              {getContent(
                "contact-subtitle",
                "Get in touch with our research team for collaborations, consultations, or general inquiries"
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
                  className="ml-auto text-red-600 hover:text-red-800 transition-colors duration-200"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Success Message Display */}
      {submitMessage && (
        <section className="section-padding">
          <div className="container-custom">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
              <div className="flex items-center">
                <div className="text-green-800">
                  <strong>Success:</strong> {submitMessage}
                </div>
                <button
                  onClick={() => setSubmitMessage("")}
                  className="ml-auto text-green-600 hover:text-green-800 transition-colors duration-200"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Content Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {getContent("contact-info-title", "Get in Touch")}
              </h2>
              <p className="text-gray-600 mb-12">
                {getContent(
                  "contact-info-description",
                  "We're here to help with your research needs, answer questions about our work, and explore potential collaborations."
                )}
              </p>

              <div className="space-y-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    {/* ΔΙΟΡΘΩΣΗ: Purple theme για contact info icons */}
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {info.title}
                      </h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-purple-600 hover:text-purple-800 transition-colors duration-200"
                        >
                          {info.content}
                        </a>
                      ) : info.multiline ? (
                        <div className="text-gray-600">
                          {info.content.split("\n").map((line, i) => (
                            <div key={i}>{line}</div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-600">{info.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Placeholder με διορθωμένο gradient */}
              <div className="mt-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  {getContent("contact-location-title", "Our Location")}
                </h3>
                <Card>
                  <div className="aspect-video gradient-bg rounded-lg flex items-center justify-center text-white text-xl font-semibold">
                    {getContent("contact-map-placeholder", "Interactive Map")}
                  </div>
                  <div className="mt-4 text-center text-sm text-gray-600">
                    <p>
                      {getContent(
                        "contact-map-description",
                        "Campus map and directions will be displayed here"
                      )}
                    </p>
                  </div>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                  {getContent("contact-form-title", "Send us a Message")}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Full Name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                    />
                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <Input
                    label="Subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What's this about?"
                  />

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Message <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="input-field resize-none"
                      placeholder="Tell us about your inquiry, research interests, or collaboration ideas..."
                    />
                  </div>

                  {/* Submit Button με purple theme */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    className="w-full"
                  >
                    <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                  </Button>
                </form>
              </Card>

              {/* Quick Response Info */}
              <div className="mt-8 text-center">
                <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
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
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  {getContent("contact-response-time", "Quick Response")}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {getContent(
                    "contact-response-description",
                    "We typically respond to inquiries within 24-48 hours during business days"
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Information Section με purple theme */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <Card className="p-8 text-center bg-gradient-to-r from-purple-50 to-blue-50">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              {getContent(
                "contact-collaboration-title",
                "Research Collaboration"
              )}
            </h3>
            <p className="text-gray-600 max-w-3xl mx-auto mb-8">
              {getContent(
                "contact-collaboration-description",
                "We welcome collaboration opportunities with academic institutions, research organizations, and industry partners. Whether you're interested in joint research projects, consulting services, or academic partnerships, we'd love to hear from you."
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* ΔΙΟΡΘΩΣΗ: Purple buttons αντί για blue */}
              <Button variant="primary" size="lg">
                {getContent(
                  "contact-partnerships-button",
                  "Research Partnerships"
                )}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
              >
                {getContent("contact-consulting-button", "Consulting Services")}
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Contact;
