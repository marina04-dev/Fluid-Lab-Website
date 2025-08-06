// client/src/pages/admin/PublicationManagement.jsx
import React, { useState, useEffect } from "react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Modal from "../../components/common/Modal";
import BackButton from "../../components/common/BackButton";
import toast from "react-hot-toast";

const PublicationManagement = () => {
  const [publications, setPublications] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPublication, setEditingPublication] = useState(null);
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

  const publicationTypes = [
    "journal",
    "conference",
    "book-chapter",
    "thesis",
    "report",
    "preprint",
  ];

  const statusOptions = ["published", "accepted", "under-review", "draft"];

  // Mock data για demo
  useEffect(() => {
    const mockPublications = [
      {
        id: 1,
        title: "Advanced Computational Methods for Turbulent Flow Analysis",
        authors: "M. Papadakis, N. Georgiadis, A. Christou",
        journal: "Journal of Computational Fluid Dynamics",
        year: "2024",
        volume: "38",
        issue: "2",
        pages: "145-162",
        doi: "10.1080/10618562.2024.1234567",
        abstract:
          "This paper presents novel computational methods for analyzing complex turbulent flow phenomena. The proposed approach combines high-order numerical schemes with advanced turbulence modeling techniques to achieve unprecedented accuracy in flow predictions.",
        keywords: "Turbulent flow, CFD, Numerical methods, Turbulence modeling",
        publicationType: "journal",
        status: "published",
        pdfUrl: "https://example.com/paper1.pdf",
        isFeatured: true,
        isActive: true,
        createdAt: "2024-01-15",
        citations: 12,
      },
      {
        id: 2,
        title: "Biofluid Mechanics Applications in Cardiovascular Research",
        authors: "A. Christou, M. Papadakis",
        journal: "Annual Review of Biomedical Engineering",
        year: "2024",
        volume: "26",
        issue: "1",
        pages: "287-315",
        doi: "10.1146/annurev-bioeng-2024-071523",
        abstract:
          "A comprehensive review of recent advances in biofluid mechanics with specific focus on cardiovascular applications. The review covers experimental techniques, computational modeling, and clinical implications.",
        keywords:
          "Biofluid mechanics, Cardiovascular, Blood flow, Medical applications",
        publicationType: "journal",
        status: "published",
        pdfUrl: "https://example.com/paper2.pdf",
        isFeatured: true,
        isActive: true,
        createdAt: "2024-02-01",
        citations: 8,
      },
      {
        id: 3,
        title: "Heat Transfer Enhancement in Industrial Heat Exchangers",
        authors: "N. Georgiadis, M. Papadakis",
        journal: "Proceedings of the International Heat Transfer Conference",
        year: "2023",
        volume: "",
        issue: "",
        pages: "1542-1549",
        doi: "10.1615/IHTC17.hte.2023.045612",
        abstract:
          "Investigation of various heat transfer enhancement techniques applicable to industrial heat exchangers. The study includes both experimental validation and numerical simulations.",
        keywords:
          "Heat transfer, Heat exchangers, Industrial applications, Enhancement techniques",
        publicationType: "conference",
        status: "published",
        pdfUrl: "https://example.com/paper3.pdf",
        isFeatured: false,
        isActive: true,
        createdAt: "2023-11-15",
        citations: 5,
      },
      {
        id: 4,
        title: "Machine Learning Applications in Fluid Mechanics",
        authors: "M. Papadakis, A. Christou, N. Georgiadis",
        journal: "Physics of Fluids",
        year: "2024",
        volume: "36",
        issue: "3",
        pages: "",
        doi: "10.1063/5.0201234",
        abstract:
          "Exploring the integration of machine learning techniques with traditional fluid mechanics approaches for enhanced prediction and analysis capabilities.",
        keywords: "Machine learning, Fluid mechanics, AI, Data analysis",
        publicationType: "journal",
        status: "accepted",
        pdfUrl: "",
        isFeatured: false,
        isActive: true,
        createdAt: "2024-03-01",
        citations: 0,
      },
    ];
    setPublications(mockPublications);
  }, []);

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddPublication = () => {
    setFormData({
      title: "",
      authors: "",
      journal: "",
      year: new Date().getFullYear().toString(),
      volume: "",
      issue: "",
      pages: "",
      doi: "",
      abstract: "",
      keywords: "",
      publicationType: "journal",
      status: "draft",
      pdfUrl: "",
      isFeatured: false,
      isActive: true,
    });
    setIsAddModalOpen(true);
  };

  const handleEditPublication = (publication) => {
    setEditingPublication(publication);
    setFormData({
      title: publication.title,
      authors: publication.authors,
      journal: publication.journal,
      year: publication.year,
      volume: publication.volume,
      issue: publication.issue,
      pages: publication.pages,
      doi: publication.doi,
      abstract: publication.abstract,
      keywords: publication.keywords,
      publicationType: publication.publicationType,
      status: publication.status,
      pdfUrl: publication.pdfUrl,
      isFeatured: publication.isFeatured,
      isActive: publication.isActive,
    });
    setIsEditModalOpen(true);
  };

  const handleSavePublication = () => {
    if (editingPublication) {
      // Update existing publication
      setPublications((prev) =>
        prev.map((publication) =>
          publication.id === editingPublication.id
            ? { ...publication, ...formData }
            : publication
        )
      );
      toast.success("Publication updated successfully!");
      setIsEditModalOpen(false);
    } else {
      // Add new publication
      const newPublication = {
        id: Date.now(),
        ...formData,
        citations: 0,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setPublications((prev) => [...prev, newPublication]);
      toast.success("New publication added successfully!");
      setIsAddModalOpen(false);
    }
    setEditingPublication(null);
  };

  const handleDeletePublication = (id) => {
    if (window.confirm("Are you sure you want to delete this publication?")) {
      setPublications((prev) =>
        prev.filter((publication) => publication.id !== id)
      );
      toast.success("Publication deleted successfully!");
    }
  };

  const handleToggleFeatured = (id) => {
    setPublications((prev) =>
      prev.map((publication) =>
        publication.id === id
          ? { ...publication, isFeatured: !publication.isFeatured }
          : publication
      )
    );
    toast.success("Featured status updated!");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-700";
      case "accepted":
        return "bg-blue-100 text-blue-700";
      case "under-review":
        return "bg-yellow-100 text-yellow-700";
      case "draft":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPublicationTypeColor = (type) => {
    switch (type) {
      case "journal":
        return "bg-blue-50 text-blue-700";
      case "conference":
        return "bg-purple-50 text-purple-700";
      case "book-chapter":
        return "bg-green-50 text-green-700";
      case "thesis":
        return "bg-orange-50 text-orange-700";
      case "report":
        return "bg-gray-50 text-gray-700";
      case "preprint":
        return "bg-red-50 text-red-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-4 mb-2">
            <BackButton variant="back" text="Back to Dashboard" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Publication Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage publications and research papers
          </p>
        </div>
        <Button onClick={handleAddPublication}>
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add Publication
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {publications.length}
            </div>
            <div className="text-sm text-gray-600">Total Publications</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {publications.filter((p) => p.status === "published").length}
            </div>
            <div className="text-sm text-gray-600">Published</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">
              {publications.filter((p) => p.status === "under-review").length}
            </div>
            <div className="text-sm text-gray-600">Under Review</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {publications.filter((p) => p.isFeatured).length}
            </div>
            <div className="text-sm text-gray-600">Featured</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {publications.reduce((total, p) => total + (p.citations || 0), 0)}
            </div>
            <div className="text-sm text-gray-600">Total Citations</div>
          </div>
        </Card>
      </div>

      {/* Publications Grid */}
      <div className="grid grid-cols-1 gap-6">
        {publications.map((publication) => (
          <Card key={publication.id}>
            <div className="flex flex-col space-y-4">
              {/* Publication Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {publication.title}
                    </h3>
                    {publication.isFeatured && (
                      <span className="text-yellow-500" title="Featured">
                        ⭐
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Authors:</strong> {publication.authors}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <span>
                      <strong>Journal:</strong> {publication.journal}
                    </span>
                    <span>
                      <strong>Year:</strong> {publication.year}
                    </span>
                    {publication.citations > 0 && (
                      <span className="text-blue-600">
                        <strong>Citations:</strong> {publication.citations}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 rounded text-xs ${getStatusColor(
                      publication.status
                    )}`}
                  >
                    {publication.status.replace("-", " ")}
                  </span>
                  <span
                    className={`px-2 py-1 rounded text-xs ${getPublicationTypeColor(
                      publication.publicationType
                    )}`}
                  >
                    {publication.publicationType.replace("-", " ")}
                  </span>
                </div>
              </div>

              {/* Publication Details */}
              <div className="bg-gray-50 p-4 rounded-lg">
                {publication.abstract && (
                  <div className="mb-3">
                    <strong className="text-sm text-gray-700">Abstract:</strong>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                      {publication.abstract}
                    </p>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {publication.volume && (
                    <div>
                      <strong>Volume:</strong> {publication.volume}
                    </div>
                  )}
                  {publication.issue && (
                    <div>
                      <strong>Issue:</strong> {publication.issue}
                    </div>
                  )}
                  {publication.pages && (
                    <div>
                      <strong>Pages:</strong> {publication.pages}
                    </div>
                  )}
                  {publication.doi && (
                    <div>
                      <strong>DOI:</strong>
                      <a
                        href={`https://doi.org/${publication.doi}`}
                        className="text-blue-600 hover:text-blue-700 ml-1"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {publication.doi}
                      </a>
                    </div>
                  )}
                </div>
                {publication.keywords && (
                  <div className="mt-3">
                    <strong className="text-sm text-gray-700">Keywords:</strong>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {publication.keywords.split(",").map((keyword, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded"
                        >
                          {keyword.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 pt-4 border-t">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEditPublication(publication)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant={publication.isFeatured ? "secondary" : "outline"}
                  onClick={() => handleToggleFeatured(publication.id)}
                >
                  {publication.isFeatured ? "Unfeature" : "Feature"}
                </Button>
                {publication.pdfUrl && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(publication.pdfUrl, "_blank")}
                  >
                    View PDF
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDeletePublication(publication.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add/Edit Publication Modal */}
      <Modal
        isOpen={isAddModalOpen || isEditModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setIsEditModalOpen(false);
          setEditingPublication(null);
        }}
        title={editingPublication ? "Edit Publication" : "Add Publication"}
        size="xl"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Input
                label="Publication Title"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="md:col-span-2">
              <Input
                label="Authors"
                name="authors"
                value={formData.authors}
                onChange={handleFormChange}
                placeholder="e.g., J. Smith, M. Johnson, A. Brown"
                required
              />
            </div>
            <div className="md:col-span-2">
              <Input
                label="Journal/Conference"
                name="journal"
                value={formData.journal}
                onChange={handleFormChange}
                required
              />
            </div>
            <div>
              <Input
                label="Year"
                name="year"
                type="number"
                value={formData.year}
                onChange={handleFormChange}
                min="1900"
                max="2030"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Publication Type
              </label>
              <select
                name="publicationType"
                value={formData.publicationType}
                onChange={handleFormChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {publicationTypes.map((type) => (
                  <option key={type} value={type}>
                    {type
                      .replace("-", " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleFormChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status
                      .replace("-", " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
            <Input
              label="Volume"
              name="volume"
              value={formData.volume}
              onChange={handleFormChange}
            />
            <Input
              label="Issue"
              name="issue"
              value={formData.issue}
              onChange={handleFormChange}
            />
            <Input
              label="Pages"
              name="pages"
              value={formData.pages}
              onChange={handleFormChange}
              placeholder="e.g., 123-145"
            />
            <Input
              label="DOI"
              name="doi"
              value={formData.doi}
              onChange={handleFormChange}
              placeholder="e.g., 10.1016/j.example.2024.123456"
            />
            <div className="md:col-span-2">
              <Input
                label="Keywords"
                name="keywords"
                value={formData.keywords}
                onChange={handleFormChange}
                placeholder="e.g., Fluid mechanics, CFD, Simulation"
              />
            </div>
            <div className="md:col-span-2">
              <Input
                label="PDF URL"
                name="pdfUrl"
                value={formData.pdfUrl}
                onChange={handleFormChange}
                placeholder="https://example.com/publication.pdf"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Abstract
            </label>
            <textarea
              name="abstract"
              value={formData.abstract}
              onChange={handleFormChange}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Publication abstract..."
            />
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleFormChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">
                Featured publication
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleFormChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">
                Active publication
              </label>
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => {
                setIsAddModalOpen(false);
                setIsEditModalOpen(false);
                setEditingPublication(null);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSavePublication}>
              {editingPublication ? "Update Publication" : "Add Publication"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PublicationManagement;
