import React, { useState, useEffect } from "react";
import { useContent } from "../../contexts/ContentContext";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Modal from "../../components/common/Modal";
import BackButton from "../../components/common/BackButton";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import toast from "react-hot-toast";

const PublicationManagement = () => {
  // get context's necessary variables/functions
  const {
    publications,
    fetchPublications,
    createPublication,
    updatePublication,
    deletePublication,
    loading,
    error,
    clearError,
  } = useContent();

  // state variables to handle add publication modal display
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  // state variables to handle edit publication modal display
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // state variables to handle editing publication
  const [editingPublication, setEditingPublication] = useState(null);
  // state variables to handle form data display
  const [formData, setFormData] = useState({
    title: "",
    authors: "",
    journal: "",
    year: "",
    volume: "",
    issue: "",
    pages: "",
    doi: "",
    abstract: "",
    keywords: "",
    publicationType: "journal",
    status: "published",
    pdfUrl: "",
    isFeatured: false,
    isActive: true,
  });
  // state variable to track submitting status
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Προσθήκη useState για τα φίλτρα
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  // publication types options
  const publicationTypes = [
    "journal",
    "conference",
    "book-chapter",
    "thesis",
    "report",
    "preprint",
  ];

  // status options
  const statusOptions = ["published", "accepted", "under-review", "draft"];

  // Load publications on component mount using API call from context
  useEffect(() => {
    fetchPublications();
  }, [fetchPublications]);

  // Clear errors on component mount
  useEffect(() => {
    clearError();
  }, [clearError]);

  // function to handle form inputs change
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // function to handle add publication modal opening
  const handleAddPublication = () => {
    setFormData({
      title: "",
      authors: "",
      journal: "",
      year: "",
      volume: "",
      issue: "",
      pages: "",
      doi: "",
      abstract: "",
      keywords: "",
      publicationType: "journal",
      status: "published",
      pdfUrl: "",
      isFeatured: false,
      isActive: true,
    });
    setEditingPublication(null);
    setIsAddModalOpen(true);
  };

  // function to handle edit publication modal opening
  const handleEditPublication = (publication) => {
    setEditingPublication(publication);
    setFormData({
      title: publication.title || "",
      authors: Array.isArray(publication.authors)
        ? publication.authors.join(", ")
        : publication.authors || "",
      journal: publication.journal || "",
      year: publication.year?.toString() || "",
      volume: publication.volume || "",
      issue: publication.issue || "",
      pages: publication.pages || "",
      doi: publication.doi || "",
      abstract: publication.abstract || "",
      keywords: Array.isArray(publication.keywords)
        ? publication.keywords.join(", ")
        : publication.keywords || "",
      publicationType: publication.publicationType || "journal",
      status: publication.status || "published",
      pdfUrl: publication.pdfUrl || "",
      isFeatured: publication.isFeatured || false,
      isActive:
        publication.isActive !== undefined ? publication.isActive : true,
    });
    setIsEditModalOpen(true);
  };

  // function to handle publication save (create or update) using API calls from context
  const handleSavePublication = async () => {
    // Basic validation
    if (!formData.title.trim()) {
      toast.error("Publication title is required");
      return;
    }
    if (!formData.authors.trim()) {
      toast.error("Authors are required");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare data for API
      const publicationData = {
        ...formData,
        // Convert comma-separated strings to arrays where needed
        authors: formData.authors
          ? formData.authors
              .split(",")
              .map((item) => item.trim())
              .filter((item) => item)
          : [],
        keywords: formData.keywords
          ? formData.keywords
              .split(",")
              .map((item) => item.trim())
              .filter((item) => item)
          : [],
        // Convert year to number
        year: formData.year ? parseInt(formData.year) : null,
      };

      let result;
      if (editingPublication) {
        // Update existing publication using context function
        result = await updatePublication(
          editingPublication._id,
          publicationData
        );
      } else {
        // Create new publication using context function
        result = await createPublication(publicationData);
      }

      if (result.success) {
        toast.success(
          editingPublication
            ? "Publication updated successfully!"
            : "Publication created successfully!"
        );
        setIsEditModalOpen(false);
        setIsAddModalOpen(false);
        setEditingPublication(null);
        // Refresh publications list
        fetchPublications();
      } else {
        toast.error(result.error || "Failed to save publication");
      }
    } catch (error) {
      console.error("Error saving publication:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  // function to handle publication deletion using API call from context
  const handleDeletePublication = async (publicationId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this publication? This action cannot be undone."
      )
    ) {
      try {
        const result = await deletePublication(publicationId);
        if (result.success) {
          toast.success("Publication deleted successfully!");
          // Refresh publications list
          fetchPublications();
        } else {
          toast.error(result.error || "Failed to delete publication");
        }
      } catch (error) {
        console.error("Error deleting publication:", error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  // function to handle publication status toggle using API call from context
  const handleToggleStatus = async (publication) => {
    try {
      const result = await updatePublication(publication._id, {
        ...publication,
        isActive: !publication.isActive,
      });

      if (result.success) {
        toast.success("Publication status updated!");
        // Refresh publications list
        fetchPublications();
      } else {
        toast.error(result.error || "Failed to update publication status");
      }
    } catch (error) {
      console.error("Error updating publication status:", error);
      toast.error("An unexpected error occurred");
    }
  };

  // function to handle featured status toggle using API call from context
  const handleToggleFeatured = async (publication) => {
    try {
      const result = await updatePublication(publication._id, {
        ...publication,
        isFeatured: !publication.isFeatured,
      });

      if (result.success) {
        toast.success("Featured status updated!");
        // Refresh publications list
        fetchPublications();
      } else {
        toast.error(result.error || "Failed to update featured status");
      }
    } catch (error) {
      console.error("Error updating featured status:", error);
      toast.error("An unexpected error occurred");
    }
  };

  // function to format authors for display
  const formatAuthors = (authors) => {
    if (Array.isArray(authors)) {
      return authors.join(", ");
    }
    return authors || "";
  };

  // function to truncate text for display
  const truncateText = (text, maxLength = 100) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  // function to get publication type display name
  const getTypeDisplayName = (type) => {
    return type
      ? type
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : "Unknown";
  };

  // Χρησιμοποιούμε useEffect για να καλούμε το fetchPublications όταν αλλάζουν τα φίλτρα
  useEffect(() => {
    const filters = {};
    if (filterType !== "all") {
      filters.publicationType = filterType;
    }
    if (searchTerm) {
      filters.search = searchTerm;
    }

    fetchPublications(filters);
  }, [fetchPublications, filterType, searchTerm]);

  // if publications management page is slow display loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading publications..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <BackButton />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Publication Management
              </h1>
              <p className="text-gray-600">
                Manage research publications and papers
              </p>
            </div>
          </div>
          <Button
            onClick={handleAddPublication}
            className="flex items-center space-x-2"
          >
            <span>+</span>
            <span>Add Publication</span>
          </Button>
        </div>

        {/* ΕΔΩ θα εισάγεις το νέο div για τα φίλτρα */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Filter by Type */}
            <div>
              <label
                htmlFor="filterType"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Filter by Type
              </label>
              <select
                id="filterType"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                {publicationTypes.map((type) => (
                  <option key={type} value={type}>
                    {getTypeDisplayName(type)}
                  </option>
                ))}
              </select>
            </div>
            {/* Search Input */}
            <Input
              label="Search Publications"
              placeholder="Search by title, author, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="text-red-800">
                <strong>Error:</strong> {error}
              </div>
              <button
                onClick={clearError}
                className="text-red-600 hover:text-red-800"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Publications List */}
        {publications.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Publications Found
              </h3>
              <p className="text-gray-600 mb-6">
                Get started by adding your first publication
              </p>
              <Button onClick={handleAddPublication}>
                Add Your First Publication
              </Button>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {publications.map((publication) => (
              <Card key={publication._id}>
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Publication Info */}
                  <div className="flex-1">
                    {/* Status Indicators */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            publication.publicationType === "journal"
                              ? "bg-blue-100 text-blue-800"
                              : publication.publicationType === "conference"
                              ? "bg-green-100 text-green-800"
                              : publication.publicationType === "book-chapter"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {getTypeDisplayName(publication.publicationType)}
                        </span>
                        {publication.isFeatured && (
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                            Featured
                          </span>
                        )}
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            publication.status === "published"
                              ? "bg-green-100 text-green-800"
                              : publication.status === "accepted"
                              ? "bg-blue-100 text-blue-800"
                              : publication.status === "under-review"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {publication.status?.charAt(0).toUpperCase() +
                            publication.status?.slice(1) || "Unknown"}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span
                          className={`w-3 h-3 rounded-full ${
                            publication.isActive ? "bg-green-400" : "bg-red-400"
                          }`}
                        ></span>
                        <span className="text-xs text-gray-500">
                          {publication.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {publication.title}
                    </h3>

                    {/* Authors */}
                    <p className="text-gray-700 font-medium mb-2">
                      {formatAuthors(publication.authors)}
                    </p>

                    {/* Publication Details */}
                    <div className="text-gray-600 mb-3">
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        {publication.journal && (
                          <span>
                            <strong>Journal:</strong> {publication.journal}
                          </span>
                        )}
                        {publication.year && (
                          <span>
                            <strong>Year:</strong> {publication.year}
                          </span>
                        )}
                        {publication.volume && (
                          <span>
                            <strong>Vol:</strong> {publication.volume}
                          </span>
                        )}
                        {publication.issue && (
                          <span>
                            <strong>Issue:</strong> {publication.issue}
                          </span>
                        )}
                        {publication.pages && (
                          <span>
                            <strong>Pages:</strong> {publication.pages}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Abstract */}
                    {publication.abstract && (
                      <p className="text-gray-600 mb-3">
                        {truncateText(publication.abstract, 200)}
                      </p>
                    )}

                    {/* DOI and PDF Links */}
                    <div className="flex flex-wrap gap-4 text-sm">
                      {publication.doi && (
                        <a
                          href={`https://doi.org/${publication.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <strong>DOI:</strong> {publication.doi}
                        </a>
                      )}
                      {publication.pdfUrl && (
                        <a
                          href={publication.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          View PDF
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 lg:w-48">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditPublication(publication)}
                      className="w-full text-purple-600"
                    >
                      Edit
                    </Button>
                    <Button
                      variant={publication.isFeatured ? "solid" : "outline"}
                      size="sm"
                      onClick={() => handleToggleFeatured(publication)}
                      className={`w-full ${
                        publication.isFeatured
                          ? "text-white"
                          : "text-purple-600"
                      }`}
                    >
                      {publication.isFeatured ? "★ Featured" : "☆ Feature"}
                    </Button>
                    <Button
                      variant={publication.isActive ? "solid" : "outline"}
                      size="sm"
                      onClick={() => handleToggleStatus(publication)}
                      className="w-full"
                    >
                      {publication.isActive ? "● Active" : "○ Inactive"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeletePublication(publication._id)}
                      className="w-full text-red-600 border-red-300 hover:bg-red-50"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Add/Edit Publication Modal */}
        <Modal
          isOpen={isAddModalOpen || isEditModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            setIsEditModalOpen(false);
            setEditingPublication(null);
          }}
          title={
            editingPublication ? "Edit Publication" : "Add New Publication"
          }
          size="lg"
        >
          <div className="space-y-6">
            {/* Title */}
            <Input
              label="Publication Title *"
              name="title"
              value={formData.title}
              onChange={handleFormChange}
              placeholder="Enter publication title"
              required
            />

            {/* Authors */}
            <Input
              label="Authors *"
              name="authors"
              value={formData.authors}
              onChange={handleFormChange}
              placeholder="Enter authors separated by commas"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Publication Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Publication Type
                </label>
                <select
                  name="publicationType"
                  value={formData.publicationType}
                  onChange={handleFormChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {publicationTypes.map((type) => (
                    <option key={type} value={type}>
                      {getTypeDisplayName(type)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleFormChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Journal */}
              <Input
                label="Journal/Conference"
                name="journal"
                value={formData.journal}
                onChange={handleFormChange}
                placeholder="Enter journal or conference name"
              />

              {/* Year */}
              <Input
                label="Year"
                name="year"
                type="number"
                value={formData.year}
                onChange={handleFormChange}
                placeholder="2024"
                min="1900"
                max="2100"
              />

              {/* Volume */}
              <Input
                label="Volume"
                name="volume"
                value={formData.volume}
                onChange={handleFormChange}
                placeholder="Volume number"
              />

              {/* Issue */}
              <Input
                label="Issue"
                name="issue"
                value={formData.issue}
                onChange={handleFormChange}
                placeholder="Issue number"
              />

              {/* Pages */}
              <Input
                label="Pages"
                name="pages"
                value={formData.pages}
                onChange={handleFormChange}
                placeholder="e.g., 123-145"
              />

              {/* DOI */}
              <Input
                label="DOI"
                name="doi"
                value={formData.doi}
                onChange={handleFormChange}
                placeholder="e.g., 10.1000/182"
              />
            </div>

            {/* Abstract */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Abstract
              </label>
              <textarea
                name="abstract"
                value={formData.abstract}
                onChange={handleFormChange}
                rows="6"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter publication abstract"
              />
            </div>

            {/* Keywords */}
            <Input
              label="Keywords"
              name="keywords"
              value={formData.keywords}
              onChange={handleFormChange}
              placeholder="Enter keywords separated by commas"
            />

            {/* PDF URL */}
            <Input
              label="PDF URL"
              name="pdfUrl"
              type="url"
              value={formData.pdfUrl}
              onChange={handleFormChange}
              placeholder="https://example.com/paper.pdf"
            />

            {/* Checkboxes */}
            <div className="flex items-center space-x-6">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleFormChange}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Featured Publication
                </span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleFormChange}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Active
                </span>
              </label>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex justify-end space-x-4 mt-8">
            <Button
              variant="outline"
              onClick={() => {
                setIsAddModalOpen(false);
                setIsEditModalOpen(false);
                setEditingPublication(null);
              }}
              disabled={isSubmitting}
              className="text-purple-600"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSavePublication}
              disabled={isSubmitting}
              className="flex items-center space-x-2"
            >
              {isSubmitting && <LoadingSpinner size="sm" />}
              <span>
                {isSubmitting
                  ? "Saving..."
                  : editingPublication
                  ? "Update Publication"
                  : "Create Publication"}
              </span>
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default PublicationManagement;
