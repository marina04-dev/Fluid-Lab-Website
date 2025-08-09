import React, { useState, useEffect } from "react";
import { useContent } from "../../contexts/ContentContext";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Modal from "../../components/common/Modal";
import BackButton from "../../components/common/BackButton";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import toast from "react-hot-toast";

const TeamManagement = () => {
  // get context's necessary variables/functions
  const {
    team,
    fetchTeam,
    createTeamMember,
    updateTeamMember,
    deleteTeamMember,
    loading,
    error,
    clearError,
  } = useContent();

  // state variables to handle add team member modal display
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  // state variables to handle edit team member modal display
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // state variables to handle editing team member
  const [editingMember, setEditingMember] = useState(null);
  // state variables to handle form data display
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    email: "",
    expertise: "",
    bio: "",
    image: "",
    isActive: true,
  });
  // state variable to track submitting status
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load team members on component mount using API call from context
  useEffect(() => {
    fetchTeam();
  }, [fetchTeam]);

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

  // function to handle add team member modal opening
  const handleAddMember = () => {
    setFormData({
      name: "",
      position: "",
      email: "",
      expertise: "",
      bio: "",
      image: "",
      isActive: true,
    });
    setEditingMember(null);
    setIsAddModalOpen(true);
  };

  // function to handle edit team member modal opening
  const handleEditMember = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name || "",
      position: member.position || "",
      email: member.email || "",
      expertise: Array.isArray(member.expertise)
        ? member.expertise.join(", ")
        : member.expertise || "",
      bio: member.bio || "",
      image: member.image || "",
      isActive: member.isActive !== undefined ? member.isActive : true,
    });
    setIsEditModalOpen(true);
  };

  // function to handle team member save (create or update) using API calls from context
  const handleSaveMember = async () => {
    // Basic validation
    if (!formData.name.trim()) {
      toast.error("Team member name is required");
      return;
    }
    if (!formData.position.trim()) {
      toast.error("Position is required");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
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
      // Prepare data for API
      const memberData = {
        ...formData,
        // Convert comma-separated expertise to array
        expertise: formData.expertise
          ? formData.expertise
              .split(",")
              .map((item) => item.trim())
              .filter((item) => item)
          : [],
      };

      let result;
      if (editingMember) {
        // Update existing team member using context function
        result = await updateTeamMember(editingMember._id, memberData);
      } else {
        // Create new team member using context function
        result = await createTeamMember(memberData);
      }

      if (result.success) {
        toast.success(
          editingMember
            ? "Team member updated successfully!"
            : "Team member created successfully!"
        );
        setIsEditModalOpen(false);
        setIsAddModalOpen(false);
        setEditingMember(null);
        // Refresh team list
        fetchTeam();
      } else {
        toast.error(result.error || "Failed to save team member");
      }
    } catch (error) {
      console.error("Error saving team member:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  // function to handle team member deletion using API call from context
  const handleDeleteMember = async (memberId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this team member? This action cannot be undone."
      )
    ) {
      try {
        const result = await deleteTeamMember(memberId);
        if (result.success) {
          toast.success("Team member deleted successfully!");
          // Refresh team list
          fetchTeam();
        } else {
          toast.error(result.error || "Failed to delete team member");
        }
      } catch (error) {
        console.error("Error deleting team member:", error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  // function to handle team member status toggle using API call from context
  const handleToggleStatus = async (member) => {
    try {
      const result = await updateTeamMember(member._id, {
        ...member,
        isActive: !member.isActive,
      });

      if (result.success) {
        toast.success("Member status updated!");
        // Refresh team list
        fetchTeam();
      } else {
        toast.error(result.error || "Failed to update member status");
      }
    } catch (error) {
      console.error("Error updating member status:", error);
      toast.error("An unexpected error occurred");
    }
  };

  // function to format expertise for display
  const formatExpertise = (expertise) => {
    if (Array.isArray(expertise)) {
      return expertise.join(", ");
    }
    return expertise || "";
  };

  // function to truncate text for display
  const truncateText = (text, maxLength = 100) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  // function to format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  // if team management page is slow display loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading team..." />
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
                Team Management
              </h1>
              <p className="text-gray-600">
                Manage team members and their information
              </p>
            </div>
          </div>
          <Button
            onClick={handleAddMember}
            className="flex items-center space-x-2"
          >
            <span>+</span>
            <span>Add Team Member</span>
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

        {/* Team Members List */}
        {team.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Team Members Found
              </h3>
              <p className="text-gray-600 mb-6">
                Get started by adding your first team member
              </p>
              <Button onClick={handleAddMember}>
                Add Your First Team Member
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <Card key={member._id}>
                <div className="flex flex-col h-full">
                  {/* Member Photo */}
                  <div className="text-center mb-4">
                    <div className="w-20 h-20 mx-auto mb-4">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full rounded-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextElementSibling.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <div
                        className={`w-full h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl ${
                          member.image ? "hidden" : "flex"
                        }`}
                      >
                        {member.name?.charAt(0)?.toUpperCase() || "?"}
                      </div>
                    </div>

                    {/* Status Indicator */}
                    <div className="flex items-center justify-center space-x-1 mb-2">
                      <span
                        className={`w-3 h-3 rounded-full ${
                          member.isActive ? "bg-green-400" : "bg-red-400"
                        }`}
                      ></span>
                      <span className="text-xs text-gray-500">
                        {member.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>

                  {/* Member Info */}
                  <div className="flex-1">
                    {/* Name */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 text-center">
                      {member.name}
                    </h3>

                    {/* Position */}
                    <p className="text-blue-600 font-medium mb-3 text-center">
                      {member.position}
                    </p>

                    {/* Email */}
                    {member.email && (
                      <div className="mb-3">
                        <span className="text-sm text-gray-500">Email:</span>
                        <p className="text-sm text-gray-900 break-words">
                          <a
                            href={`mailto:${member.email}`}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            {member.email}
                          </a>
                        </p>
                      </div>
                    )}

                    {/* Expertise */}
                    {member.expertise && member.expertise.length > 0 && (
                      <div className="mb-3">
                        <span className="text-sm text-gray-500">
                          Expertise:
                        </span>
                        <p className="text-sm text-gray-900">
                          {truncateText(formatExpertise(member.expertise), 80)}
                        </p>
                      </div>
                    )}

                    {/* Bio */}
                    {member.bio && (
                      <div className="mb-4">
                        <span className="text-sm text-gray-500">Bio:</span>
                        <p className="text-sm text-gray-900">
                          {truncateText(member.bio, 100)}
                        </p>
                      </div>
                    )}

                    {/* Created Date */}
                    <div className="mb-4">
                      <span className="text-sm text-gray-500">Joined:</span>
                      <p className="text-sm text-gray-900">
                        {formatDate(member.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditMember(member)}
                      className="flex-1 text-purple-600"
                    >
                      Edit
                    </Button>
                    <Button
                      variant={member.isActive ? "solid" : "outline"}
                      size="sm"
                      onClick={() => handleToggleStatus(member)}
                    >
                      {member.isActive ? "●" : "○"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteMember(member._id)}
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

        {/* Add/Edit Team Member Modal */}
        <Modal
          isOpen={isAddModalOpen || isEditModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            setIsEditModalOpen(false);
            setEditingMember(null);
          }}
          title={editingMember ? "Edit Team Member" : "Add New Team Member"}
          size="lg"
        >
          <div className="space-y-6">
            {/* Name */}
            <Input
              label="Full Name *"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              placeholder="Enter full name"
              required
            />

            {/* Position */}
            <Input
              label="Position *"
              name="position"
              value={formData.position}
              onChange={handleFormChange}
              placeholder="e.g., Professor, Research Associate, PhD Student"
              required
            />

            {/* Email */}
            <Input
              label="Email Address *"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleFormChange}
              placeholder="example@university.edu"
              required
            />

            {/* Expertise */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Areas of Expertise
              </label>
              <textarea
                name="expertise"
                value={formData.expertise}
                onChange={handleFormChange}
                rows="3"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter areas of expertise separated by commas (e.g., Fluid Dynamics, Computational Modeling, Heat Transfer)"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Biography
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleFormChange}
                rows="6"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter a brief biography and background information"
              />
            </div>

            {/* Image URL */}
            <Input
              label="Profile Image URL"
              name="image"
              type="url"
              value={formData.image}
              onChange={handleFormChange}
              placeholder="https://example.com/profile-image.jpg"
            />

            {/* Active Status */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleFormChange}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Active team member
              </span>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex justify-end space-x-4 mt-8">
            <Button
              variant="outline"
              onClick={() => {
                setIsAddModalOpen(false);
                setIsEditModalOpen(false);
                setEditingMember(null);
              }}
              disabled={isSubmitting}
              className="text-purple-600"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveMember}
              disabled={isSubmitting}
              className="flex items-center space-x-2"
            >
              {isSubmitting && <LoadingSpinner size="sm" />}
              <span>
                {isSubmitting
                  ? "Saving..."
                  : editingMember
                  ? "Update Member"
                  : "Add Member"}
              </span>
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default TeamManagement;
