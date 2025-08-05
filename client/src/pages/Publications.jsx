import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../contexts/ContentContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Card from '../components/common/Card';

const Publications = () => {
    const { publications, fetchPublications, loading } = useContent();
    const [selectedYear, setSelectedYear] = useState('all');
    const [selectedType, setSelectedType] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const types = [
        { value: 'all', label: 'All Types' },
        { value: 'journal', label: 'Journal Articles' },
        { value: 'conference', label: 'Conference Papers' },
        { value: 'book', label: 'Books' },
        { value: 'thesis', label: 'Theses' },
        { value: 'preprint', label: 'Preprints' }
    ];

    useEffect(() => {
        const filters = {};
        if (selectedYear !== 'all') filters.year = parseInt(selectedYear);
        if (selectedType !== 'all') filters.type = selectedType;
        
        fetchPublications(filters);
    }, [selectedYear, selectedType, fetchPublications]);

    const availableYears = [...new Set(publications.map(pub => pub.year))].sort((a, b) => b - a);

    const filteredPublications = publications.filter(publication => {
        if (!searchTerm) return true;
        
        const searchLower = searchTerm.toLowerCase();
        return (
            publication.title.toLowerCase().includes(searchLower) ||
            publication.authors.some(author => author.toLowerCase().includes(searchLower)) ||
            (publication.journal && publication.journal.toLowerCase().includes(searchLower)) ||
            (publication.abstract && publication.abstract.toLowerCase().includes(searchLower))
        );
    });

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="lg" text="Loading publications..." />
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {/* Header Section */}
            <section className="pt-24 pb-16 gradient-bg">
                <div className="container-custom">
                    <div className="text-center text-white">
                        <h1 className="text-5xl font-bold mb-6">Publications</h1>
                        <p className="text-xl opacity-90 max-w-3xl mx-auto">
                            Explore our research contributions and academic publications in fluid mechanics
                        </p>
                    </div>
                </div>
            </section>

            {/* Search and Filters */}
            <section className="py-8 bg-white border-b">
                <div className="container-custom">
                    <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                            {/* Search */}
                            <div className="min-w-0 flex-1 lg:min-w-80">
                                <input
                                    type="text"
                                    placeholder="Search publications..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Year Filter */}
                            <div className="min-w-0 flex-1 lg:min-w-32">
                                <select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="all">All Years</option>
                                    {availableYears.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Type Filter */}
                            <div className="min-w-0 flex-1 lg:min-w-48">
                                <select
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    {types.map((type) => (
                                        <option key={type.value} value={type.value}>
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="text-sm text-gray-600">
                            {filteredPublications.length} publication{filteredPublications.length !== 1 ? 's' : ''} found
                        </div>
                    </div>
                </div>
            </section>

            {/* Publications List */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom">
                    {filteredPublications.length === 0 ? (
                        <div className="text-center py-16">
                            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No publications found</h3>
                            <p className="text-gray-600">Try adjusting your search or filters.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {filteredPublications.map((publication) => (
                                <Card key={publication._id} hover>
                                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                                                    {publication.type.charAt(0).toUpperCase() + publication.type.slice(1)}
                                                </span>
                                                <span className="text-gray-500 text-sm">{publication.year}</span>
                                            </div>

                                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                                <Link 
                                                    to={`/publications/${publication._id}`}
                                                    className="hover:text-blue-600 transition-colors duration-200"
                                                >
                                                    {publication.title}
                                                </Link>
                                            </h3>

                                            <p className="text-gray-700 mb-2 font-medium">
                                                {publication.authors.join(', ')}
                                            </p>

                                            {publication.journal && (
                                                <p className="text-gray-600 mb-3">
                                                    <span className="font-medium">{publication.journal}</span>
                                                    {publication.volume && ` • Vol. ${publication.volume}`}
                                                    {publication.issue && ` • Issue ${publication.issue}`}
                                                    {publication.pages && ` • pp. ${publication.pages}`}
                                                </p>
                                            )}

                                            {publication.abstract && (
                                                <p className="text-gray-600 mb-4">
                                                    {publication.abstract.length > 200 
                                                        ? `${publication.abstract.substring(0, 200)}...` 
                                                        : publication.abstract
                                                    }
                                                </p>
                                            )}

                                            {publication.tags && publication.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {publication.tags.map((tag, index) => (
                                                        <span
                                                            key={index}
                                                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            <div className="flex flex-wrap gap-4 text-sm">
                                                <Link
                                                    to={`/publications/${publication._id}`}
                                                    className="text-blue-600 hover:text-blue-700 font-medium"
                                                >
                                                    View Details →
                                                </Link>
                                                {publication.doi && (
                                                    <a
                                                        href={`https://doi.org/${publication.doi}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:text-blue-700"
                                                    >
                                                        DOI
                                                    </a>
                                                )}
                                                {publication.url && (
                                                    <a
                                                        href={publication.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:text-blue-700"
                                                    >
                                                        Full Text
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        <div className="lg:text-right lg:min-w-0 lg:flex-shrink-0">
                                            <div className="text-2xl font-bold text-blue-600 mb-1">
                                                {publication.year}
                                            </div>
                                            {publication.projects && publication.projects.length > 0 && (
                                                <div className="text-sm text-gray-500">
                                                    Related to {publication.projects.length} project{publication.projects.length !== 1 ? 's' : ''}
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

export default Publications;