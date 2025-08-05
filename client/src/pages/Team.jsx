import React, { useEffect } from 'react';
import { useContent } from '../contexts/ContentContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Card from '../components/common/Card';

const Team = () => {
    const { team, fetchTeam, loading } = useContent();

    useEffect(() => {
        fetchTeam();
    }, [fetchTeam]);

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
                            Meet the dedicated researchers and experts driving innovation in fluid mechanics
                        </p>
                    </div>
                </div>
            </section>

            {/* Team Members Section */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    {team.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-xl text-gray-600">No team members found.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {team.map((member) => (
                                <Card key={member._id} hover>
                                    <div className="text-center">
                                        {/* Profile Image */}
                                        <div className="mb-6">
                                            {member.image ? (
                                                <img
                                                    src={member.image}
                                                    alt={member.name}
                                                    className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg"
                                                />
                                            ) : (
                                                <div className="w-32 h-32 rounded-full mx-auto bg-gray-200 flex items-center justify-center shadow-lg">
                                                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>

                                        {/* Member Info */}
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                            {member.name}
                                        </h3>
                                        <p className="text-blue-600 font-medium mb-4">
                                            {member.position}
                                        </p>
                                        <p className="text-gray-600 mb-6 text-sm">
                                            {member.bio}
                                        </p>

                                        {/* Expertise Tags */}
                                        {member.expertise && member.expertise.length > 0 && (
                                            <div className="mb-6">
                                                <div className="flex flex-wrap gap-2 justify-center">
                                                    {member.expertise.map((skill, index) => (
                                                        <span
                                                            key={index}
                                                            className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Contact & Social Links */}
                                        <div className="space-y-3">
                                            {member.email && (
                                                <div className="flex items-center justify-center space-x-2 text-gray-600">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                    <a 
                                                        href={`mailto:${member.email}`}
                                                        className="text-sm hover:text-blue-600 transition-colors duration-200"
                                                    >
                                                        {member.email}
                                                    </a>
                                                </div>
                                            )}

                                            {member.phone && (
                                                <div className="flex items-center justify-center space-x-2 text-gray-600">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                    </svg>
                                                    <span className="text-sm">{member.phone}</span>
                                                </div>
                                            )}

                                            {/* Social Links */}
                                            {member.socialLinks && (
                                                <div className="flex justify-center space-x-4 pt-2">
                                                    {member.socialLinks.linkedin && (
                                                        <a
                                                            href={member.socialLinks.linkedin}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                                                            aria-label="LinkedIn"
                                                        >
                                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                                            </svg>
                                                        </a>
                                                    )}

                                                    {member.socialLinks.twitter && (
                                                        <a
                                                            href={member.socialLinks.twitter}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                                                            aria-label="Twitter"
                                                        >
                                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                                                            </svg>
                                                        </a>
                                                    )}

                                                    {member.socialLinks.researchGate && (
                                                        <a
                                                            href={member.socialLinks.researchGate}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                                                            aria-label="ResearchGate"
                                                        >
                                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.966.936-1.213 1.677-.066.199-.115.398-.147.579-.034.189-.051.369-.051.529 0 .142.017.293.051.441.033.147.08.298.147.447.132.298.33.558.59.792.26.235.577.417.935.545.357.129.747.193 1.161.193.315 0 .621-.033.916-.098.297-.066.579-.157.844-.274.264-.117.513-.258.744-.421.23-.164.44-.343.627-.538.188-.194.348-.4.479-.617.132-.216.236-.438.31-.665.076-.226.113-.447.113-.664 0-.132-.017-.264-.051-.396-.033-.132-.08-.264-.147-.396-.132-.264-.33-.513-.59-.744-.26-.23-.577-.413-.935-.545-.357-.132-.747-.198-1.161-.198z"/>
                                                            </svg>
                                                        </a>
                                                    )}

                                                    {member.socialLinks.orcid && (
                                                        <a
                                                            href={member.socialLinks.orcid}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                                                            aria-label="ORCID"
                                                        >
                                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947 0 .525-.422.947-.947.947-.525 0-.946-.422-.946-.947 0-.525.421-.947.946-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416zm1.444 1.303v7.444h2.297c2.359 0 3.925-1.303 3.925-3.722 0-2.413-1.566-3.722-3.925-3.722h-2.297z"/>
                                                            </svg>
                                                        </a>
                                                    )}

                                                    {member.socialLinks.googleScholar && (
                                                        <a
                                                            href={member.socialLinks.googleScholar}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                                                            aria-label="Google Scholar"
                                                        >
                                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 100 14 7 7 0 000-14z"/>
                                                            </svg>
                                                        </a>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Team;