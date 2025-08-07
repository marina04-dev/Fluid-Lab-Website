// client/src/pages/admin/ContentManagement.jsx - FIXED VERSION με API integration
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
  const {
    fetchContent,
    getContent,
    updateContent,
    createContent,
    deleteContent,
    loading,
    error,
  } = useContent();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingContent, setEditingContent] = useState(null);
  const [deletingContent, setDeletingContent] = useState(null);
  const [editForm, setEditForm] = useState({
    key: "",
    title: "",
    content: "",
    type: "text",
    section: "general",
  });
  const [addForm, setAddForm] = useState({
    key: "",
    title: "",
    content: "",
    type: "text",
    section: "general",
  });
  const [contentItems, setContentItems] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Φόρτωση περιεχομένου κατά την εκκίνηση
  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      await fetchContent();
      // Αφού φορτωθεί το content, δημιουργούμε τη λίστα των items
      const defaultItems = [
        {
          key: "hero-title",
          label: "Hero Title",
          section: "hero",
          defaultValue: "Advanced Fluid Mechanics Research",
        },
        {
          key: "hero-subtitle",
          label: "Hero Subtitle",
          section: "hero",
          defaultValue: "Leading the Future of Fluid Dynamics",
        },
        {
          key: "hero-description",
          label: "Hero Description",
          section: "hero",
          defaultValue:
            "Our research team offers efficient research and consulting services in many aspects of Fluid Flow, Hydraulics and Convective Heat Transfer.",
        },
        {
          key: "about-title",
          label: "About Title",
          section: "about",
          defaultValue: "About Our Research",
        },
        {
          key: "about-description",
          label: "About Description",
          section: "about",
          defaultValue:
            "We are a leading research team specializing in fluid mechanics...",
        },
        {
          key: "footer-description",
          label: "Footer Description",
          section: "footer",
          defaultValue:
            "Leading research in fluid mechanics and computational fluid dynamics. Advancing the future of flow analysis and simulation.",
        },
        {
          key: "contact-info",
          label: "Contact Information",
          section: "general",
          defaultValue: "Get in touch with our research team",
        },
        {
          key: "team-intro",
          label: "Team Introduction",
          section: "general",
          defaultValue: "Meet our expert research team",
        },
      ];

      const items = defaultItems.map((item) => ({
        ...item,
        currentValue: getContent(item.key, item.defaultValue),
        isCustomized: getContent(item.key) !== "",
      }));

      setContentItems(items);
    } catch (error) {
      console.error("Error loading content:", error);
      toast.error("Failed to load content");
    }
  };

  const handleEditClick = (item) => {
    setEditingContent(item);
    setEditForm({
      key: item.key,
      title: item.label,
      content: item.currentValue || item.defaultValue,
      type: "text",
      section: item.section,
    });
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (item) => {
    setDeletingContent(item);
    setIsDeleteModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddFormChange = (e) => {
    const { name, value } = e.target;
    setAddForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
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
        await loadContent(); // Ανανεώνουμε τη λίστα
      } else {
        toast.error(result.error || "Failed to update content");
      }
    } catch (error) {
      console.error("Error updating content:", error);
      toast.error("Failed to update content");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddContent = async () => {
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
        setAddForm({
          key: "",
          title: "",
          content: "",
          type: "text",
          section: "general",
        });
        await loadContent(); // Ανανεώνουμε τη λίστα
      } else {
        toast.error(result.error || "Failed to create content");
      }
    } catch (error) {
      console.error("Error creating content:", error);
      toast.error("Failed to create content");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteContent = async () => {
    if (!deletingContent) return;

    setIsSubmitting(true);
    try {
      const result = await deleteContent(deletingContent.key);

      if (result.success) {
        toast.success("Content deleted successfully!");
        setIsDeleteModalOpen(false);
        setDeletingContent(null);
        await loadContent(); // Ανανεώνουμε τη λίστα
      } else {
        toast.error(result.error || "Failed to delete content");
      }
    } catch (error) {
      console.error("Error deleting content:", error);
      toast.error("Failed to delete content");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading && contentItems.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" text="Loading content..." />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-4 mb-2">
            <BackButton variant="back" text="Back to Dashboard" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Content Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage website content and text. Create, edit and organize your
            content.
          </p>
        </div>
        <div className="flex space-x-3">
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-green-600 hover:bg-green-700"
          >
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
            Add Content
          </Button>
          <Button onClick={() => toast.success("All changes saved!")}>
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
                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
              />
            </svg>
            Save All Changes
          </Button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {contentItems.map((item) => (
          <Card key={item.key}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.label}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <p className="text-sm text-gray-500">Key: {item.key}</p>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.isCustomized
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {item.isCustomized ? "Custom" : "Default"}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.section === "hero"
                        ? "bg-purple-100 text-purple-800"
                        : item.section === "about"
                        ? "bg-green-100 text-green-800"
                        : item.section === "footer"
                        ? "bg-orange-100 text-orange-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {item.section}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditClick(item)}
                  className="flex-shrink-0"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteClick(item)}
                  className="flex-shrink-0 text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Delete
                </Button>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 leading-relaxed line-clamp-4">
                {item.currentValue || item.defaultValue}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Statistics Card */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Content Statistics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {contentItems.length}
            </div>
            <div className="text-sm text-gray-600">Total Content Items</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {contentItems.filter((item) => item.isCustomized).length}
            </div>
            <div className="text-sm text-gray-600">Customized Items</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {contentItems.filter((item) => !item.isCustomized).length}
            </div>
            <div className="text-sm text-gray-600">Default Items</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {new Set(contentItems.map((item) => item.section)).size}
            </div>
            <div className="text-sm text-gray-600">Sections</div>
          </div>
        </div>
      </Card>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={`Edit: ${editingContent?.label}`}
        size="lg"
      >
        <div className="space-y-6">
          <Input
            label="Content Key"
            name="key"
            value={editForm.key}
            onChange={handleFormChange}
            disabled={true}
            className="bg-gray-50"
          />

          <Input
            label="Title"
            name="title"
            value={editForm.title}
            onChange={handleFormChange}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section
            </label>
            <select
              name="section"
              value={editForm.section}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="hero">Hero</option>
              <option value="about">About</option>
              <option value="services">Services</option>
              <option value="footer">Footer</option>
              <option value="general">General</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content Type
            </label>
            <select
              name="type"
              value={editForm.type}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="text">Text</option>
              <option value="html">HTML</option>
              <option value="markdown">Markdown</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content *
            </label>
            <textarea
              name="content"
              value={editForm.content}
              onChange={handleFormChange}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
              placeholder="Enter your content here..."
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsEditModalOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
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
            placeholder="e.g., hero-new-section"
            required
          />

          <Input
            label="Title *"
            name="title"
            value={addForm.title}
            onChange={handleAddFormChange}
            placeholder="e.g., New Hero Section"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section *
            </label>
            <select
              name="section"
              value={addForm.section}
              onChange={handleAddFormChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="general">General</option>
              <option value="hero">Hero</option>
              <option value="about">About</option>
              <option value="services">Services</option>
              <option value="footer">Footer</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content Type
            </label>
            <select
              name="type"
              value={addForm.type}
              onChange={handleAddFormChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="text">Text</option>
              <option value="html">HTML</option>
              <option value="markdown">Markdown</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content *
            </label>
            <textarea
              name="content"
              value={addForm.content}
              onChange={handleAddFormChange}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
              placeholder="Enter your content here..."
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsAddModalOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button onClick={handleAddContent} disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Content"}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Content"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete "
            <strong>{deletingContent?.label}</strong>"? This action cannot be
            undone.
          </p>
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Warning</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>
                    This will permanently remove this content item from your
                    website.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteContent}
              disabled={isSubmitting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isSubmitting ? "Deleting..." : "Delete Content"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ContentManagement;
