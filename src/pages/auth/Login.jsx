import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { HiEye, HiEyeOff } from "react-icons/hi";

const Login = ({ setUser }) => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            if (!res.ok) return setError(data.error || 'Login gagal');

            const userData = { full_name: data.name, email: data.email };
            setUser(userData);

            localStorage.setItem("token", JSON.stringify(data.token));
            localStorage.setItem("user", JSON.stringify(userData));

            navigate('/');
        } catch (e) {
            setError('Server error: ' + e.message);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_center,_#f4e7fa,_#e8d4f0,_#bfa3d1)] text-[#512260] font-[DM Sans]">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md space-y-4">
                <h2 className="text-3xl font-bold text-center">Login</h2>
                {error && <div className="text-red-500 text-sm">{error}</div>}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-md"
                />

                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border rounded-md pr-10"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex items-center text-[#512260]"
                    >
                        {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                    </button>
                </div>

                <button type="submit" className="w-full bg-[#512260] text-white py-2 rounded-md hover:bg-[#3b1748]">
                    Login
                </button>

                {/* Link ke halaman Register */}
                <p className="text-sm text-center mt-2">
                    Don't have an account{' '}?{' '}
                    <Link to="/register" className="text-[#512260] font-semibold underline hover:text-[#3b1748]">
                        Sign Up
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;