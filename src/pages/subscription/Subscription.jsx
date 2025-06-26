import React from 'react';
import SubscriptionForm from './components/SubscriptionForm';

const Subscription = () => {
    return (
        <section className="min-h-screen px-6 py-24 lg:px-32 bg-[#bfa3d1]">
            <h2 className="text-4xl font-bold text-center text-[#512260] mb-12">Subscribe to a Meal Plan</h2>
            <SubscriptionForm />
        </section>
    );
};

export default Subscription;
