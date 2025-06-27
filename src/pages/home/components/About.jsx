import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../../utils/motion';

const About = () => {
    return (
        <section
            id="about"
            className="relative w-full min-h-screen bg-gradient-to-b from-[#f3eaf7] via-[#e9d7ef] to-[#e3d0ed] px-6 md:px-12 lg:px-24 pt-0 pb-24 flex flex-col items-center justify-center"
        >
        {/* Title */}
            <motion.h2
                variants={fadeIn('up', 0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.5 }}
                className="text-[2.8rem] md:text-[4.5rem] lg:text-[5.5rem] font-bold text-[#512260] text-center font-josefin mb-10"
            >
                Our Services
            </motion.h2>

            {/* Introduction */}
            <motion.p
                variants={fadeIn('up', 0.15)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.4 }}
                className="text-[#5e4b5a] text-lg md:text-xl text-center max-w-3xl mb-16 font-cabin leading-relaxed"
            >
                SEA Catering is a customizable healthy meal service with delivery all across Indonesia.
                Whether you’re at home or at work, we deliver fresh, nutritious meals made just for you.
            </motion.p>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-20 md:gap-x-24 w-full max-w-6xl">
                {/* Service 1 */}
                <motion.div
                    variants={fadeIn('up', 0.2)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.4 }}
                    className="bg-white rounded-2xl shadow-lg p-8 text-center"
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-[#512260] font-dm mb-4">
                        Meal Customization
                    </h3>
                    <p className="text-[#5e4b5a] text-base md:text-lg leading-relaxed font-cabin">
                        You can pick any meal you like — tailored for your taste, yet always healthy.
                    </p>
                </motion.div>

                {/* Service 2 */}
                <motion.div
                    variants={fadeIn('up', 0.3)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.4 }}
                    className="bg-white rounded-2xl shadow-lg p-8 text-center"
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-[#512260] font-dm mb-4">
                        Delivery to Major Cities
                    </h3>
                    <p className="text-[#5e4b5a] text-base md:text-lg leading-relaxed font-cabin">
                        We deliver to most major cities across Indonesia — fast, fresh, and reliable.
                    </p>
                </motion.div>

                {/* Service 3 */}
                <motion.div
                    variants={fadeIn('up', 0.4)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.4 }}
                    className="bg-white rounded-2xl shadow-lg p-8 text-center md:col-span-2"
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-[#512260] font-dm mb-4">
                        Detailed Nutritional Information
                    </h3>
                    <p className="text-[#5e4b5a] text-base md:text-lg leading-relaxed font-cabin max-w-2xl mx-auto">
                        We provide full nutritional info for every meal you choose — so you always know what’s on your plate.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
