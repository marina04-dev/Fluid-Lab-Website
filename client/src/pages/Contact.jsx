import React, { useState, useEffect } from "react";
import { useContent } from "../contexts/ContentContext";
import api from "../services/api";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Card from "../components/common/Card";
import LoadingSpinner from "../components/common/LoadingSpinner";
import toast from "react-hot-toast";

const Contact = () => {
  // get necessary variables/functions from contexts for dynamic content
  const { getContent, fetchContent, loading, error, clearError } = useContent();

  // state variables to handle form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  // state variables to handle form submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load content on component mount
  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  // Clear any existing errors on component mount
  useEffect(() => {
    clearError();
  }, [clearError]);

  // function to handle inputs changes
  const handleChange = (e) => {
    // get the name and the value from the event
    const { name, value } = e.target;
    // provide the data in the setter function
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // function to handle form submission with real API call
  const handleSubmit = async (e) => {
    // prevent default browser's behaviour from reloading the page
    e.preventDefault();

    // Basic form validation
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    if (!formData.subject.trim()) {
      toast.error("Please enter a subject");
      return;
    }

    if (!formData.message.trim()) {
      toast.error("Please enter your message");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      // Make API call to send contact message
      const response = await api.post("/contact", formData);

      toast.success(
        response.data.message ||
          "Message sent successfully! We will get back to you soon."
      );

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0]?.msg ||
        "Failed to send message. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // contact info using dynamic content with fallbacks
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
        "University Campus\nAthens, Greece"
      ),
      multiline: true,
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
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: getContent("contact-email-title", "Email"),
      content: getContent("contact-email", "info@fluidlab.com"),
      link: `mailto:${getContent("contact-email", "info@fluidlab.com")}`,
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
      {/* Header Section */}
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
                  className="ml-auto text-red-600 hover:text-red-800"
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
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {info.title}
                      </h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
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

              {/* Map Placeholder */}
              <div className="mt-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  {getContent("contact-location-title", "Our Location")}
                </h3>
                <Card>
                  <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xl font-semibold">
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
                      label="Full Name *"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                    />
                    <Input
                      label="Email Address *"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <Input
                    label="Subject *"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Brief description of your inquiry"
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 resize-vertical"
                      placeholder="Please provide details about your inquiry, research interests, or collaboration ideas..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center space-x-2"
                    size="lg"
                  >
                    {isSubmitting && <LoadingSpinner size="sm" />}
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

      {/* Additional Information */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <Card className="p-8 text-center bg-gradient-to-r from-blue-50 to-purple-50">
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
              <Button className="bg-blue-600 hover:bg-blue-700">
                {getContent(
                  "contact-partnerships-button",
                  "Research Partnerships"
                )}
              </Button>
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
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
