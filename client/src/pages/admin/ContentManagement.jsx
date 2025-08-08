import React, { useState, useEffect } from "react";
import { useContent } from "../../contexts/ContentContext";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Modal from "../../components/common/Modal";
import BackButton from "../../components/common/BackButton";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import toast from "react-hot-toast";

const ContentManagement = () => {
  // get necessary variables/functions from context
  const {
    content,
    fetchContent,
    updateContent,
    createContent,
    deleteContent,
    loading,
    error,
    clearError,
  } = useContent();

  // state variables to handle edit content modal display
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // state variables to handle add content modal display
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  // state variables to handle delete content modal display
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // state variables to handle edit content
  const [editingContent, setEditingContent] = useState(null);
  // state variables to handle delete content
  const [deletingContent, setDeletingContent] = useState(null);
  // state variables to handle edit form
  const [editForm, setEditForm] = useState({
    key: "",
    title: "",
    content: "",
    type: "text",
    section: "general",
  });
  // state variables to handle add form
  const [addForm, setAddForm] = useState({
    key: "",
    title: "",
    content: "",
    type: "text",
    section: "general",
  });
  // state variables to handle content items for display
  const [contentItems, setContentItems] = useState([]);
  // state variables to handle submit status
  const [isSubmitting, setIsSubmitting] = useState(false);
  // state variables for search and filter
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSection, setFilterSection] = useState("all");

  // content sections for organization
  const sections = [
    { value: "all", label: "All Sections" },
    { value: "general", label: "General" },
    { value: "hero", label: "Hero Section" },
    { value: "about", label: "About Section" },
    { value: "home", label: "Home Page" },
    { value: "research", label: "Research Areas" },
    { value: "capability", label: "Capabilities" },
    { value: "vision", label: "Vision" },
    { value: "footer", label: "Footer" },
  ];

  // content types
  const contentTypes = [
    { value: "text", label: "Text" },
    { value: "html", label: "HTML" },
    { value: "markdown", label: "Markdown" },
    { value: "image", label: "Image URL" },
    { value: "link", label: "Link" },
  ];

  // Load content on component mount using API call from context
  useEffect(() => {
    loadContent();
  }, []);

  // Clear errors on component mount
  useEffect(() => {
    clearError();
  }, [clearError]);

  // Load content from database and convert to display format
  const loadContent = async () => {
    try {
      await fetchContent();
    } catch (error) {
      console.error("Error loading content:", error);
      toast.error("Failed to load content");
    }
  };

  // Convert content from context to display items format
  useEffect(() => {
    if (content) {
      const items = Object.keys(content).map((key) => {
        const item = content[key];
        return {
          key: item.key || key,
          title:
            item.title ||
            key.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
          content: item.content || "",
          type: item.type || "text",
          section: item.section || "general",
          isActive: item.isActive !== false,
          updatedAt: item.updatedAt,
          createdAt: item.createdAt,
        };
      });
      setContentItems(items);
    }
  }, [content]);

  // Filter content items based on search and section filter
  const filteredItems = contentItems.filter((item) => {
    const matchesSearch =
      item.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSection =
      filterSection === "all" || item.section === filterSection;

    return matchesSearch && matchesSection;
  });

  // function to handle edit content modal opening
  const handleEditClick = (item) => {
    setEditingContent(item);
    setEditForm({
      key: item.key,
      title: item.title,
      content: item.content,
      type: item.type,
      section: item.section,
    });
    setIsEditModalOpen(true);
  };

  // function to handle delete content modal opening
  const handleDeleteClick = (item) => {
    setDeletingContent(item);
    setIsDeleteModalOpen(true);
  };

  // function to handle add content modal opening
  const handleAddClick = () => {
    setEditingContent(null);
    setAddForm({
      key: "",
      title: "",
      content: "",
      type: "text",
      section: "general",
    });
    setIsAddModalOpen(true);
  };

  // function to handle form change for edit form
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // function to handle form change for add form
  const handleAddFormChange = (e) => {
    const { name, value } = e.target;
    setAddForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // function to handle save content (edit) using API call from context
  const handleSave = async () => {
    if (!editForm.key.trim()) {
      toast.error("Content key is required");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await updateContent(editingContent.key, {
        key: editForm.key,
        title: editForm.title,
        content: editForm.content,
        type: editForm.type,
        section: editForm.section,
      });

      if (result.success) {
        toast.success("Content updated successfully!");
        setIsEditModalOpen(false);
        setEditingContent(null);
        // Refresh content list
        loadContent();
      } else {
        toast.error(result.error || "Failed to update content");
      }
    } catch (error) {
      console.error("Error updating content:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  // function to handle add content using API call from context
  const handleAdd = async () => {
    if (!addForm.key.trim()) {
      toast.error("Content key is required");
      return;
    }
    if (!addForm.title.trim()) {
      toast.error("Content title is required");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await createContent({
        key: addForm.key,
        title: addForm.title,
        content: addForm.content,
        type: addForm.type,
        section: addForm.section,
      });

      if (result.success) {
        toast.success("Content created successfully!");
        setIsAddModalOpen(false);
        // Refresh content list
        loadContent();
      } else {
        toast.error(result.error || "Failed to create content");
      }
    } catch (error) {
      console.error("Error creating content:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  // function to handle delete content using API call from context
  const handleDelete = async () => {
    if (!deletingContent) return;

    setIsSubmitting(true);
    try {
      const result = await deleteContent(deletingContent.key);

      if (result.success) {
        toast.success("Content deleted successfully!");
        setIsDeleteModalOpen(false);
        setDeletingContent(null);
        // Refresh content list
        loadContent();
      } else {
        toast.error(result.error || "Failed to delete content");
      }
    } catch (error) {
      console.error("Error deleting content:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  // function to format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // function to truncate content for display
  const truncateContent = (text, maxLength = 100) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  // if content management page is slow display loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading content..." />
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
                Content Management
              </h1>
              <p className="text-gray-600">Manage website content and text</p>
            </div>
          </div>
          <Button
            onClick={handleAddClick}
            className="flex items-center space-x-2"
          >
            <span>+</span>
            <span>Add Content</span>
          </Button>
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

        {/* Search and Filter Controls */}
        <Card className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Search Content"
              placeholder="Search by key, title, or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Section
              </label>
              <select
                value={filterSection}
                onChange={(e) => setFilterSection(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {sections.map((section) => (
                  <option key={section.value} value={section.value}>
                    {section.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredItems.length} of {contentItems.length} content
            items
          </div>
        </Card>

        {/* Content Items List */}
        {filteredItems.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {contentItems.length === 0
                  ? "No Content Found"
                  : "No Matching Content"}
              </h3>
              <p className="text-gray-600 mb-6">
                {contentItems.length === 0
                  ? "Get started by adding your first content item"
                  : "Try adjusting your search or filter criteria"}
              </p>
              {contentItems.length === 0 && (
                <Button onClick={handleAddClick}>
                  Add Your First Content Item
                </Button>
              )}
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.key}>
                <div className="flex flex-col h-full">
                  {/* Content Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="badge badge-blue text-xs">
                        {item.section || "general"}
                      </span>
                      <span className="badge badge-gray text-xs">
                        {item.type || "text"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span
                        className={`w-3 h-3 rounded-full ${
                          item.isActive ? "bg-green-400" : "bg-red-400"
                        }`}
                      ></span>
                    </div>
                  </div>

                  {/* Content Details */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>

                    <div className="text-sm text-gray-500 mb-3">
                      <strong>Key:</strong> {item.key}
                    </div>

                    <div className="text-gray-600 mb-4">
                      {truncateContent(item.content)}
                    </div>

                    <div className="text-xs text-gray-500 space-y-1">
                      {item.updatedAt && (
                        <div>
                          <strong>Updated:</strong> {formatDate(item.updatedAt)}
                        </div>
                      )}
                      {item.createdAt && (
                        <div>
                          <strong>Created:</strong> {formatDate(item.createdAt)}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditClick(item)}
                      className="flex-1"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteClick(item)}
                      className="text-red-600 border-red-300 hover:bg-red-50"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Edit Content Modal */}
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingContent(null);
          }}
          title="Edit Content"
          size="lg"
        >
          <div className="space-y-6">
            <Input
              label="Content Key *"
              name="key"
              value={editForm.key}
              onChange={handleEditFormChange}
              placeholder="unique-content-key"
              required
              disabled={true} // Don't allow key changes during edit
            />

            <Input
              label="Title *"
              name="title"
              value={editForm.title}
              onChange={handleEditFormChange}
              placeholder="Content Title"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content Type
                </label>
                <select
                  name="type"
                  value={editForm.type}
                  onChange={handleEditFormChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {contentTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section
                </label>
                <select
                  name="section"
                  value={editForm.section}
                  onChange={handleEditFormChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {sections
                    .filter((s) => s.value !== "all")
                    .map((section) => (
                      <option key={section.value} value={section.value}>
                        {section.label}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              <textarea
                name="content"
                value={editForm.content}
                onChange={handleEditFormChange}
                rows="8"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter content..."
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <Button
              variant="outline"
              onClick={() => {
                setIsEditModalOpen(false);
                setEditingContent(null);
              }}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSubmitting}
              className="flex items-center space-x-2"
            >
              {isSubmitting && <LoadingSpinner size="sm" />}
              <span>{isSubmitting ? "Saving..." : "Save Changes"}</span>
            </Button>
          </div>
        </Modal>

        {/* Add Content Modal */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add New Content"
          size="lg"
        >
          <div className="space-y-6">
            <Input
              label="Content Key *"
              name="key"
              value={addForm.key}
              onChange={handleAddFormChange}
              placeholder="unique-content-key (e.g., hero-title)"
              required
            />

            <Input
              label="Title *"
              name="title"
              value={addForm.title}
              onChange={handleAddFormChange}
              placeholder="Content Title"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content Type
                </label>
                <select
                  name="type"
                  value={addForm.type}
                  onChange={handleAddFormChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {contentTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section
                </label>
                <select
                  name="section"
                  value={addForm.section}
                  onChange={handleAddFormChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {sections
                    .filter((s) => s.value !== "all")
                    .map((section) => (
                      <option key={section.value} value={section.value}>
                        {section.label}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              <textarea
                name="content"
                value={addForm.content}
                onChange={handleAddFormChange}
                rows="8"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter content..."
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <Button
              variant="outline"
              onClick={() => setIsAddModalOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAdd}
              disabled={isSubmitting}
              className="flex items-center space-x-2"
            >
              {isSubmitting && <LoadingSpinner size="sm" />}
              <span>{isSubmitting ? "Creating..." : "Create Content"}</span>
            </Button>
          </div>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setDeletingContent(null);
          }}
          title="Delete Content"
        >
          <div className="text-center">
            <div className="text-red-600 text-6xl mb-4">⚠️</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Are you sure you want to delete this content?
            </h3>
            {deletingContent && (
              <p className="text-gray-600 mb-6">
                This will permanently delete the content item "
                {deletingContent.title}" with key "{deletingContent.key}". This
                action cannot be undone.
              </p>
            )}
          </div>

          <div className="flex justify-center space-x-4 mt-8">
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setDeletingContent(null);
              }}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={isSubmitting}
              className="bg-red-600 hover:bg-red-700 text-white flex items-center space-x-2"
            >
              {isSubmitting && <LoadingSpinner size="sm" />}
              <span>{isSubmitting ? "Deleting..." : "Delete Content"}</span>
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ContentManagement;
