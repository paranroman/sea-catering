import React from 'react';
import { FaPhoneAlt, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { fadeIn, textVariant, staggerContainer } from '../../utils/motion';

const Contact = () => {
    return (
        <motion.section
            className="min-h-screen relative px-6 py-32 lg:px-32 text-[#512260] flex items-center overflow-hidden"
            variants={staggerContainer(0.2, 0.1)}
            initial="hidden"
            animate="show"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#f4e7fa,_#e2d2ee,_#bfa3d1)] -z-10" />

            <div className="w-full">
                <motion.h2
                    variants={textVariant(0.2)}
                    className="text-6xl font-cabin font-bold text-center mb-20"
                >
                    Contact
                </motion.h2>

                <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">

                    {/* Call Us Box */}
                    <motion.div
                        variants={fadeIn("right", 0.1)}
                        className="bg-white/70 backdrop-blur-md p-10 rounded-3xl shadow-2xl flex flex-col items-center text-center border border-[#512260]/20 transition duration-300 hover:scale-[1.02]"
                    >
                        <FaPhoneAlt className="text-4xl text-[#512260] mb-4 drop-shadow-sm" />
                        <h3 className="text-2xl font-semibold mb-3">Talk to Our Team</h3>
                        <p className="text-sm text-gray-700 mb-6 px-4">
                            We’ll help you find the right meal plan and assist anything you need.
                        </p>
                        <a
                            href="tel:+6281234567890"
                            className="bg-[#512260] hover:bg-[#3e1b4a] transition-all text-white font-medium py-2.5 px-8 rounded-full shadow-md"
                        >
                            Dial Us
                        </a>
                    </motion.div>

                    {/* Instagram Box */}
                    <motion.div
                        variants={fadeIn("left", 0.2)}
                        className="bg-white/70 backdrop-blur-md p-10 rounded-3xl shadow-2xl flex flex-col items-center text-center border border-[#512260]/20 transition duration-300 hover:scale-[1.02]"
                    >
                        <FaInstagram className="text-4xl text-[#512260] mb-4 drop-shadow-sm" />
                        <h3 className="text-2xl font-semibold mb-3">Follow Our Journey</h3>
                        <p className="text-sm text-gray-700 mb-6 px-4">
                            Follow us for healthy tips, updates, and daily food vibes.
                        </p>
                        <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#512260] hover:bg-[#3e1b4a] transition-all text-white font-medium py-2.5 px-8 rounded-full shadow-md"
                        >
                            @seacatering.id
                        </a>
                    </motion.div>

                </div>
            </div>
        </motion.section>
    );
};

export default Contact;