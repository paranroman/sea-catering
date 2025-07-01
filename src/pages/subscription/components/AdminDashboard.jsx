import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaChartLine, FaUsers, FaMoneyBillWave, FaRedoAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { fadeIn } from '../../../utils/motion';

const AdminDashboard = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [metrics, setMetrics] = useState({
        newSubscriptions: 0,
        mrr: 0,
        reactivations: 0,
        activeSubscriptions: 0,
    });
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('token');

    const fetchMetrics = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:5000/api/admin/metrics', {
                params: { start: startDate, end: endDate },
                headers: { Authorization: `Bearer ${token}` },
            });
            setMetrics(res.data);
        } catch (err) {
            console.error('Gagal fetch metrics:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMetrics();
    }, [startDate, endDate]);

    const today = new Date().toISOString().split('T')[0];

    return (
        <motion.div variants={fadeIn('up', 0.3)} className="bg-white rounded-xl shadow-lg p-6 max-w-5xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <div>
                    <label className="text-[#512260] font-semibold">Start Date</label>
                    <input
                        type="date"
                        max={today}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full"
                    />
                </div>
                <div>
                    <label className="text-[#512260] font-semibold">End Date</label>
                    <input
                        type="date"
                        max={today}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full"
                    />
                </div>
            </div>

            {loading ? (
                <p className="text-center text-[#512260] font-medium">Loading metrics...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                    <MetricCard icon={<FaUsers />} label="New Subscriptions" value={metrics.newSubscriptions} />
                    <MetricCard icon={<FaMoneyBillWave />} label="MRR (Rp)" value={metrics.mrr.toLocaleString('id-ID')} />
                    <MetricCard icon={<FaRedoAlt />} label="Reactivations" value={metrics.reactivations} />
                    <MetricCard icon={<FaChartLine />} label="Active Subscriptions" value={metrics.activeSubscriptions} />
                </div>
            )}
        </motion.div>
    );
};

const MetricCard = ({ icon, label, value }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#f4e7fa] rounded-lg shadow-md p-5 flex flex-col items-center justify-center"
    >
        <div className="text-[#512260] text-3xl mb-2">{icon}</div>
        <p className="text-lg font-semibold text-[#512260]">{label}</p>
        <p className="text-2xl font-bold text-[#512260]">{value}</p>
    </motion.div>
);

export default AdminDashboard;