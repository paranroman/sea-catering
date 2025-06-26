import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from '../../../utils/motion';
import truckImage from '../../../assets/truk-sea-catering.png';

const Hero = () => {
    return (
        <section
            id="home"
            className="w-full min-h-screen flex flex-col md:flex-row justify-between items-center px-6 lg:px-32 pt-44 pb-16 bg-[#bfa3d1]"
        >
            {/* Left Text Column */}
            <div className="w-full md:w-1/2 text-left">
                <div className="space-y-2">
                    <motion.h1
                        variants={textVariant(0.2)}
                        initial="hidden"
                        whileInView="show"
                        className="text-6xl sm:text-7xl lg:text-[6rem] font-bold text-[#512260] logo-font leading-tight tracking-wide"
                    >
                        SEA<br />Catering
                    </motion.h1>

                    <motion.h2
                        variants={fadeIn('up', 0.3)}
                        initial="hidden"
                        whileInView="show"
                        className="text-3xl sm:text-4xl lg:text-5xl text-[#512260] cabin-font font-bold tracking-wide"
                    >
                        Healthy Meals, Anytime, Anywhere.
                    </motion.h2>
                </div>

                <motion.p
                    variants={fadeIn('up', 0.4)}
                    initial="hidden"
                    whileInView="show"
                    className="mt-8 text-[#512260] text-xl sm:text-2xl lg:text-2xl dm-font max-w-xl leading-relaxed"
                >
                    SEA Catering is a deliciously customizable healthy meal service, delivering fresh and nutritious food straight to your doorstep across Indonesia. Let’s eat better together!
                </motion.p>
            </div>

            {/* Right Truck Column */}
            <motion.div
                variants={fadeIn('left', 0.5)}
                initial="hidden"
                whileInView="show"
                className="w-full md:w-1/2 mt-20 md:mt-0 flex justify-center"
            >
                <img
                    src={truckImage}
                    alt="SEA Catering Truck"
                    className="w-full max-w-[700px] md:max-w-[800px] lg:max-w-[880px] transition-transform duration-300 hover:scale-105"
                />
            </motion.div>
        </section>
    );
};

export default Hero;
