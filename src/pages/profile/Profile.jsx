import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = ({ user, handleLogout }) => {
    const navigate = useNavigate();

    const onLogout = () => {
        handleLogout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-[#bfa3d1] text-[#512260] flex items-center justify-center font-[DM Sans]">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6 text-center">
                <h2 className="text-3xl font-bold">Your Profile</h2>

                <div className="w-24 h-24 mx-auto rounded-full bg-[#512260] flex items-center justify-center text-white text-4xl">
                    {user?.full_name?.charAt(0).toUpperCase()}
                </div>

                <div>
                    <p className="text-xl font-semibold">{user?.full_name}</p>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                </div>

                <button
                    onClick={onLogout}
                    className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-all"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;
