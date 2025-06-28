import React from 'react';
import { FaLeaf, FaDrumstickBite, FaCrown, FaMoon } from 'react-icons/fa';
import useSubscriptionForm from '../hooks/useSubscriptionForm';
import { Link } from "react-router-dom";
import { MdWbSunny } from 'react-icons/md';
import { WiDaySunny } from 'react-icons/wi';


const SubscriptionForm = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const {
        form,
        errors,
        handleChange,
        handleCheckbox,
        handleSubmit,
        totalPrice,
    } = useSubscriptionForm();

    const mealOptions = [
        { name: 'Breakfast', icon: <MdWbSunny className="text-3xl mb-1 text-[#512260]" /> },
        { name: 'Lunch', icon: <WiDaySunny className="text-3xl mb-1 text-[#512260]" /> },
        { name: 'Dinner', icon: <FaMoon className="text-3xl mb-1 text-[#512260]" /> },
    ];
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];



    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-lg space-y-8 text-[#512260] font-dm-sans mx-auto max-w-3xl"
        >
            {!user && (
                <div className="bg-[#f4e7fa] border-l-4 border-[#bfa3d1] text-[#512260] p-4 rounded-lg mb-4 text-center shadow-sm">
                    <p className="font-semibold text-lg mb-2">You are not logged in!</p>
                    <div className="space-y-2">
                        <p className="text-base font-medium">
                            To fill out the subscription form, you must log in first.
                        </p>
                        <Link
                            to="/login"
                            className="inline-block bg-[#512260] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#3b1748] transition duration-200"
                        >
                            Login Now
                        </Link>
                    </div>
                </div>
            )}

            {/* Full Name & Phone */}
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block font-semibold text-lg mb-1">Full Name*</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        readOnly
                        className="w-full border border-[#512260] rounded-lg p-3 bg-gray-100 cursor-not-allowed"
                    />
                    <p className="text-sm text-gray-500 mt-1">Automatically filled</p>


                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                <div>
                    <label className="block font-semibold text-lg mb-1">Phone Number*</label>
                    <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full border border-[#512260] rounded-lg p-3"
                        required
                    />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>
            </div>

            {/* Plan */}
            <div>
                <label className="block font-semibold text-lg mb-3">Plan*</label>
                <div className="flex justify-around text-center gap-3">
                    <label className="cursor-pointer">
                        <input
                            type="radio"
                            name="plan"
                            value="Diet"
                            onChange={handleChange}
                            className="hidden"
                            checked={form.plan === 'Diet'}
                        />
                        <div className={`w-32 p-4 rounded-xl border-2 ${form.plan === 'Diet' ? 'border-[#512260]' : 'border-gray-300'} transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-md`}>
                            <FaLeaf className="mx-auto text-3xl mb-2 text-[#512260]" />
                            <span className="font-semibold">Diet Plan</span>
                            <p className="text-sm">Rp30.000</p>
                        </div>
                    </label>

                    <label className="cursor-pointer">
                        <input
                            type="radio"
                            name="plan"
                            value="Protein"
                            onChange={handleChange}
                            className="hidden"
                            checked={form.plan === 'Protein'}
                        />
                        <div className={`w-32 p-4 rounded-xl border-2 ${form.plan === 'Protein' ? 'border-[#512260]' : 'border-gray-300'} transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-md`}>
                            <FaDrumstickBite className="mx-auto text-3xl mb-2 text-[#512260]" />
                            <span className="font-semibold">Protein Plan</span>
                            <p className="text-sm">Rp40.000</p>
                        </div>
                    </label>

                    <label className="cursor-pointer">
                        <input
                            type="radio"
                            name="plan"
                            value="Royal"
                            onChange={handleChange}
                            className="hidden"
                            checked={form.plan === 'Royal'}
                        />
                        <div className={`w-32 p-4 rounded-xl border-2 ${form.plan === 'Royal' ? 'border-[#512260]' : 'border-gray-300'} transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-md`}>
                            <FaCrown className="mx-auto text-3xl mb-2 text-[#512260]" />
                            <span className="font-semibold">Royal Plan</span>
                            <p className="text-sm">Rp60.000</p>
                        </div>
                    </label>
                </div>

            </div>

            {/* Meal Type */}
            <div>
                <label className="block font-semibold text-lg mb-3">Meal Type*</label>
                <div className="flex justify-around flex-wrap gap-4">
                    {mealOptions.map(({ name, icon }) => (
                        <label key={name} className="cursor-pointer text-center">
                            <input
                                type="checkbox"
                                name="meals"
                                value={name}
                                checked={form.meals.includes(name)}
                                onChange={handleCheckbox}
                                className="hidden"
                            />
                            <div className={`p-4 border-2 rounded-xl w-28 ${form.meals.includes(name) ? 'border-[#512260]' : 'border-gray-300'} transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-md`}>
                                <div className="flex justify-center">{icon}</div>
                                <span className="font-medium">{name}</span>
                            </div>
                        </label>
                    ))}
                </div>
                {errors.meals && <p className="text-red-500 text-sm mt-2">{errors.meals}</p>}
            </div>

            {/* Delivery Days */}
            <div>
                <label className="block font-semibold text-lg mb-3 text-center">Select Delivery Days*</label>
                <div className="grid grid-cols-7 gap-2 justify-items-center">
                    {daysOfWeek.map((day) => (
                        <label key={day} className="cursor-pointer">
                            <input
                                type="checkbox"
                                name="days"
                                value={day}
                                checked={form.days.includes(day)}
                                onChange={handleCheckbox}
                                className="hidden"
                            />
                            <div
                                className={`w-14 h-10 flex items-center justify-center text-sm border-2 rounded-full font-medium text-center transition duration-300
                                ${form.days.includes(day) ? 'border-[#512260] bg-[#512260] text-white' : 'border-gray-300 text-[#512260]'} hover:scale-105 hover:shadow-sm`}
                            >
                                    {day.slice(0, 3)}

                            </div>
                        </label>
                    ))}
                </div>
                {errors.days && (
                    <p className="text-red-500 text-sm text-center mt-2">{errors.days}</p>
                )}
            </div>





            {/* Allergies */}
            <div>
                <label className="block font-semibold text-lg mb-2">Allergies (optional)</label>
                <textarea
                    name="allergies"
                    value={form.allergies}
                    onChange={handleChange}
                    className="w-full border border-[#512260] rounded-lg p-3"
                    rows={3}
                    placeholder="List any allergies or restrictions"
                />
            </div>

            {/* Total Price */}
            <div className="text-2xl font-bold text-[#512260] text-right">
                Total Price: Rp{totalPrice.toLocaleString('id-ID')}
            </div>

            {/* Submit */}
            <div className="text-center">
                <button
                    type="submit"
                    disabled={!user}
                    className="bg-[#512260] text-white py-3 px-8 rounded-lg hover:bg-[#3e1b4a] transition"
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

export default SubscriptionForm;