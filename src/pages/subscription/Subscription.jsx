import React from 'react';
import { motion } from 'framer-motion';
import { textVariant, fadeIn } from '../../utils/motion';
import SubscriptionForm from './components/SubscriptionForm';


const Subscription = () => {
    return (
        <section className="min-h-screen px-6 py-24 lg:px-32 bg-[#bfa3d1]">
            <motion.h2
                variants={textVariant(0.2)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="text-4xl font-bold text-center text-[#512260] mb-12"
            >
                Subscribe to a Meal Plan
            </motion.h2>

            <motion.div
                variants={fadeIn("up", 0.3)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
            >
                <SubscriptionForm />
            </motion.div>
        </section>
    );
};

export default Subscription;
