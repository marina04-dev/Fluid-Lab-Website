import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContent } from "../contexts/ContentContext";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Card from "../components/common/Card";
import Button from "../components/common/Button";

const Publications = () => {
  // get context's necessary variables/functions
  const { publications, fetchPublications, loading, error, clearError } =
    useContent();
  // publication type filter state variables
  const [selectedType, setSelectedType] = useState("all");
  // year filter state variables
  const [selectedYear, setSelectedYear] = useState("all");
  // sort state variables
  const [sortBy, setSortBy] = useState("year-desc");

  // publication types filter values
  const publicationTypes = [
    { value: "all", label: "All Types" },
    { value: "journal", label: "Journal Articles" },
    { value: "conference", label: "Conference Papers" },
    { value: "book-chapter", label: "Book Chapters" },
    { value: "thesis", label: "Theses" },
    { value: "report", label: "Technical Reports" },
    { value: "preprint", label: "Preprints" },
  ];

  // sort options
  const sortOptions = [
    { value: "year-desc", label: "Year (Newest First)" },
    { value: "year-asc", label: "Year (Oldest First)" },
    { value: "title-asc", label: "Title (A-Z)" },
    { value: "title-desc", label: "Title (Z-A)" },
  ];

  // fetchPublications each time any of the filters changes using the API call from context
  useEffect(() => {
    const filters = {};
    if (selectedType !== "all") {
      filters.publicationType = selectedType;
    }
    if (selectedYear !== "all") {
      filters.year = selectedYear;
    }
    if (sortBy) {
      filters.sortBy = sortBy;
    }

    // Call the API using context function
    fetchPublications(filters);
  }, [selectedType, selectedYear, sortBy, fetchPublications]);

  // Clear any existing errors on component mount
  useEffect(() => {
    clearError();
  }, [clearError]);

  // get unique years from publications for year filter
  const getAvailableYears = () => {
    if (!publications || publications.length === 0) return [];

    const years = publications
      .map((pub) => pub.year)
      .filter((year) => year)
      .map((year) => parseInt(year))
      .filter((year) => !isNaN(year));

    const uniqueYears = [...new Set(years)].sort((a, b) => b - a);
    return uniqueYears;
  };

  // function to get publication type badge style
  const getTypeBadge = (type) => {
    const typeStyles = {
      journal: "badge-blue",
      conference: "badge-green",
      "book-chapter": "badge-purple",
      thesis: "badge-orange",
      report: "badge-gray",
      preprint: "badge-yellow",
    };
    return typeStyles[type] || "badge-gray";
  };

  // function to format authors display
  const formatAuthors = (authors) => {
    if (!authors) return "";
    if (Array.isArray(authors)) {
      return authors.join(", ");
    }
    return authors;
  };

  // function to truncate abstract for card display
  const truncateAbstract = (abstract, maxLength = 200) => {
    if (!abstract) return "";
    return abstract.length > maxLength
      ? abstract.substring(0, maxLength) + "..."
      : abstract;
  };

  // function to format publication reference
  const formatReference = (publication) => {
    const parts = [];

    if (publication.journal) {
      parts.push(publication.journal);
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

  // if publications display is slow display loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading publications..." />
      </div>
    );
  }

  const availableYears = getAvailableYears();

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="pt-24 pb-16 gradient-bg">
        <div className="container-custom">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-6">Publications</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Discover our latest research findings and academic contributions
              to the field of fluid mechanics
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Type Filter */}
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Filter by Type
                </label>
                <select
                  id="type"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {publicationTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year Filter */}
              <div>
                <label
                  htmlFor="year"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Filter by Year
                </label>
                <select
                  id="year"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Years</option>
                  {availableYears.map((year) => (
                    <option key={year} value={year.toString()}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Filter */}
              <div>
                <label
                  htmlFor="sort"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Sort by
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
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
          )}

          {/* Publications List */}
          {!publications || publications.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  No Publications Found
                </h3>
                <p className="text-gray-600 mb-6">
                  {selectedType !== "all" || selectedYear !== "all"
                    ? "No publications match your current filters. Try adjusting your search criteria."
                    : "No publications are available at the moment."}
                </p>
                {(selectedType !== "all" || selectedYear !== "all") && (
                  <Button
                    onClick={() => {
                      setSelectedType("all");
                      setSelectedYear("all");
                    }}
                    variant="outline"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {publications.map((publication) => (
                <Card key={publication._id} hover>
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    {/* Publication Info */}
                    <div className="flex-1">
                      {/* Type and Featured badges */}
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className={`badge ${getTypeBadge(
                            publication.publicationType
                          )}`}
                        >
                          {publication.publicationType
                            ?.split("-")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ") || "Publication"}
                        </span>
                        {publication.isFeatured && (
                          <span className="badge badge-purple">Featured</span>
                        )}
                        {publication.status && (
                          <span className="badge badge-green">
                            {publication.status.charAt(0).toUpperCase() +
                              publication.status.slice(1)}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        <Link
                          to={`/publications/${publication._id}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {publication.title}
                        </Link>
                      </h3>

                      {/* Authors */}
                      <p className="text-gray-700 font-medium mb-2">
                        {formatAuthors(publication.authors)}
                      </p>

                      {/* Publication Details */}
                      <div className="text-gray-600 mb-3">
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          {publication.year && (
                            <span>
                              <strong>Year:</strong> {publication.year}
                            </span>
                          )}
                          {formatReference(publication) && (
                            <span>
                              <strong>Published in:</strong>{" "}
                              {formatReference(publication)}
                            </span>
                          )}
                          {publication.doi && (
                            <span>
                              <strong>DOI:</strong>{" "}
                              <a
                                href={`https://doi.org/${publication.doi}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800"
                              >
                                {publication.doi}
                              </a>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Abstract */}
                      {publication.abstract && (
                        <p className="text-gray-600 mb-4">
                          {truncateAbstract(publication.abstract)}
                        </p>
                      )}

                      {/* Keywords */}
                      {publication.keywords &&
                        publication.keywords.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            <strong className="text-sm text-gray-700">
                              Keywords:
                            </strong>
                            {publication.keywords
                              .slice(0, 5)
                              .map((keyword, index) => (
                                <span
                                  key={index}
                                  className="badge badge-gray text-xs"
                                >
                                  {keyword.trim()}
                                </span>
                              ))}
                            {publication.keywords.length > 5 && (
                              <span className="badge badge-gray text-xs">
                                +{publication.keywords.length - 5} more
                              </span>
                            )}
                          </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 lg:w-48">
                      <Link
                        to={`/publications/${publication._id}`}
                        className="btn btn-primary text-center"
                      >
                        View Details
                      </Link>

                      {publication.pdfUrl && (
                        <a
                          href={publication.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline text-center"
                        >
                          Download PDF
                        </a>
                      )}

                      {publication.doi && (
                        <a
                          href={`https://doi.org/${publication.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline text-purple-600 text-center"
                        >
                          View on Publisher
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Summary Stats */}
          {publications && publications.length > 0 && (
            <div className="mt-12 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Publication Statistics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {publications.length}
                  </div>
                  <div className="text-sm text-gray-600">
                    Total Publication{publications.length !== 1 ? "s" : ""}
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {
                      publications.filter(
                        (p) => p.publicationType === "journal"
                      ).length
                    }
                  </div>
                  <div className="text-sm text-gray-600">
                    Journal Article
                    {publications.filter((p) => p.publicationType === "journal")
                      .length !== 1
                      ? "s"
                      : ""}
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {
                      publications.filter(
                        (p) => p.publicationType === "conference"
                      ).length
                    }
                  </div>
                  <div className="text-sm text-gray-600">
                    Conference Paper
                    {publications.filter(
                      (p) => p.publicationType === "conference"
                    ).length !== 1
                      ? "s"
                      : ""}
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {availableYears.length > 0
                      ? Math.max(...availableYears) -
                        Math.min(...availableYears) +
                        1
                      : 0}
                  </div>
                  <div className="text-sm text-gray-600">
                    Year{availableYears.length > 1 ? "s" : ""} of Research
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Publications;
