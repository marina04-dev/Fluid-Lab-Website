// client/src/pages/Contact.jsx - FIXED με react-i18next και μικρότερα headings
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Card from "../components/common/Card";
import BackButton from "../components/common/BackButton";
import LoadingSpinner from "../components/common/LoadingSpinner";
import toast from "react-hot-toast";

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Implement API call to send contact message
      // await api.post('/contact', formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success(t("contact.form.success"));
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error(t("contact.form.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

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
      title: t("contact.info.address"),
      content: t("contact.details.address"),
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
      title: t("contact.info.email"),
      content: t("contact.details.email"),
      link: `mailto:${t("contact.details.email")}`,
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
      title: t("contact.info.phone"),
      content: t("contact.details.phone"),
      link: `tel:${t("contact.details.phone")}`,
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
      title: t("contact.info.hours"),
      content: t("contact.details.hours"),
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
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      title: t("contact.info.response"),
      content: t("contact.details.response"),
    },
  ];

  return (
    <div className="page-container bg-gray-50">
      <div className="container-custom section-padding">
        {/* Back Button */}
        <div className="mb-8">
          <BackButton />
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {t("contact.title")}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                {t("contact.title")}
              </h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                          {info.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-gray-900 mb-2">
                          {info.title}
                        </h3>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-blue-600 hover:text-blue-700 transition-colors duration-200 text-sm"
                          >
                            {info.content}
                          </a>
                        ) : (
                          <p
                            className={`text-gray-600 text-sm ${
                              info.multiline ? "whitespace-pre-line" : ""
                            }`}
                          >
                            {info.content}
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <Card className="p-0 overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <svg
                    className="w-12 h-12 mx-auto mb-4 opacity-75"
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
                  <p className="text-base font-medium">University Campus</p>
                  <p className="text-sm opacity-90">Athens, Greece</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label={t("contact.form.name")}
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                  />
                  <Input
                    label={t("contact.form.email")}
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <Input
                  label={t("contact.form.subject")}
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Brief description of your inquiry"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("contact.form.message")} *
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
                  className="w-full"
                  size="lg"
                >
                  {isSubmitting
                    ? t("contact.form.sending")
                    : t("contact.form.submit")}
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
                {t("contact.info.response")}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {t("contact.details.response")}
              </p>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-20">
          <Card className="p-8 text-center bg-gradient-to-r from-blue-50 to-purple-50">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Research Collaboration
            </h3>
            <p className="text-gray-600 max-w-3xl mx-auto mb-8">
              We welcome collaboration opportunities with academic institutions,
              research organizations, and industry partners. Whether you're
              interested in joint research projects, consulting services, or
              academic partnerships, we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Research Partnerships
              </Button>
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
              >
                Consulting Services
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
