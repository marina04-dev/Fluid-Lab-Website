import React, { useState, useEffect } from "react";
import api from "../../services/api";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Modal from "../../components/common/Modal";
import BackButton from "../../components/common/BackButton";
import LoadingSpinner from "../../components/common/LoadingSpinner";
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
  // state variables to handle loading
  const [loading, setLoading] = useState(true);
  // state variables to handle error
  const [error, setError] = useState(null);
  // state variables to handle submit status
  const [isSubmitting, setIsSubmitting] = useState(false);
  // state variables for pagination
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
  });

  // status filter options
  const statusOptions = [
    { value: "all", label: "All Messages" },
    { value: "unread", label: "Unread" },
    { value: "read", label: "Read" },
    { value: "replied", label: "Replied" },
  ];

  // Load messages on component mount using API call
  useEffect(() => {
    fetchMessages();
  }, [filterStatus, pagination.currentPage]);

  // function to fetch messages from API
  const fetchMessages = async (page = 1) => {
    setLoading(true);
    setError(null);

    try {
      const params = {
        page,
        limit: 10,
      };

      // Add status filter if not 'all'
      if (filterStatus !== "all") {
        // Map frontend status to backend field
        if (filterStatus === "unread") {
          params.isRead = false;
        } else if (filterStatus === "read") {
          params.isRead = true;
        }
        // Note: 'replied' status would need additional backend logic
      }

      const response = await api.get("/contact/messages", { params });

      // Transform backend message format to frontend format
      const transformedMessages = response.data.messages.map((msg) => ({
        id: msg._id,
        name: msg.name,
        email: msg.email,
        subject: msg.subject,
        message: msg.message,
        status: msg.response ? "replied" : msg.isRead ? "read" : "unread",
        createdAt: msg.createdAt,
        response: msg.response,
        respondedAt: msg.respondedAt,
        respondedBy: msg.respondedBy?.username,
        isRead: msg.isRead,
      }));

      setMessages(transformedMessages);
      setPagination({
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
        total: response.data.total,
      });
    } catch (err) {
      console.error("Error fetching messages:", err);
      setError(err.response?.data?.message || "Failed to load messages");
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  // function to handle view message modal opening
  const handleViewMessage = async (message) => {
    setSelectedMessage(message);
    setIsViewModalOpen(true);

    // Mark as read if unread using API call
    if (message.status === "unread") {
      try {
        await api.put(`/contact/messages/${message.id}/read`);

        // Update local state
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === message.id
              ? {
                  ...msg,
                  status: msg.response ? "replied" : "read",
                  isRead: true,
                }
              : msg
          )
        );

        toast.success("Message marked as read");
      } catch (error) {
        console.error("Error marking message as read:", error);
        toast.error("Failed to mark message as read");
      }
    }
  };

  // function to handle reply message modal opening
  const handleReplyMessage = (message) => {
    setSelectedMessage(message);
    setReplyText(
      message.response ||
        `Dear ${
          message.name.split(" ")[0]
        },\n\nThank you for your inquiry regarding "${
          message.subject
        }".\n\n\n\nBest regards,\nFluid Lab Team`
    );
    setIsReplyModalOpen(true);
  };

  // function to handle send reply using API call
  const handleSendReply = async () => {
    if (!replyText.trim()) {
      toast.error("Please enter a response");
      return;
    }

    setIsSubmitting(true);
    try {
      await api.put(`/contact/messages/${selectedMessage.id}/respond`, {
        response: replyText,
      });

      // Update local state
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === selectedMessage.id
            ? {
                ...msg,
                status: "replied",
                response: replyText,
                respondedAt: new Date().toISOString(),
                isRead: true,
              }
            : msg
        )
      );

      toast.success("Reply sent successfully!");
      setIsReplyModalOpen(false);
      setReplyText("");
      setSelectedMessage(null);
    } catch (error) {
      console.error("Error sending reply:", error);
      toast.error(error.response?.data?.message || "Failed to send reply");
    } finally {
      setIsSubmitting(false);
    }
  };

  // function to handle delete message using API call
  const handleDeleteMessage = async (messageId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this message? This action cannot be undone."
      )
    ) {
      try {
        await api.delete(`/contact/messages/${messageId}`);

        // Remove from local state
        setMessages((prev) =>
          prev.filter((message) => message.id !== messageId)
        );

        toast.success("Message deleted successfully!");

        // Refresh the list to update pagination
        fetchMessages(pagination.currentPage);
      } catch (error) {
        console.error("Error deleting message:", error);
        toast.error(
          error.response?.data?.message || "Failed to delete message"
        );
      }
    }
  };

  // function to handle mark as read using API call
  const handleMarkAsRead = async (messageId) => {
    try {
      await api.put(`/contact/messages/${messageId}/read`);

      // Update local state
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId
            ? {
                ...msg,
                status: msg.response ? "replied" : "read",
                isRead: true,
              }
            : msg
        )
      );

      toast.success("Message marked as read!");
    } catch (error) {
      console.error("Error marking message as read:", error);
      toast.error("Failed to mark message as read");
    }
  };

  // function to handle mark as unread (would need backend support)
  const handleMarkAsUnread = async (messageId) => {
    // This would need additional backend endpoint to mark as unread
    toast.info("Mark as unread feature requires backend implementation");
  };

  // filter the messages based on the search terms (client-side filtering)
  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      searchTerm === "" ||
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  // function to get message status color
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

  // function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // function to truncate message for display
  const truncateMessage = (text, maxLength = 100) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  // if messages management page is slow display loading
  if (loading && messages.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading messages..." />
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
                Contact Messages
              </h1>
              <p className="text-gray-600">
                View and respond to contact messages
              </p>
            </div>
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
                onClick={() => setError(null)}
                className="text-red-600 hover:text-red-800"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {pagination.total}
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
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Search Messages"
              placeholder="Search by name, email, subject, or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => {
                  setFilterStatus(e.target.value);
                  setPagination((prev) => ({ ...prev, currentPage: 1 }));
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredMessages.length} of {messages.length} messages on
            this page
          </div>
        </Card>

        {/* Messages List */}
        {filteredMessages.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {messages.length === 0
                  ? "No Messages Found"
                  : "No Matching Messages"}
              </h3>
              <p className="text-gray-600 mb-6">
                {messages.length === 0
                  ? "No contact messages have been received yet."
                  : "Try adjusting your search or filter criteria."}
              </p>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredMessages.map((message) => (
              <Card key={message.id} hover>
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  {/* Message Info */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            message.status
                          )}`}
                        >
                          {message.status.charAt(0).toUpperCase() +
                            message.status.slice(1)}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatDate(message.createdAt)}
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {message.subject}
                    </h3>

                    <div className="text-sm text-gray-600 mb-2">
                      <strong>From:</strong> {message.name} ({message.email})
                    </div>

                    <p className="text-gray-600 mb-3">
                      {truncateMessage(message.message)}
                    </p>

                    {message.response && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                        <div className="text-sm text-green-800">
                          <strong>
                            Reply sent{" "}
                            {message.respondedAt &&
                              `on ${formatDate(message.respondedAt)}`}
                            :
                          </strong>
                        </div>
                        <p className="text-green-700 text-sm mt-1">
                          {truncateMessage(message.response, 150)}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 lg:w-40">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewMessage(message)}
                      className="w-full"
                    >
                      View
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReplyMessage(message)}
                      className="w-full"
                    >
                      {message.response ? "Edit Reply" : "Reply"}
                    </Button>

                    {message.status === "unread" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMarkAsRead(message.id)}
                        className="w-full"
                      >
                        Mark Read
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteMessage(message.id)}
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

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4 mt-8">
            <Button
              variant="outline"
              disabled={pagination.currentPage === 1 || loading}
              onClick={() => {
                const newPage = pagination.currentPage - 1;
                setPagination((prev) => ({ ...prev, currentPage: newPage }));
                fetchMessages(newPage);
              }}
            >
              Previous
            </Button>

            <span className="text-gray-600">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>

            <Button
              variant="outline"
              disabled={
                pagination.currentPage === pagination.totalPages || loading
              }
              onClick={() => {
                const newPage = pagination.currentPage + 1;
                setPagination((prev) => ({ ...prev, currentPage: newPage }));
                fetchMessages(newPage);
              }}
            >
              Next
            </Button>
          </div>
        )}

        {/* View Message Modal */}
        <Modal
          isOpen={isViewModalOpen}
          onClose={() => {
            setIsViewModalOpen(false);
            setSelectedMessage(null);
          }}
          title="Message Details"
          size="lg"
        >
          {selectedMessage && (
            <div className="space-y-6">
              {/* Message Header */}
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {selectedMessage.subject}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>From:</strong> {selectedMessage.name}
                  </div>
                  <div>
                    <strong>Email:</strong> {selectedMessage.email}
                  </div>
                  <div>
                    <strong>Date:</strong>{" "}
                    {formatDate(selectedMessage.createdAt)}
                  </div>
                  <div>
                    <strong>Status:</strong>
                    <span
                      className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        selectedMessage.status
                      )}`}
                    >
                      {selectedMessage.status.charAt(0).toUpperCase() +
                        selectedMessage.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Message:</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>

              {/* Reply Section */}
              {selectedMessage.response && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Reply:</h4>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-700 whitespace-pre-wrap">
                      {selectedMessage.response}
                    </p>
                    {selectedMessage.respondedAt && (
                      <div className="text-xs text-green-600 mt-2">
                        Sent on {formatDate(selectedMessage.respondedAt)}
                        {selectedMessage.respondedBy &&
                          ` by ${selectedMessage.respondedBy}`}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end space-x-4 mt-8">
            <Button
              variant="outline"
              onClick={() => {
                setIsViewModalOpen(false);
                setSelectedMessage(null);
              }}
            >
              Close
            </Button>
            {selectedMessage && (
              <Button
                onClick={() => {
                  setIsViewModalOpen(false);
                  handleReplyMessage(selectedMessage);
                }}
              >
                {selectedMessage.response ? "Edit Reply" : "Reply"}
              </Button>
            )}
          </div>
        </Modal>

        {/* Reply Modal */}
        <Modal
          isOpen={isReplyModalOpen}
          onClose={() => {
            setIsReplyModalOpen(false);
            setSelectedMessage(null);
            setReplyText("");
          }}
          title={selectedMessage?.response ? "Edit Reply" : "Reply to Message"}
          size="lg"
        >
          {selectedMessage && (
            <div className="space-y-6">
              {/* Message Reference */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-2">
                  <strong>Replying to:</strong> {selectedMessage.subject}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  <strong>From:</strong> {selectedMessage.name} (
                  {selectedMessage.email})
                </div>
                <div className="text-sm text-gray-700">
                  {truncateMessage(selectedMessage.message, 200)}
                </div>
              </div>

              {/* Reply Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Reply *
                </label>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows="10"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your reply..."
                  required
                />
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-4 mt-8">
            <Button
              variant="outline"
              onClick={() => {
                setIsReplyModalOpen(false);
                setSelectedMessage(null);
                setReplyText("");
              }}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSendReply}
              disabled={isSubmitting}
              className="flex items-center space-x-2"
            >
              {isSubmitting && <LoadingSpinner size="sm" />}
              <span>
                {isSubmitting
                  ? "Sending..."
                  : selectedMessage?.response
                  ? "Update Reply"
                  : "Send Reply"}
              </span>
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default MessageManagement;
