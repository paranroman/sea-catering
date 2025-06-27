import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../../utils/motion';
import { MdPhone, MdPerson } from 'react-icons/md';

const ContactUs = () => {
    return (
        <section
            id="contactUs"
            className="w-full min-h-[45vh] bg-gradient-to-b from-[#d6bfe2] via-[#e8d7ee] to-[#f3eaf7] px-6 py-20 flex items-center justify-center"
        >
            <motion.div
                variants={fadeIn('up', 0.2)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.4 }}
                className="bg-white bg-opacity-90 p-10 rounded-3xl shadow-xl max-w-xl w-full text-center space-y-8"
            >
                <h2 className="text-[2.5rem] md:text-[3rem] font-bold text-[#512260] font-josefin">
                    Contact Us
                </h2>

                <div className="grid grid-cols-[40px_1fr] gap-4 items-center text-[#512260]">
                    <MdPerson size={28} className="text-[#7a468d] justify-self-center" />
                    <div className="text-left">
                        <p className="text-sm uppercase tracking-wide text-[#7a468d] font-semibold">
                            Manager
                        </p>
                        <p className="text-lg font-cabin font-medium">Brian</p>
                    </div>
                </div>

                <div className="grid grid-cols-[40px_1fr] gap-4 items-center text-[#512260]">
                    <MdPhone size={28} className="text-[#7a468d] justify-self-center" />
                    <div className="text-left">
                        <p className="text-sm uppercase tracking-wide text-[#7a468d] font-semibold">
                            Phone
                        </p>
                        <p className="text-lg font-cabin font-medium">0812 3456 789</p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default ContactUs;
