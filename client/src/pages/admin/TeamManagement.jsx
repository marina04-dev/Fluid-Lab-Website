// client/src/pages/admin/TeamManagement.jsx
import React, { useState, useEffect } from "react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Modal from "../../components/common/Modal";
import BackButton from "../../components/common/BackButton";
import toast from "react-hot-toast";

const TeamManagement = () => {
  // state variables to handle team members display
  const [teamMembers, setTeamMembers] = useState([]);
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

  // Mock data για demo
  useEffect(() => {
    const mockMembers = [
      {
        id: 1,
        name: "Dr. Maria Papadakis",
        position: "Principal Investigator",
        email: "maria@fluidlab.com",
        expertise: "Computational Fluid Dynamics, Turbulence Modeling",
        bio: "Leading expert in CFD with over 15 years of experience in fluid mechanics research.",
        image:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
        isActive: true,
        createdAt: "2023-01-15",
      },
      {
        id: 2,
        name: "Dr. Nikos Georgiadis",
        position: "Senior Researcher",
        email: "nikos@fluidlab.com",
        expertise: "Experimental Methods, Heat Transfer",
        bio: "Specializes in experimental fluid mechanics and advanced measurement techniques.",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
        isActive: true,
        createdAt: "2023-02-20",
      },
      {
        id: 3,
        name: "Dr. Anna Christou",
        position: "Research Fellow",
        email: "anna@fluidlab.com",
        expertise: "Multiphase Flow, Bioengineering",
        bio: "Focuses on biomedical applications of fluid mechanics and multiphase flow phenomena.",
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
        isActive: true,
        createdAt: "2023-03-10",
      },
    ];
    setTeamMembers(mockMembers);
  }, []);

  // function to handle form inputs
  const handleFormChange = (e) => {
    // get the name, value, type, checked from event
    const { name, value, type, checked } = e.target;
    // provide the data in the setter function
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // TODO: the above functions need to be implemented to do api calls to get real data
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
    setIsAddModalOpen(true);
  };

  // TODO: the above functions need to be implemented to do api calls to get real data
  const handleEditMember = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      position: member.position,
      email: member.email,
      expertise: member.expertise,
      bio: member.bio,
      image: member.image,
      isActive: member.isActive,
    });
    setIsEditModalOpen(true);
  };

  // TODO: the above functions need to be implemented to do api calls to get real data
  const handleSaveMember = () => {
    if (editingMember) {
      // Update existing member
      setTeamMembers((prev) =>
        prev.map((member) =>
          member.id === editingMember.id ? { ...member, ...formData } : member
        )
      );
      toast.success("Team member updated successfully!");
      setIsEditModalOpen(false);
    } else {
      // Add new member
      const newMember = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setTeamMembers((prev) => [...prev, newMember]);
      toast.success("New team member added successfully!");
      setIsAddModalOpen(false);
    }
    setEditingMember(null);
  };

  // TODO: the above functions need to be implemented to do api calls to get real data
  const handleDeleteMember = (id) => {
    if (window.confirm("Are you sure you want to delete this team member?")) {
      setTeamMembers((prev) => prev.filter((member) => member.id !== id));
      toast.success("Team member deleted successfully!");
    }
  };

  // TODO: the above functions need to be implemented to do api calls to get real data
  const handleToggleStatus = (id) => {
    setTeamMembers((prev) =>
      prev.map((member) =>
        member.id === id ? { ...member, isActive: !member.isActive } : member
      )
    );
    toast.success("Member status updated!");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-4 mb-2">
            <BackButton variant="back" text="Back to Dashboard" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
          <p className="text-gray-600 mt-2">Manage team members and profiles</p>
        </div>
        <Button onClick={handleAddMember}>
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
          Add Team Member
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {teamMembers.length}
            </div>
            <div className="text-sm text-gray-600">Total Members</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {teamMembers.filter((m) => m.isActive).length}
            </div>
            <div className="text-sm text-gray-600">Active Members</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">
              {teamMembers.filter((m) => !m.isActive).length}
            </div>
            <div className="text-sm text-gray-600">Inactive Members</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {teamMembers.filter((m) => m.position.includes("Dr.")).length}
            </div>
            <div className="text-sm text-gray-600">PhD Holders</div>
          </div>
        </Card>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <Card key={member.id}>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <img
                  src={member.image || "https://via.placeholder.com/60"}
                  alt={member.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div
                  className={`w-4 h-4 rounded-full border-2 border-white -mt-3 ml-12 ${
                    member.isActive ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{member.position}</p>
                <p className="text-xs text-gray-500 mb-3">{member.email}</p>
                <p className="text-sm text-gray-700 line-clamp-2">
                  {member.bio}
                </p>
                <div className="mt-4 flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditMember(member)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant={member.isActive ? "outline" : "secondary"}
                    onClick={() => handleToggleStatus(member.id)}
                  >
                    {member.isActive ? "Deactivate" : "Activate"}
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDeleteMember(member.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add/Edit Member Modal */}
      <Modal
        isOpen={isAddModalOpen || isEditModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setIsEditModalOpen(false);
          setEditingMember(null);
        }}
        title={editingMember ? "Edit Team Member" : "Add Team Member"}
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              required
            />
            <Input
              label="Position"
              name="position"
              value={formData.position}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleFormChange}
              required
            />
            <Input
              label="Image URL"
              name="image"
              value={formData.image}
              onChange={handleFormChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <Input
            label="Expertise"
            name="expertise"
            value={formData.expertise}
            onChange={handleFormChange}
            placeholder="e.g., Computational Fluid Dynamics, Heat Transfer"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleFormChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Brief biography..."
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleFormChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 text-sm text-gray-700">Active member</label>
          </div>
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => {
                setIsAddModalOpen(false);
                setIsEditModalOpen(false);
                setEditingMember(null);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveMember}>
              {editingMember ? "Update Member" : "Add Member"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TeamManagement;
