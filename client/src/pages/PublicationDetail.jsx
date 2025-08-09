import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useContent } from "../contexts/ContentContext";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Card from "../components/common/Card";

const PublicationDetail = () => {
  // get the publication's id from url params
  const { id } = useParams();
  // get necessary variables/functions from ContentContext
  const { fetchPublicationById, loading, error, clearError } = useContent();
  // state variables for publication display
  const [publication, setPublication] = useState(null);
  // state variables for local loading (for this specific publication)
  const [localLoading, setLocalLoading] = useState(true);
  // state variables for local error
  const [localError, setLocalError] = useState(null);

  // fetch publication by id each time the id changes using ContentContext function
  useEffect(() => {
    const loadPublication = async () => {
      setLocalLoading(true);
      setLocalError(null);

      try {
        // Use the fetchPublicationById function from ContentContext
        const result = await fetchPublicationById(id);

        if (result.success) {
          setPublication(result.data);
        } else {
          setLocalError(result.error || "Failed to load publication");
        }
      } catch (err) {
        console.error("Error loading publication:", err);
        setLocalError("An unexpected error occurred");
      } finally {
        setLocalLoading(false);
      }
    };

    if (id) {
      loadPublication();
    }
  }, [id, fetchPublicationById]);

  // Clear any existing errors on component mount
  useEffect(() => {
    clearError();
  }, [clearError]);

  // function to format authors for display
  const formatAuthors = (authors) => {
    if (!authors) return "Unknown authors";
    if (Array.isArray(authors)) {
      return authors.join(", ");
    }
    return authors.toString();
  };

  // function to format keywords for display
  const formatKeywords = (keywords) => {
    if (!keywords) return [];
    if (Array.isArray(keywords)) {
      return keywords;
    }
    return keywords.split(",").map((k) => k.trim());
  };

  // function to get publication type badge style
  const getTypeBadge = (type) => {
    const typeStyles = {
      journal: "bg-blue-100 text-blue-800",
      conference: "bg-green-100 text-green-800",
      "book-chapter": "bg-purple-100 text-purple-800",
      thesis: "bg-orange-100 text-orange-800",
      report: "bg-gray-100 text-gray-800",
      preprint: "bg-yellow-100 text-yellow-800",
    };
    return typeStyles[type] || "bg-gray-100 text-gray-800";
  };

  // function to get status badge style
  const getStatusBadge = (status) => {
    const statusStyles = {
      published: "bg-green-100 text-green-800",
      accepted: "bg-blue-100 text-blue-800",
      "under-review": "bg-yellow-100 text-yellow-800",
      draft: "bg-gray-100 text-gray-800",
    };
    return statusStyles[status] || "bg-gray-100 text-gray-800";
  };

  // function to format publication reference
  const formatReference = (publication) => {
    const parts = [];

    if (publication.journal) {
      parts.push(publication.journal);
    }

    if (publication.year) {
      parts.push(publication.year.toString());
    }

    if (publication.volume) {
      parts.push(`Vol. ${publication.volume}`);
    }

    if (publication.issue) {
      parts.push(`Issue ${publication.issue}`);
    }

    if (publication.pages) {
      parts.push(`pp. ${publication.pages}`);
    }

    return parts.join(", ");
  };

  // if publication's display is slow display loading
  if (localLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading publication..." />
      </div>
    );
  }

  // if publication's display has an error or no publication with this id exists display error & link to navigate back to all publications
  if (localError || error || !publication) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Publication Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            {localError ||
              error ||
              "The requested publication could not be found."}
          </p>
          <Link
            to="/publications"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            ← Back to Publications
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="pt-24 pb-16 gradient-bg">
        <div className="container-custom">
          <div className="text-center text-white">
            {/* Breadcrumb */}
            <div className="mb-6">
              <Link
                to="/publications"
                className="text-white/80 hover:text-white text-sm"
              >
                ← Back to Publications
              </Link>
            </div>

            <h1 className="text-4xl font-bold mb-6">{publication.title}</h1>

            {/* Publication Meta */}
            <div className="flex flex-wrap justify-center gap-4 text-sm opacity-90">
              <span
                className={`px-3 py-1 rounded-full ${getTypeBadge(
                  publication.publicationType
                )}`}
              >
                {publication.publicationType
                  ?.replace("-", " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase()) || "Publication"}
              </span>

              <span
                className={`px-3 py-1 rounded-full ${getStatusBadge(
                  publication.status
                )}`}
              >
                {publication.status?.charAt(0).toUpperCase() +
                  publication.status?.slice(1) || "Unknown"}
              </span>

              {publication.isFeatured && (
                <span className="px-3 py-1 bg-yellow-500/80 text-yellow-900 rounded-full">
                  Featured Publication
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Authors */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Authors
                </h2>
                <Card>
                  <p className="text-lg text-gray-700 font-medium">
                    {formatAuthors(publication.authors)}
                  </p>
                </Card>
              </div>

              {/* Abstract */}
              {publication.abstract && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Abstract
                  </h2>
                  <Card>
                    <div className="prose prose-lg text-gray-600">
                      <p className="whitespace-pre-wrap">
                        {publication.abstract}
                      </p>
                    </div>
                  </Card>
                </div>
              )}

              {/* Keywords */}
              {publication.keywords &&
                formatKeywords(publication.keywords).length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Keywords
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {formatKeywords(publication.keywords).map(
                        (keyword, index) => (
                          <span key={index} className="badge badge-blue">
                            {keyword}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}

              {/* Citation */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Citation
                </h2>
                <Card className="bg-gray-50">
                  <div className="font-mono text-sm text-gray-800">
                    <p>
                      {formatAuthors(publication.authors)}.
                      {publication.year && ` (${publication.year}).`}{" "}
                      <em>{publication.title}</em>.
                      {publication.journal && ` ${publication.journal}`}
                      {publication.volume && `, ${publication.volume}`}
                      {publication.issue && `(${publication.issue})`}
                      {publication.pages && `, ${publication.pages}`}.
                      {publication.doi && ` doi:${publication.doi}`}
                    </p>
                  </div>

                  {/* Copy to clipboard button could be added here */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                      Click to select the citation text above for copying
                    </p>
                  </div>
                </Card>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Publication Details */}
              <Card className="sticky top-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Publication Details
                </h3>

                <div className="space-y-6">
                  {/* Type */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Type
                    </h4>
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getTypeBadge(
                        publication.publicationType
                      )}`}
                    >
                      {publication.publicationType
                        ?.replace("-", " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase()) ||
                        "Publication"}
                    </span>
                  </div>

                  {/* Status */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Status
                    </h4>
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(
                        publication.status
                      )}`}
                    >
                      {publication.status?.charAt(0).toUpperCase() +
                        publication.status?.slice(1) || "Unknown"}
                    </span>
                  </div>

                  {/* Journal/Conference */}
                  {publication.journal && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">
                        {publication.publicationType === "conference"
                          ? "Conference"
                          : "Journal"}
                      </h4>
                      <p className="text-gray-900">{publication.journal}</p>
                    </div>
                  )}

                  {/* Publication Year */}
                  {publication.year && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">
                        Year
                      </h4>
                      <p className="text-gray-900">{publication.year}</p>
                    </div>
                  )}

                  {/* Volume & Issue */}
                  {(publication.volume || publication.issue) && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">
                        Volume & Issue
                      </h4>
                      <p className="text-gray-900">
                        {publication.volume && `Vol. ${publication.volume}`}
                        {publication.volume && publication.issue && ", "}
                        {publication.issue && `Issue ${publication.issue}`}
                      </p>
                    </div>
                  )}

                  {/* Pages */}
                  {publication.pages && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">
                        Pages
                      </h4>
                      <p className="text-gray-900">{publication.pages}</p>
                    </div>
                  )}

                  {/* DOI */}
                  {publication.doi && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">
                        DOI
                      </h4>
                      <a
                        href={`https://doi.org/${publication.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 break-all"
                      >
                        {publication.doi}
                      </a>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="space-y-3">
                    <Link
                      to="/publications"
                      className="w-full btn btn-outline text-purple-600 text-center block"
                    >
                      ← Back to All Publications
                    </Link>

                    {publication.pdfUrl && (
                      <a
                        href={publication.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full btn btn-primary text-center block"
                      >
                        Download PDF
                      </a>
                    )}

                    {publication.doi && (
                      <a
                        href={`https://doi.org/${publication.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full btn text-purple-600 btn-outline text-center block"
                      >
                        View on Publisher
                      </a>
                    )}

                    <Link
                      to="/contact"
                      className="w-full btn btn-outline text-center text-purple-600 block"
                    >
                      Contact About This Work
                    </Link>
                  </div>
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
