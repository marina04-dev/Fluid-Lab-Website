// client/src/pages/admin/ContentManagement.jsx
import React, { useState, useEffect } from "react";
import { useContent } from "../../contexts/ContentContext";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Modal from "../../components/common/Modal";
import BackButton from "../../components/common/BackButton";
import toast from "react-hot-toast";

const ContentManagement = () => {
  const { getContent, updateContent, loading } = useContent();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingContent, setEditingContent] = useState(null);
  const [editForm, setEditForm] = useState({ key: "", value: "" });
  const [contentItems, setContentItems] = useState([]);

  // Προκαθορισμένα content items
  const predefinedContent = [
    {
      key: "hero-title",
      label: "Hero Title",
      defaultValue: "Advanced Fluid Mechanics Research",
    },
    {
      key: "hero-subtitle",
      label: "Hero Subtitle",
      defaultValue: "Leading the Future of Fluid Dynamics",
    },
    {
      key: "hero-description",
      label: "Hero Description",
      defaultValue:
        "Our research team offers efficient research and consulting services in many aspects of Fluid Flow, Hydraulics and Convective Heat Transfer.",
    },
    {
      key: "about-title",
      label: "About Title",
      defaultValue: "About Our Research",
    },
    {
      key: "about-description",
      label: "About Description",
      defaultValue:
        "We are a leading research team specializing in fluid mechanics...",
    },
    {
      key: "footer-description",
      label: "Footer Description",
      defaultValue:
        "Leading research in fluid mechanics and computational fluid dynamics. Advancing the future of flow analysis and simulation.",
    },
    {
      key: "contact-info",
      label: "Contact Information",
      defaultValue: "Get in touch with our research team",
    },
    {
      key: "team-intro",
      label: "Team Introduction",
      defaultValue: "Meet our expert research team",
    },
  ];

  useEffect(() => {
    // Φόρτωση όλων των content items
    const items = predefinedContent.map((item) => ({
      ...item,
      currentValue: getContent(item.key, item.defaultValue),
    }));
    setContentItems(items);
  }, []);

  const handleEditClick = (item) => {
    setEditingContent(item);
    setEditForm({
      key: item.key,
      value: item.currentValue,
    });
    setIsEditModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      // Εδώ θα καλούσατε το updateContent API
      // await updateContent(editForm.key, editForm.value);

      // Για τώρα, απλώς ενημερώνουμε το local state
      setContentItems((prev) =>
        prev.map((item) =>
          item.key === editForm.key
            ? { ...item, currentValue: editForm.value }
            : item
        )
      );

      toast.success("Content updated successfully!");
      setIsEditModalOpen(false);
    } catch (error) {
      toast.error("Failed to update content");
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
            Content Management
          </h1>
          <p className="text-gray-600 mt-2">Manage website content and text</p>
        </div>
        <Button onClick={() => toast.success("Content saved!")}>
          Save All Changes
        </Button>
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
                <p className="text-sm text-gray-500 mt-1">Key: {item.key}</p>
              </div>
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
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 leading-relaxed">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {contentItems.length}
            </div>
            <div className="text-sm text-gray-600">Total Content Items</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {
                contentItems.filter(
                  (item) => item.currentValue !== item.defaultValue
                ).length
              }
            </div>
            <div className="text-sm text-gray-600">Customized Items</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {
                contentItems.filter(
                  (item) => item.currentValue === item.defaultValue
                ).length
              }
            </div>
            <div className="text-sm text-gray-600">Default Items</div>
          </div>
        </div>
      </Card>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={`Edit ${editingContent?.label}`}
        size="lg"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content Key
            </label>
            <Input
              name="key"
              value={editForm.key}
              onChange={handleFormChange}
              disabled
              className="bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content Value
            </label>
            <textarea
              name="value"
              value={editForm.value}
              onChange={handleFormChange}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical"
              placeholder="Enter content text..."
            />
          </div>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ContentManagement;
