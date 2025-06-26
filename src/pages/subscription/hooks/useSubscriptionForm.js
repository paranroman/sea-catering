import { useState, useEffect } from 'react';
import calculatePrice from '../utils/pricing';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const calculateDeliveryDays = (start, end) => {
    if (!start || !end) return [];

    const startIdx = daysOfWeek.indexOf(start);
    const endIdx = daysOfWeek.indexOf(end);

    if (startIdx === -1 || endIdx === -1) return [];

    if (startIdx <= endIdx) return daysOfWeek.slice(startIdx, endIdx + 1);
    return [...daysOfWeek.slice(startIdx), ...daysOfWeek.slice(0, endIdx + 1)];
};

const useSubscriptionForm = () => {
    const [form, setForm] = useState({
        name: '',
        phone: '',
        plan: '',
        meals: [],
        days: [],
        allergies: '',
        rangeStart: '',
        rangeEnd: '',
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

    const handleDeliveryRangeStart = (e) => {
        const start = e.target.value;
        setForm((prev) => {
            const newDays = calculateDeliveryDays(start, prev.rangeEnd);
            return { ...prev, rangeStart: start, days: newDays };
        });
    };

    const handleDeliveryRangeEnd = (e) => {
        const end = e.target.value;
        setForm((prev) => {
            const newDays = calculateDeliveryDays(prev.rangeStart, end);
            return { ...prev, rangeEnd: end, days: newDays };
        });
    };

    useEffect(() => {
        const price = calculatePrice(form.plan, form.meals.length, form.days.length);
        setTotalPrice(price);
    }, [form.plan, form.meals, form.days]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!form.name.trim()) newErrors.name = 'Name is required';
        if (!form.phone.trim()) newErrors.phone = 'Phone is required';
        if (!form.plan) newErrors.plan = 'Plan must be selected';
        if (form.meals.length === 0) newErrors.meals = 'Select at least one meal type';
        if (form.days.length === 0) newErrors.days = 'Select at least one delivery day';

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            alert(`Success!\n\nData:\n${JSON.stringify(form, null, 2)}\nTotal: Rp${totalPrice.toLocaleString('id-ID')}`);
        }
    };

    return {
        form,
        errors,
        handleChange,
        handleCheckbox,
        handleDeliveryRangeStart,
        handleDeliveryRangeEnd,
        handleSubmit,
        totalPrice,
        daysOfWeek,
    };
};

export default useSubscriptionForm;
