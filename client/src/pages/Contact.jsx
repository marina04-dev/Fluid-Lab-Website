import React, { useState } from 'react';
import { useContent } from '../contexts/ContentContext';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Textarea from '../components/common/Textarea';
import Card from '../components/common/Card';
import api from '../services/api';
import toast from 'react-hot-toast';

const Contact = () => {
    const { getContent } = useContent();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        
        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        }
        
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        
        try {
            await api.post('/contact', formData);
            toast.success('Message sent successfully! We will get back to you soon.');
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to send message. Please try again.';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const contactInfo = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            title: 'Address',
            content: getContent('contact-address', 'University Campus, Research Building\nCity, State 12345'),
            multiline: true
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            title: 'Email',
            content: getContent('contact-email', 'info@fluidlab.com'),
            link: true,
            linkType: 'email'
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            ),
            title: 'Phone',
            content: getContent('contact-phone', '+1 (555) 123-4567'),
            link: true,
            linkType: 'phone'
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: 'Office Hours',
            content: getContent('contact-hours', 'Monday - Friday: 9:00 AM - 5:00 PM'),
            multiline: true
        }
    ];

    return (
        <div className="min-h-screen">
            {/* Header Section */}
            <section className="pt-24 pb-16 gradient-bg">
                <div className="container-custom">
                    <div className="text-center text-white">
                        <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
                        <p className="text-xl opacity-90 max-w-3xl mx-auto">
                            Get in touch with our team to discuss collaboration opportunities or learn more about our research
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Content */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Contact Information */}
                        <div className="lg:col-span-1">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">Get In Touch</h2>
                            
                            <div className="space-y-6">
                                {contactInfo.map((info, index) => (
                                    <div key={index} className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                            {info.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                                            {info.link ? (
                                                <a
                                                    href={info.linkType === 'email' ? `mailto:${info.content}` : `tel:${info.content}`}
                                                    className="text-blue-600 hover:text-blue-700"
                                                >
                                                    {info.content}
                                                </a>
                                            ) : info.multiline ? (
                                                <div className="text-gray-600">
                                                    {info.content.split('\n').map((line, lineIndex) => (
                                                        <div key={lineIndex}>{line}</div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-gray-600">{info.content}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Additional Info */}
                            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                                <h3 className="font-semibold text-gray-900 mb-3">Quick Response</h3>
                                <p className="text-gray-600 text-sm">
                                    We typically respond to inquiries within 24-48 hours during business days. 
                                    For urgent matters, please call our main office number.
                                </p>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <Card>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                                
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Input
                                            label="Name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            error={errors.name}
                                            required
                                            placeholder="Your full name"
                                        />
                                        <Input
                                            label="Email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            error={errors.email}
                                            required
                                            placeholder="your.email@example.com"
                                        />
                                    </div>

                                    <Input
                                        label="Subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        error={errors.subject}
                                        required
                                        placeholder="Brief description of your inquiry"
                                    />

                                    <Textarea
                                        label="Message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        error={errors.message}
                                        required
                                        rows={6}
                                        placeholder="Please provide details about your inquiry, research interests, or collaboration ideas..."
                                    />

                                    <Button
                                        type="submit"
                                        loading={loading}
                                        className="w-full md:w-auto"
                                    >
                                        Send Message
                                    </Button>
                                </form>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section (Optional) */}
            <section className="py-16 bg-gray-50">
                <div className="container-custom">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Us</h2>
                        <p className="text-gray-600">
                            Visit our research facility on campus
                        </p>
                    </div>

                    {/* Placeholder for map - You can integrate Google Maps or similar */}
                    <div className="bg-gray-300 rounded-lg h-96 flex items-center justify-center">
                        <div className="text-center text-gray-600">
                            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <p className="text-lg font-medium">Interactive Map</p>
                            <p className="text-sm">Map integration can be added here</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
