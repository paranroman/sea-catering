import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { textVariant, fadeIn, staggerContainer } from '../../utils/motion';
import SubscriptionForm from './components/SubscriptionForm';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import axios from 'axios';

const Subscription = () => {
    const [user, setUser] = useState(null);
    const [alreadySubscribed, setAlreadySubscribed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get("http://localhost:5000/api/auth/profile", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setUser(res.data);

                if (res.data.role === 'user') {
                    const subRes = await axios.get("http://localhost:5000/api/subscription/check", {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setAlreadySubscribed(subRes.data.subscribed);
                }
            } catch (err) {
                console.error("Gagal fetch user/subscription:", err);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        if (token) fetchData();
        else {
            setUser(null);
            setLoading(false);
        }
    }, [token, refresh]);

    const handleCancelSuccess = () => {
        setAlreadySubscribed(false);
        setRefresh((prev) => !prev);
    };


    if (loading) {
        return (
            <section className="min-h-screen flex items-center justify-center">
                <p className="text-[#512260] font-bold text-lg">Loading...</p>
            </section>
        );
    }

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
                {!user ? "Please login first" :
                    user.role === 'admin' ? "Admin Dashboard" :
                        alreadySubscribed ? "Your Subscription Dashboard" : "Subscribe to a Meal Plan"
                }
            </motion.h2>

            <motion.div variants={fadeIn("up", 0.3)} className="z-10">
                {!user ? (
                    <p className="text-center text-[#512260] font-medium">Please login first.</p>
                ) : user.role === 'admin' ? (
                    <AdminDashboard />
                ) : alreadySubscribed ? (
                    <UserDashboard onCancelSuccess={handleCancelSuccess} />
                ) : (
                    <SubscriptionForm onSuccess={() => setRefresh((prev) => !prev)} />
                )}
            </motion.div>
        </motion.section>
    );
};

export default Subscription;