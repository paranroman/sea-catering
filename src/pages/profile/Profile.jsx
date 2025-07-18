import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = ({ handleLogout }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [form, setForm] = useState({ fullName: '', email: '', phone: '', role: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState('');
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/auth/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                setForm(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchProfile();
    }, [token]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/auth/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            if (res.ok) {
                setMessage("Profile updated successfully!");
                setIsEditing(false);
            } else {
                setMessage(data.error || "Failed to update profile.");
            }
        } catch (err) {
            setMessage("Error: " + err.message);
        }
    };

    const confirmLogout = () => {
        handleLogout();
        navigate('/');
    };

    return (
        <div className="relative min-h-screen bg-[radial-gradient(circle_at_center,_#f4e7fa,_#e8d4f0,_#bfa3d1)] text-[#512260] flex items-center justify-center font-[DM Sans]">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg space-y-6">
                <h2 className="text-3xl font-bold text-center">Your Profile</h2>

                <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-[#512260] text-white text-4xl flex items-center justify-center">
                        {form.fullName?.charAt(0).toUpperCase()}
                    </div>
                </div>

                {message && (
                    <p className="text-center text-sm font-medium text-green-600">{message}</p>
                )}

                <div className="space-y-4">
                    <div>
                        <label className="block font-semibold mb-1">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={form.fullName}
                            onChange={handleChange}
                            readOnly={!isEditing || form.role === 'admin'}
                            className={`w-full p-3 border rounded-lg ${isEditing && form.role !== 'admin' ? '' : 'bg-gray-100 cursor-not-allowed'}`}
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            readOnly={!isEditing || form.role === 'admin'}
                            className={`w-full p-3 border rounded-lg ${isEditing && form.role !== 'admin' ? '' : 'bg-gray-100 cursor-not-allowed'}`}
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Phone Number</label>
                        <input
                            type="text"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            readOnly={!isEditing || form.role === 'admin'}
                            className={`w-full p-3 border rounded-lg ${isEditing && form.role !== 'admin' ? '' : 'bg-gray-100 cursor-not-allowed'}`}
                        />
                    </div>
                </div>

                <div className="flex flex-col items-center space-y-3 pt-4">
                    {isEditing && form.role !== 'admin' ? (
                        <button
                            onClick={handleUpdate}
                            className="bg-[#512260] text-white px-6 py-2 rounded-lg hover:bg-[#3b1748] transition"
                        >
                            Save Changes
                        </button>
                    ) : form.role !== 'admin' ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-[#512260] text-white px-6 py-2 rounded-lg hover:bg-[#3b1748] transition"
                        >
                            Edit Profile
                        </button>
                    ) : null}

                    <button
                        onClick={() => setShowLogoutModal(true)}
                        className="text-red-600 border border-red-600 hover:bg-red-100 px-6 py-2 rounded-lg transition"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {showLogoutModal && (
                <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg text-center border border-[#bfa3d1]">
                        <h3 className="text-xl font-semibold text-[#512260] mb-4">Logout Confirmation</h3>
                        <p className="text-[#512260] mb-6">Are you sure you want to logout?</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={confirmLogout}
                                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
                            >
                                Yes, Logout
                            </button>
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="bg-gray-300 text-[#512260] px-6 py-2 rounded-lg hover:bg-gray-400 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;