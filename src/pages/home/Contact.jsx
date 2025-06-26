import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../utils/motion';

const Contact = () => {
    return (
        <section
            id="contactUs"
            className="w-full h-[33vh] bg-[#f9f6fa] flex items-center justify-center px-6"
        >
            <div className="text-center space-y-3">
                <motion.h2
                    variants={fadeIn('up', 0.2)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.6 }}
                    className="text-[2.5rem] md:text-[3rem] lg:text-[4rem] font-bold text-[#512260] josefin-sans"
                >
                    Contact Us
                </motion.h2>

                <motion.p
                    variants={fadeIn('up', 0.3)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.6 }}
                    className="text-lg md:text-xl text-[#512260]"
                >
                    <strong>Manager:</strong> Brian
                </motion.p>

                <motion.p
                    variants={fadeIn('up', 0.4)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.6 }}
                    className="text-lg md:text-xl text-[#512260]"
                >
                    <strong>Phone:</strong> 08123456789
                </motion.p>
            </div>
        </section>
    );
};

export default Contact;
