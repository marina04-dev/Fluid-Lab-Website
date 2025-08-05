import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../contexts/ContentContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const Home = () => {
    const { 
        getContent, 
        fetchContent, 
        fetchProjects, 
        fetchPublications,
        projects, 
        publications, 
        loading 
    } = useContent();

    useEffect(() => {
        fetchContent('hero');
        fetchContent('about');
        fetchProjects({ featured: true });
        fetchPublications();
    }, [fetchContent, fetchProjects, fetchPublications]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="lg" text="Loading..." />
            </div>
        );
    }

    const featuredProjects = projects.filter(project => project.isFeatured).slice(0, 3);
    const recentPublications = publications.slice(0, 3);

    const services = [
        {
            title: 'Computational Fluid Dynamics',
            description: 'Advanced CFD simulations and modeling for complex flow problems.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            title: 'Experimental Methods',
            description: 'Cutting-edge experimental techniques for flow visualization and measurement.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
            )
        },
        {
            title: 'Research Consulting',
            description: 'Expert consulting services for industrial and academic fluid mechanics challenges.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            )
        }
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center gradient-bg overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>

                <div className="container-custom relative z-10">
                    <div className="text-center text-white">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
                            {getContent('hero-title', 'Advanced Fluid Mechanics Research')}
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in-up animation-delay-200">
                            {getContent('hero-subtitle', 'Leading the Future of Fluid Dynamics')}
                        </p>
                        <p className="text-lg mb-12 max-w-3xl mx-auto opacity-80 animate-fade-in-up animation-delay-400">
                            {getContent('hero-description', 'Our research team offers efficient research and consulting services in many aspects of Fluid Flow, Hydraulics and Convective Heat Transfer.')}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600">
                            <Link to="/projects">
                                <Button size="lg" className="w-full sm:w-auto">
                                    Explore Projects
                                </Button>
                            </Link>
                            <Link to="/contact">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-blue-600">
                                    Get in Touch
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </section>

            {/* Services Section */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Our Expertise
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Comprehensive research and consulting services in fluid mechanics and computational dynamics
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <Card key={index} hover className="text-center">
                                <div className="text-blue-600 mb-4 flex justify-center">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600">
                                    {service.description}
                                </p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">
                                {getContent('about-title', 'About Our Research')}
                            </h2>
                            <p className="text-lg text-gray-600 mb-8">
                                {getContent('about-content', 'We specialize in cutting-edge research in fluid mechanics, combining theoretical knowledge with practical applications.')}
                            </p>
                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div>
                                    <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
                                    <div className="text-gray-600">Years Experience</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-blue-600 mb-2">100+</div>
                                    <div className="text-gray-600">Projects Completed</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                                    <div className="text-gray-600">Publications</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-blue-600 mb-2">10+</div>
                                    <div className="text-gray-600">Team Members</div>
                                </div>
                            </div>
                            <Link to="/about">
                                <Button>Learn More</Button>
                            </Link>
                        </div>
                        <div className="relative">
                            <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden">
                                <img
                                    src="/api/placeholder/600/400"
                                    alt="Research Laboratory"
                                    className="object-cover w-full h-96 rounded-lg shadow-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Projects Section */}
            {featuredProjects.length > 0 && (
                <section className="section-padding bg-white">
                    <div className="container-custom">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                Featured Projects
                            </h2>
                            <p className="text-xl text-gray-600">
                                Explore our latest research initiatives and breakthroughs
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {featuredProjects.map((project) => (
                                <Card key={project._id} hover>
                                    <div className="mb-4">
                                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-3">
                                            {project.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                        </span>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            {project.description}
                                        </p>
                                    </div>
                                    <Link
                                        to={`/projects/${project._id}`}
                                        className="text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        Learn More →
                                    </Link>
                                </Card>
                            ))}
                        </div>

                        <div className="text-center">
                            <Link to="/projects">
                                <Button variant="outline">View All Projects</Button>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Recent Publications Section */}
            {recentPublications.length > 0 && (
                <section className="section-padding bg-gray-50">
                    <div className="container-custom">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                Recent Publications
                            </h2>
                            <p className="text-xl text-gray-600">
                                Latest research findings and academic contributions
                            </p>
                        </div>

                        <div className="space-y-6 mb-12">
                            {recentPublications.map((publication) => (
                                <Card key={publication._id} hover>
                                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                {publication.title}
                                            </h3>
                                            <p className="text-gray-600 mb-2">
                                                {publication.authors.join(', ')}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {publication.journal} • {publication.year}
                                                {publication.volume && ` • Vol. ${publication.volume}`}
                                            </p>
                                        </div>
                                        <div className="mt-4 md:mt-0 md:ml-6">
                                            <Link
                                                to={`/publications/${publication._id}`}
                                                className="text-blue-600 hover:text-blue-700 font-medium"
                                            >
                                                View Details →
                                            </Link>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        <div className="text-center">
                            <Link to="/publications">
                                <Button variant="outline">View All Publications</Button>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="section-padding gradient-bg">
                <div className="container-custom text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Ready to Collaborate?
                    </h2>
                    <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
                        Get in touch with our team to discuss your fluid mechanics research needs or explore collaboration opportunities.
                    </p>
                    <Link to="/contact">
                        <Button size="lg" className="bg-purple
                        hover:bg-purple">
                            Contact Us Today
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;