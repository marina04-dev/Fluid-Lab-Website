import React from 'react';
import { useContent } from '../../contexts/ContentContext';

const Footer = () => {
    const { getContent } = useContent();

    const currentYear = new Date().getFullYear();

    const socialLinks = [
        {
            name: 'Twitter',
            href: '#',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
            ),
        },
        {
            name: 'LinkedIn',
            href: '#',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
            ),
        },
        {
            name: 'ResearchGate',
            href: '#',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.966.936-1.213 1.677-.066.199-.115.398-.147.579-.034.189-.051.369-.051.529 0 .142.017.293.051.441.033.147.08.298.147.447.132.298.33.558.590.792.26.235.577.417.935.545.357.129.747.193 1.161.193.315 0 .621-.033.916-.098.297-.066.579-.157.844-.274.264-.117.513-.258.744-.421.23-.164.44-.343.627-.538.188-.194.348-.4.479-.617.132-.216.236-.438.31-.665.076-.226.113-.447.113-.664 0-.132-.017-.264-.051-.396-.033-.132-.08-.264-.147-.396-.132-.264-.33-.513-.590-.744-.26-.23-.577-.413-.935-.545-.357-.132-.747-.198-1.161-.198-.315 0-.621.033-.916.099-.297.065-.579.156-.844.273-.264.117-.513.258-.744.421-.23.164-.44.343-.627.538-.188.194-.348.4-.479.617-.132.216-.236.438-.31.665-.076.226-.113.447-.113.664 0 .132.017.264.051.396.033.132.08.264.147.396.132.264.33.513.59.744.26.23.577.413.935.545.357.132.747.198 1.161.198zm-2.455 10.622c0-.66-.099-1.264-.297-1.813-.198-.549-.484-1.026-.858-1.431-.374-.405-.838-.718-1.392-.94-.554-.221-1.183-.332-1.886-.332-.703 0-1.332.111-1.886.332-.554.222-1.018.535-1.392.94-.374.405-.66.882-.858 1.431-.198.549-.297 1.153-.297 1.813 0 .66.099 1.264.297 1.813.198.549.484 1.026.858 1.431.374.405.838.718 1.392.94.554.221 1.183.332 1.886.332.703 0 1.332-.111 1.886-.332.554-.222 1.018-.535 1.392-.94.374-.405.66-.882.858-1.431.198-.549.297-1.153.297-1.813zm-2.969-.297c0-.198-.033-.396-.099-.594-.066-.198-.165-.375-.297-.529-.132-.154-.297-.276-.495-.369-.198-.093-.429-.14-.693-.14s-.495.047-.693.14c-.198.093-.363.215-.495.369-.132.154-.231.331-.297.529-.066.198-.099.396-.099.594 0 .198.033.396.099.594.066.198.165.375.297.529.132.154.297.276.495.369.198.093.429.14.693.14s.495-.047.693-.14c.198-.093.363-.215.495-.369.132-.154.231-.331.297-.529.066-.198.099-.396.099-.594z"/>
                </svg>
            ),
        },
    ];

    return (
        <footer className="bg-gray-900 text-white">
            <div className="container-custom">
                <div className="py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Brand Section */}
                        <div className="col-span-1 lg:col-span-2">
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">FL</span>
                                </div>
                                <span className="text-xl font-bold">Fluid Lab</span>
                            </div>
                            <p className="text-gray-300 mb-6 max-w-md">
                                {getContent('footer-description', 'Leading research in fluid mechanics and computational fluid dynamics. Advancing the future of flow analysis and simulation.')}
                            </p>
                            <div className="flex space-x-4">
                                {socialLinks.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="text-gray-400 hover:text-white transition-colors duration-200"
                                        aria-label={item.name}
                                    >
                                        {item.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="/about" className="text-gray-300 hover:text-white transition-colors duration-200">
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a href="/team" className="text-gray-300 hover:text-white transition-colors duration-200">
                                        Team
                                    </a>
                                </li>
                                <li>
                                    <a href="/projects" className="text-gray-300 hover:text-white transition-colors duration-200">
                                        Projects
                                    </a>
                                </li>
                                <li>
                                    <a href="/publications" className="text-gray-300 hover:text-white transition-colors duration-200">
                                        Publications
                                    </a>
                                </li>
                                <li>
                                    <a href="/contact" className="text-gray-300 hover:text-white transition-colors duration-200">
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Contact</h3>
                            <ul className="space-y-2 text-gray-300">
                                <li>
                                    <span className="block">
                                        {getContent('contact-address', 'University Campus')}
                                    </span>
                                </li>
                                <li>
                                    <span className="block">
                                        {getContent('contact-email', 'info@fluidlab.com')}
                                    </span>
                                </li>
                                <li>
                                    <span className="block">
                                        {getContent('contact-phone', '+1 (555) 123-4567')}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm">
                            © {currentYear} Fluid Lab. All rights reserved.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
