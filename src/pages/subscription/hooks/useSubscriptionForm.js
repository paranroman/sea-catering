import { useState, useEffect } from 'react';
import axios from 'axios';
import calculatePrice from '../utils/pricing';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const useSubscriptionForm = () => {

    const storedUser = JSON.parse(localStorage.getItem('user')) || {};
    const storedName = storedUser.full_name || '';

    const [form, setForm] = useState({
        name: storedName,
        phone: '',
        plan: '',
        meals: [],
        days: [],
        allergies: '',
    });


    const [errors, setErrors] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);

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

    useEffect(() => {
        const price = calculatePrice(form.plan, form.meals.length, form.days.length);
        setTotalPrice(price);
    }, [form.plan, form.meals, form.days]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!form.name.trim()) newErrors.name = 'Name is required';
        if (!form.phone.trim()) newErrors.phone = 'Phone is required';
        if (!form.plan) newErrors.plan = 'Plan must be selected';
        if (form.meals.length === 0) newErrors.meals = 'Select at least one meal type';
        if (form.days.length === 0) newErrors.days = 'Select at least one delivery day';

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                await axios.post('http://localhost:5000/api/subscription', {
                    name: form.name,
                    phone: form.phone,
                    plan: form.plan,
                    meals: form.meals,
                    days: form.days,
                    allergies: form.allergies,
                    total_price: totalPrice,
                });

                alert('Subscription submitted successfully!');
            } catch (error) {
                console.error('Submission error:', error);
                alert('Failed to submit. Please try again.');
            }
        }
    };

    return {
        form,
        errors,
        handleChange,
        handleCheckbox,
        handleSubmit,
        totalPrice,
        daysOfWeek,
    };
};

export default useSubscriptionForm;