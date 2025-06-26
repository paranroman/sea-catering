import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../../utils/motion';

const About = () => {
    return (
        <section
            id="about"
            className="relative w-full min-h-screen bg-[#f3eaf7] flex flex-col items-center px-6 md:px-12 lg:px-24 pt-32 pb-24"
        >
            {/* Title */}
            <motion.h2
                variants={fadeIn('up', 0.1)}
                initial="hidden"
                whileInView="show"
                className="absolute top-12 md:top-24 text-[3rem] md:text-[5rem] lg:text-[6rem] font-bold text-[#512260] text-center josefin-sans leading-tight"
            >
                Our Services
            </motion.h2>

            <div className="mt-64 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-y-24 md:gap-x-32 items-center justify-items-center">
                {/* Meal Customization */}
                <motion.div
                    variants={fadeIn('up', 0.2)}
                    initial="hidden"
                    whileInView="show"
                    className="text-center max-w-md"
                >
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#512260] dm-sans">
                        Meal Customization
                    </h3>
                    <p className="text-[#9b9b9b] cabin-font mt-4 text-base sm:text-lg leading-relaxed">
                        you can pick meal whatever you want, but still healthy.
                    </p>
                </motion.div>

                {/* Delivery to Major Cities */}
                <motion.div
                    variants={fadeIn('up', 0.3)}
                    initial="hidden"
                    whileInView="show"
                    className="text-center max-w-md"
                >
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#512260] dm-sans">
                        Delivery to Major Cities
                    </h3>
                    <p className="text-[#9b9b9b] cabin-font mt-4 text-base sm:text-lg leading-relaxed">
                        we reach many cities in Indonesia, so don’t worry about it.
                    </p>
                </motion.div>

                {/* Detailed Nutritional Info  */}
                <motion.div
                    variants={fadeIn('up', 0.4)}
                    initial="hidden"
                    whileInView="show"
                    className="text-center max-w-xl md:col-span-2 md:row-start-2 justify-self-center"
                >
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#512260] dm-sans">
                        Detailed Nutritional Information
                    </h3>
                    <p className="text-[#9b9b9b] cabin-font mt-4 text-base sm:text-lg leading-relaxed">
                        we provide you with nutritional <br className="hidden sm:inline" />
                        information about the meal you pick.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
