import { useState, useEffect } from 'react';
import axios from 'axios';
import calculatePrice from '../utils/pricing';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const useSubscriptionForm = (onSuccess) => {
    const [userName, setUserName] = useState('');
    const [form, setForm] = useState({
        phone: '',
        plan: '',
        meals: [],
        days: [],
        allergies: '',
    });

    const [errors, setErrors] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [alreadySubscribed, setAlreadySubscribed] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/auth/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserName(res.data.fullName);
            } catch (err) {
                console.error('Gagal fetch user:', err);
            }
        };
        if (token) fetchUser();
    }, [token]);

    useEffect(() => {
        const checkSubscription = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/subscription/check', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAlreadySubscribed(res.data.subscribed);
            } catch (err) {
                console.error('Gagal cek subscription:', err);
            }
        };
        if (token) checkSubscription();
    }, [token]);

    useEffect(() => {
        const price = calculatePrice(form.plan, form.meals.length, form.days.length);
        setTotalPrice(price);
    }, [form.plan, form.meals, form.days]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckbox = (e) => {
        const { name, value, checked } = e.target;
        setForm((prev) => {
            const updated = checked
                ? [...prev[name], value]
                : prev[name].filter((v) => v !== value);
            return { ...prev, [name]: updated };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!form.phone.trim()) newErrors.phone = 'Phone is required';
        if (!form.plan) newErrors.plan = 'Plan is required';
        if (form.meals.length === 0) newErrors.meals = 'Choose at least one meal';
        if (form.days.length === 0) newErrors.days = 'Choose at least one day';
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        if (alreadySubscribed) {
            alert('You have already subscribed.');
            return;
        }

        try {
            await axios.post(
                'http://localhost:5000/api/subscription',
                {
                    phone: form.phone,
                    plan: form.plan,
                    meals: form.meals,
                    days: form.days,
                    allergies: form.allergies,
                    total_price: totalPrice,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setAlreadySubscribed(true);
            if (typeof onSuccess === 'function') onSuccess();
        } catch (err) {
            console.error('Submit error:', err);
            alert(err?.response?.data?.message || 'Failed to submit. Try again.');
        }
    };

    return {
        form,
        userName,
        errors,
        handleChange,
        handleCheckbox,
        handleSubmit,
        totalPrice,
        daysOfWeek,
        alreadySubscribed,
    };
};

export default useSubscriptionForm;