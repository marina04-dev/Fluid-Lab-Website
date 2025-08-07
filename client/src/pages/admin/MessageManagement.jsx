// client/src/pages/admin/MessageManagement.jsx
import React, { useState, useEffect } from "react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import BackButton from "../../components/common/BackButton";
import toast from "react-hot-toast";

const MessageManagement = () => {
  // state variables to handle messages display
  const [messages, setMessages] = useState([]);
  // state variables to selected message display
  const [selectedMessage, setSelectedMessage] = useState(null);
  // state variables to handle view message modal display
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  // state variables to handle reply message modal display
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  // state variables to handle reply text
  const [replyText, setReplyText] = useState("");
  // state variables to handle status filter
  const [filterStatus, setFilterStatus] = useState("all");
  // state variables to handle search term
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data για demo
  useEffect(() => {
    const mockMessages = [
      {
        id: 1,
        name: "John Smith",
        email: "john.smith@university.edu",
        subject: "Collaboration Opportunity - CFD Research",
        message:
          "Dear team,\n\nI am writing to inquire about potential collaboration opportunities in computational fluid dynamics research. Our research group at Stanford University is working on similar problems related to turbulent flow modeling, and I believe there could be synergies between our work.\n\nI would love to discuss this further at your convenience.\n\nBest regards,\nJohn Smith\nProfessor, Mechanical Engineering\nStanford University",
        status: "unread",
        priority: "high",
        category: "collaboration",
        createdAt: "2024-03-15T10:30:00Z",
        ipAddress: "192.168.1.100",
        userAgent:
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      },
      {
        id: 2,
        name: "Maria Rodriguez",
        email: "maria.r@techcorp.com",
        subject: "Consulting Services Inquiry",
        message:
          "Hello,\n\nWe are a technology company working on optimizing heat exchangers for our data centers. We are interested in your consulting services and would like to know more about your expertise in thermal analysis.\n\nCould you please provide information about your consulting rates and availability?\n\nThank you,\nMaria Rodriguez\nCTO, TechCorp Solutions",
        status: "read",
        priority: "medium",
        category: "consulting",
        createdAt: "2024-03-14T14:20:00Z",
        ipAddress: "10.0.0.50",
        userAgent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      {
        id: 3,
        name: "Ahmed Hassan",
        email: "ahmed.hassan@student.ac.uk",
        subject: "PhD Application - Research Opportunity",
        message:
          "Dear Professor,\n\nI am currently completing my Master's degree in Mechanical Engineering at Imperial College London, and I am very interested in pursuing a PhD under your supervision.\n\nMy research interests align closely with your work in biofluid mechanics, particularly in cardiovascular applications. I have attached my CV and would appreciate the opportunity to discuss potential research topics.\n\nSincerely,\nAhmed Hassan",
        status: "replied",
        priority: "medium",
        category: "academic",
        createdAt: "2024-03-13T09:15:00Z",
        ipAddress: "172.16.0.1",
        userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
        replyDate: "2024-03-14T16:30:00Z",
      },
      {
        id: 4,
        name: "Sarah Johnson",
        email: "sarah.j@aerospace.com",
        subject: "Technical Question - Turbomachinery Analysis",
        message:
          "Hi,\n\nI have a technical question regarding turbomachinery analysis. We are experiencing some unusual flow patterns in our compressor design and wondered if you have encountered similar issues.\n\nWould it be possible to schedule a brief call to discuss this?\n\nBest,\nSarah Johnson\nSenior Engineer, Aerospace Dynamics",
        status: "unread",
        priority: "low",
        category: "technical",
        createdAt: "2024-03-12T16:45:00Z",
        ipAddress: "203.0.113.45",
        userAgent:
          "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15",
      },
      {
        id: 5,
        name: "David Chen",
        email: "david.chen@research.org",
        subject: "Conference Invitation - Fluid Dynamics Symposium",
        message:
          'Dear Colleagues,\n\nOn behalf of the International Fluid Dynamics Research Organization, I would like to invite you to present your latest research at our annual symposium scheduled for September 2024.\n\nThe theme this year is "Advanced Computational Methods in Fluid Mechanics" which aligns perfectly with your expertise.\n\nPlease let me know if you would be interested.\n\nBest regards,\nDavid Chen\nConference Chair\nIFDRO',
        status: "read",
        priority: "high",
        category: "conference",
        createdAt: "2024-03-10T11:00:00Z",
        ipAddress: "198.51.100.25",
        userAgent:
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      },
    ];
    setMessages(mockMessages);
  }, []);

  // TODO: the above functions need to be implemented to do api calls to get real data
  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    setIsViewModalOpen(true);

    // Mark as read if unread
    if (message.status === "unread") {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === message.id ? { ...msg, status: "read" } : msg
        )
      );
    }
  };

  // TODO: the above functions need to be implemented to do api calls to get real data
  const handleReplyMessage = (message) => {
    setSelectedMessage(message);
    setReplyText(
      `Dear ${
        message.name.split(" ")[0]
      },\n\nThank you for your inquiry regarding "${
        message.subject
      }".\n\n\n\nBest regards,\nFluid Lab Team`
    );
    setIsReplyModalOpen(true);
  };

  // TODO: the above functions need to be implemented to do api calls to get real data
  const handleSendReply = () => {
    // Update message status to replied
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === selectedMessage.id
          ? { ...msg, status: "replied", replyDate: new Date().toISOString() }
          : msg
      )
    );
    toast.success("Reply sent successfully!");
    setIsReplyModalOpen(false);
    setReplyText("");
    setSelectedMessage(null);
  };

  // TODO: the above functions need to be implemented to do api calls to get real data
  const handleDeleteMessage = (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      setMessages((prev) => prev.filter((message) => message.id !== id));
      toast.success("Message deleted successfully!");
    }
  };

  // TODO: the above functions need to be implemented to do api calls to get real data
  const handleMarkAsRead = (id) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, status: "read" } : msg))
    );
    toast.success("Message marked as read!");
  };

  // TODO: the above functions need to be implemented to do api calls to get real data
  const handleMarkAsUnread = (id) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, status: "unread" } : msg))
    );
    toast.success("Message marked as unread!");
  };

  // filter the messages based on the search terms
  const filteredMessages = messages.filter((message) => {
    const matchesStatus =
      filterStatus === "all" || message.status === filterStatus;
    const matchesSearch =
      searchTerm === "" ||
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  // message status color
  const getStatusColor = (status) => {
    switch (status) {
      case "unread":
        return "bg-red-100 text-red-700";
      case "read":
        return "bg-blue-100 text-blue-700";
      case "replied":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // priority status color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  // format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-4 mb-2">
            <BackButton variant="back" text="Back to Dashboard" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Contact Messages</h1>
          <p className="text-gray-600 mt-2">
            View and respond to contact messages
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {messages.length}
            </div>
            <div className="text-sm text-gray-600">Total Messages</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {messages.filter((m) => m.status === "unread").length}
            </div>
            <div className="text-sm text-gray-600">Unread</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {messages.filter((m) => m.status === "read").length}
            </div>
            <div className="text-sm text-gray-600">Read</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {messages.filter((m) => m.status === "replied").length}
            </div>
            <div className="text-sm text-gray-600">Replied</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {messages.filter((m) => m.priority === "high").length}
            </div>
            <div className="text-sm text-gray-600">High Priority</div>
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="sm:w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Messages</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Messages Found
              </h3>
              <p className="text-gray-600">
                {searchTerm || filterStatus !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "No contact messages have been received yet."}
              </p>
            </div>
          </Card>
        ) : (
          filteredMessages.map((message) => (
            <Card
              key={message.id}
              className={
                message.status === "unread"
                  ? "border-l-4 border-l-blue-500"
                  : ""
              }
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {message.subject}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded text-xs ${getStatusColor(
                        message.status
                      )}`}
                    >
                      {message.status}
                    </span>
                    <div
                      className={`text-xs font-medium ${getPriorityColor(
                        message.priority
                      )}`}
                    >
                      ● {message.priority} priority
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                    <span>
                      <strong>From:</strong> {message.name}
                    </span>
                    <span>
                      <strong>Email:</strong> {message.email}
                    </span>
                    <span>
                      <strong>Category:</strong> {message.category}
                    </span>
                  </div>
                  <p className="text-gray-700 line-clamp-2 mb-3">
                    {message.message}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Received: {formatDate(message.createdAt)}</span>
                    {message.replyDate && (
                      <span>Replied: {formatDate(message.replyDate)}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleViewMessage(message)}
                  >
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleReplyMessage(message)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Reply
                  </Button>
                  <div className="relative group">
                    <Button size="sm" variant="outline" className="px-2">
                      ⋮
                    </Button>
                    <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-lg border py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                      {message.status === "unread" ? (
                        <button
                          onClick={() => handleMarkAsRead(message.id)}
                          className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Mark as Read
                        </button>
                      ) : (
                        <button
                          onClick={() => handleMarkAsUnread(message.id)}
                          className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Mark as Unread
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteMessage(message.id)}
                        className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* View Message Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Message Details"
        size="lg"
      >
        {selectedMessage && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>From:</strong> {selectedMessage.name}
                </div>
                <div>
                  <strong>Email:</strong> {selectedMessage.email}
                </div>
                <div>
                  <strong>Category:</strong> {selectedMessage.category}
                </div>
                <div>
                  <strong>Priority:</strong> {selectedMessage.priority}
                </div>
                <div>
                  <strong>Status:</strong>
                  <span
                    className={`ml-2 px-2 py-1 rounded text-xs ${getStatusColor(
                      selectedMessage.status
                    )}`}
                  >
                    {selectedMessage.status}
                  </span>
                </div>
                <div>
                  <strong>Received:</strong>{" "}
                  {formatDate(selectedMessage.createdAt)}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {selectedMessage.subject}
              </h3>
              <div className="bg-white border border-gray-200 p-4 rounded-lg">
                <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {selectedMessage.message}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-500">
              <div>
                <strong>IP Address:</strong> {selectedMessage.ipAddress}
              </div>
              <div>
                <strong>User Agent:</strong> {selectedMessage.userAgent}
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setIsViewModalOpen(false)}
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  setIsViewModalOpen(false);
                  handleReplyMessage(selectedMessage);
                }}
              >
                Reply
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Reply Modal */}
      <Modal
        isOpen={isReplyModalOpen}
        onClose={() => setIsReplyModalOpen(false)}
        title={`Reply to ${selectedMessage?.name}`}
        size="lg"
      >
        <div className="space-y-6">
          {selectedMessage && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm">
                <div className="mb-2">
                  <strong>To:</strong> {selectedMessage.email}
                </div>
                <div>
                  <strong>Subject:</strong> Re: {selectedMessage.subject}
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reply Message
            </label>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows={10}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Type your reply here..."
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setIsReplyModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSendReply}>Send Reply</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MessageManagement;
