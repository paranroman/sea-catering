import React from 'react';
import { motion } from 'framer-motion';
import { textVariant, fadeIn, staggerContainer } from '../../utils/motion';
import SubscriptionForm from './components/SubscriptionForm';

const Subscription = () => {
    return (
        <motion.section
            className="min-h-screen w-full px-6 py-24 lg:px-32 relative overflow-hidden"
            variants={staggerContainer(0.2, 0.1)}
            initial="hidden"
            animate="show"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#f4e7fa,_#e8d4f0,_#bfa3d1)] -z-10" />

            <motion.h2
                variants={textVariant(0.2)}
                className="text-4xl md:text-5xl font-bold font-cabin text-center text-[#512260] mb-16"
            >
                Subscribe to a Meal Plan
            </motion.h2>

            {/* Form */}
            <motion.div
                variants={fadeIn("up", 0.3)}
                className="z-10"
            >
                <SubscriptionForm />
            </motion.div>
        </motion.section>
    );
};

export default Subscription;