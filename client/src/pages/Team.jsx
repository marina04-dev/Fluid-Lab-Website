import React, { useEffect } from "react";
import { useContent } from "../contexts/ContentContext";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Card from "../components/common/Card";

const Team = () => {
  // get context's necessary variables/functions
  const { team, fetchTeam, loading, error, clearError } = useContent();

  // execute the fetchTeam function each time the component gets loaded
  useEffect(() => {
    fetchTeam();
  }, [fetchTeam]);

  // Clear any existing errors on component mount
  useEffect(() => {
    clearError();
  }, [clearError]);

  // function to format expertise for display
  const formatExpertise = (expertise) => {
    if (!expertise) return "";
    if (Array.isArray(expertise)) {
      return expertise.join(", ");
    }
    return expertise;
  };

  // function to truncate text for card display
  const truncateText = (text, maxLength = 150) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  // if team display is slow display loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading team..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="pt-24 pb-16 gradient-bg">
        <div className="container-custom">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-6">Our Team</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Meet the dedicated researchers and experts driving innovation in
              fluid mechanics
            </p>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
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

          {/* If no team member is available or the team size is 0 */}
          {!team || team.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                No Team Members Found
              </h3>
              <p className="text-gray-600">
                Our team information is currently being updated. Please check
                back soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team
                .filter((member) => member.isActive !== false) // Only show active team members
                .map((member) => (
                  <Card key={member._id} hover>
                    <div className="text-center">
                      {/* Profile Image */}
                      <div className="mb-6">
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-32 h-32 mx-auto rounded-full object-cover shadow-lg"
                            onError={(e) => {
                              // If image fails to load, hide it and show initials
                              e.target.style.display = "none";
                              e.target.nextElementSibling.style.display =
                                "flex";
                            }}
                          />
                        ) : null}
                        {/* Fallback to initials if no image or image fails */}
                        <div
                          className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg ${
                            member.image ? "hidden" : "flex"
                          }`}
                        >
                          {member.name
                            ? member.name
                                .split(" ")
                                .map((n) => n.charAt(0))
                                .join("")
                                .substring(0, 2)
                                .toUpperCase()
                            : "??"}
                        </div>
                      </div>

                      {/* Member Name */}
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {member.name}
                      </h3>

                      {/* Member Position */}
                      <p className="text-blue-600 font-semibold mb-4">
                        {member.position}
                      </p>

                      {/* Member Bio */}
                      {member.bio && (
                        <p className="text-gray-600 mb-4 text-left">
                          {truncateText(member.bio)}
                        </p>
                      )}

                      {/* Areas of Expertise */}
                      {member.expertise && member.expertise.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-900 mb-2">
                            Areas of Expertise:
                          </h4>
                          <div className="flex flex-wrap gap-2 justify-center">
                            {(Array.isArray(member.expertise)
                              ? member.expertise
                              : member.expertise.split(",")
                            )
                              .slice(0, 4) // Show max 4 expertise areas
                              .map((area, index) => (
                                <span
                                  key={index}
                                  className="badge badge-blue text-xs"
                                >
                                  {area.trim()}
                                </span>
                              ))}
                            {(Array.isArray(member.expertise)
                              ? member.expertise
                              : member.expertise.split(",")
                            ).length > 4 && (
                              <span className="badge badge-gray text-xs">
                                +
                                {(Array.isArray(member.expertise)
                                  ? member.expertise
                                  : member.expertise.split(",")
                                ).length - 4}{" "}
                                more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Contact Information */}
                      <div className="space-y-2">
                        {member.email && (
                          <div>
                            <a
                              href={`mailto:${member.email}`}
                              className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                            >
                              {member.email}
                            </a>
                          </div>
                        )}

                        {/* Additional contact methods can be added here */}
                        {member.phone && (
                          <div>
                            <a
                              href={`tel:${member.phone}`}
                              className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                            >
                              {member.phone}
                            </a>
                          </div>
                        )}

                        {member.linkedIn && (
                          <div>
                            <a
                              href={member.linkedIn}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              LinkedIn Profile
                            </a>
                          </div>
                        )}

                        {member.website && (
                          <div>
                            <a
                              href={member.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              Personal Website
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          )}

          {/* Team Statistics */}
          {team && team.length > 0 && (
            <div className="mt-16 bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                Team Overview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {team.filter((member) => member.isActive !== false).length}
                  </div>
                  <div className="text-gray-600">Active Team Members</div>
                </div>

                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    {
                      team.filter(
                        (member) =>
                          member.position &&
                          (member.position
                            .toLowerCase()
                            .includes("professor") ||
                            member.position.toLowerCase().includes("dr.") ||
                            member.position.toLowerCase().includes("doctor"))
                      ).length
                    }
                  </div>
                  <div className="text-gray-600">Faculty Members</div>
                </div>

                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">
                    {
                      team.filter(
                        (member) =>
                          member.position &&
                          (member.position.toLowerCase().includes("student") ||
                            member.position.toLowerCase().includes("phd") ||
                            member.position.toLowerCase().includes("graduate"))
                      ).length
                    }
                  </div>
                  <div className="text-gray-600">Research Students</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Team;
