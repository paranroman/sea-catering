import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
    FaUtensils, FaCalendarAlt, FaHeartbeat, FaMoneyBill,
    FaPause, FaPlay, FaTimes, FaDrumstickBite,
} from 'react-icons/fa';

const UserDashboard = ({ onCancelSuccess }) => {
    const [subscription, setSubscription] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    const [showPauseForm, setShowPauseForm] = useState(false);
    const [pauseEnd, setPauseEnd] = useState('');
    const [infoMsg, setInfoMsg] = useState('');

    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const fetchSubscription = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/subscription/user', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSubscription(res.data[0] || null);
        } catch (err) {
            console.error('Gagal fetch subscription:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubscription();
    }, []);

    const handlePause = async () => {
        if (!pauseEnd) {
            setInfoMsg("Harap isi tanggal akhir pause.");
            return;
        }

        try {
            const res = await axios.patch('http://localhost:5000/api/subscription/pause',
                { pauseEnd },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setInfoMsg(res.data.message);
            setShowPauseForm(false);
            setPauseEnd('');
            fetchSubscription();
        } catch (err) {
            setInfoMsg("Gagal pause.");
            console.error(err);
        }
    };

    const handleResume = async () => {
        try {
            const res = await axios.patch('http://localhost:5000/api/subscription/resume', {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setInfoMsg(res.data.message);
            fetchSubscription();
        } catch (err) {
            setInfoMsg("Gagal resume.");
            console.error(err);
        }
    };

    const handleCancel = async () => {
        try {
            const res = await axios.delete('http://localhost:5000/api/subscription/cancel', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setInfoMsg(res.data.message);
            setShowConfirmModal(false);
            if (typeof onCancelSuccess === 'function') onCancelSuccess();
        } catch (err) {
            setInfoMsg("Gagal cancel.");
            console.error(err);
        }
    };

    if (loading) return <p className="text-center py-10 font-medium text-[#512260]">Loading your dashboard...</p>;
    if (!subscription) return <p className="text-center text-gray-500">No active subscription found.</p>;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-[#bfa3d1]"
        >
            <h2 className="text-3xl font-bold text-[#512260] mb-6 text-center">
                Your Active Subscription
            </h2>

            <div className="space-y-4 text-[#512260] text-lg">
                <div className="flex items-center gap-3"><FaUtensils className="text-xl" /><span><strong>Plan:</strong> {subscription.plan}</span></div>
                <div className="flex items-center gap-3"><FaDrumstickBite className="text-xl" /><span><strong>Meals:</strong> {JSON.parse(subscription.meals).join(', ')}</span></div>
                <div className="flex items-center gap-3"><FaCalendarAlt className="text-xl" /><span><strong>Delivery Days:</strong> {JSON.parse(subscription.delivery_days).join(', ')}</span></div>
                <div className="flex items-center gap-3"><FaHeartbeat className="text-xl" /><span><strong>Allergies:</strong> {subscription.allergies || 'None'}</span></div>
                <div className="flex items-center gap-3"><FaMoneyBill className="text-xl" /><span><strong>Total Price:</strong> Rp{subscription.total_price.toLocaleString('id-ID')}</span></div>
                <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold bg-opacity-20 ${subscription.status === 'active' ? 'bg-green-500 text-green-700' : 'bg-yellow-500 text-yellow-700'}`}>
            {subscription.status.toUpperCase()}
          </span>
                </div>
            </div>

            {infoMsg && (
                <div className="text-center text-[#512260] bg-[#f4e7fa] border border-[#bfa3d1] rounded-md py-2 px-4 mt-6">
                    {infoMsg}
                </div>
            )}

            {/* Pause Section */}
            {subscription.status === 'active' && !showPauseForm && (
                <div className="mt-8 flex justify-center">
                    <button
                        onClick={() => setShowPauseForm(true)}
                        className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-full transition"
                    >
                        <FaPause /> Pause
                    </button>
                </div>
            )}

            {subscription.status === 'active' && showPauseForm && (
                <div className="mt-8 bg-[#f4e7fa] border border-[#bfa3d1] p-6 rounded-xl space-y-3">
                    <p className="text-center text-[#512260] font-medium">Pilih tanggal akhir pause:</p>
                    <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
                        <input
                            type="date"
                            className="border border-gray-300 rounded px-3 py-2"
                            value={pauseEnd}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={(e) => setPauseEnd(e.target.value)}
                        />
                        <div className="flex gap-2">
                            <button
                                onClick={handlePause}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full"
                            >
                                Konfirmasi Pause
                            </button>
                            <button
                                onClick={() => {
                                    setShowPauseForm(false);
                                    setPauseEnd('');
                                }}
                                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-full"
                            >
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Resume if paused */}
            {subscription.status === 'paused' && (
                <div className="mt-8 flex flex-col items-center gap-3">
                    <div className="text-center text-yellow-700 font-medium">
                        Paused sejak: {new Date(subscription.pause_start).toLocaleDateString('id-ID')} <br />
                        Sampai: {new Date(subscription.pause_end).toLocaleDateString('id-ID')}
                    </div>
                    <button
                        onClick={handleResume}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full transition"
                    >
                        <FaPlay /> Resume
                    </button>
                </div>
            )}

            {/* Cancel Button */}
            <div className="mt-8 flex justify-center">
                <button
                    onClick={() => setShowConfirmModal(true)}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition"
                >
                    <FaTimes /> Cancel
                </button>
            </div>

            {/* Cancel Modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg text-center border border-[#bfa3d1]">
                        <h3 className="text-xl font-semibold text-[#512260] mb-4">Cancel Subscription?</h3>
                        <p className="text-[#512260] mb-6">Are you sure you want to cancel your subscription? This action cannot be undone.</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={handleCancel}
                                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
                            >
                                Yes, Cancel
                            </button>
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className="bg-gray-300 text-[#512260] px-6 py-2 rounded-lg hover:bg-gray-400 transition"
                            >
                                No, Keep It
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default UserDashboard;