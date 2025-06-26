import React from 'react';
import { FaPhoneAlt, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '../../utils/motion';

const Contact = () => {
    return (
        <section className="min-h-screen bg-[#bfa3d1] px-6 py-32 lg:px-32 text-[#512260] font-dm-sans flex items-center">
            <div className="w-full">
                <motion.h2
                    variants={textVariant(0.2)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    className="text-6xl font-bold text-center mb-16"
                >
                    Contact
                </motion.h2>

                <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">

                    {/* Contact Box */}
                    <motion.div
                        variants={fadeIn("right", 0.3)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.3 }}
                        className="bg-white p-10 rounded-xl shadow-lg flex flex-col items-center text-center border-2 border-[#512260]"
                    >
                        <FaPhoneAlt className="text-4xl text-[#512260] mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Talk to a member of our Sales team</h3>
                        <p className="text-sm mb-6">
                            We’ll help you find the right meal plan and accommodating complaints from you.
                        </p>
                        <a
                            href="tel:+6281234567890"
                            className="bg-[#512260] hover:bg-[#3e1b4a] transition text-white font-medium py-2 px-6 rounded-full"
                        >
                            Dial Us
                        </a>
                    </motion.div>

                    {/* Instagram Box */}
                    <motion.div
                        variants={fadeIn("left", 0.4)}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.3 }}
                        className="bg-white p-10 rounded-xl shadow-lg flex flex-col items-center text-center border-2 border-[#512260]"
                    >
                        <FaInstagram className="text-4xl text-[#512260] mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Find us on Instagram</h3>
                        <p className="text-sm mb-6">
                            Follow us for updates, healthy meal tips, and promotions you won’t want to miss.
                        </p>
                        <a
                            href="https://instagram.com/seacatering.id"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#512260] hover:bg-[#3e1b4a] transition text-white font-medium py-2 px-6 rounded-full"
                        >
                            @seacatering.id
                        </a>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Contact;
