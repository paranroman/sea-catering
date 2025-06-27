import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiEye, HiEyeOff } from 'react-icons/hi';

const Register = () => {
    const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('Pendaftaran berhasil! Mengarahkan ke login...');
        setTimeout(() => navigate('/login'), 1500);


        if (form.password !== form.confirmPassword) {
            return setError('Konfirmasi password tidak cocok.');
        }

        try {
            const res = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName: form.fullName,
                    email: form.email,
                    password: form.password
                }),
            });

            const data = await res.json();
            if (!res.ok) return setError(data.error || 'Gagal mendaftar');

            setSuccess('Pendaftaran berhasil! Mengarahkan ke login...');
            setForm({ fullName: '', email: '', password: '', confirmPassword: '' });

            setTimeout(() => navigate('/login'), 1500);
        } catch (e) {
            setError('Terjadi kesalahan server: ' + e.message);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-[#bfa3d1] text-[#512260] font-[DM Sans]">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md space-y-4">
                <h2 className="text-3xl font-bold text-center">Register</h2>

                {error && <div className="text-red-500 text-sm">{error}</div>}
                {success && <div className="text-green-500 text-sm">{success}</div>}

                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-md"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-md"
                />

                {/* Password Field */}
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border rounded-md"
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-3 text-xl text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <HiEyeOff /> : <HiEye />}
                    </button>
                </div>

                {/* Confirm Password */}
                <div className="relative">
                    <input
                        type={showConfirm ? 'text' : 'password'}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border rounded-md"
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-3 text-xl text-gray-600"
                        onClick={() => setShowConfirm(!showConfirm)}
                    >
                        {showConfirm ? <HiEyeOff /> : <HiEye />}
                    </button>
                </div>

                <button type="submit" className="w-full bg-[#512260] text-white py-2 rounded-md hover:bg-[#3b1748]">
                    Register
                </button>

                <p className="text-sm text-center mt-4">
                    Already have an account?{' '}
                    <Link to="/login" className="text-[#512260] font-semibold underline">
                        Sign In
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
