import React from 'react';
import { FaLeaf, FaDrumstickBite, FaCrown, FaMoon } from 'react-icons/fa';
import useSubscriptionForm from '../hooks/useSubscriptionForm';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { MdWbSunny } from 'react-icons/md';
import { WiDaySunny } from 'react-icons/wi';


const SubscriptionForm = () => {
    const {
        form,
        errors,
        handleChange,
        handleCheckbox,
        handleSubmit,
        totalPrice,
        handleDeliveryRangeStart,
        handleDeliveryRangeEnd,
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
        >{/* Full Name & Phone */}
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block font-semibold text-lg mb-1">Full Name*</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border border-[#512260] rounded-lg p-3"
                        required
                    />
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
                <label className="block font-semibold text-lg mb-3 text-center">Delivery Days (Range)*</label>
                <div className="flex justify-center items-center gap-4">
                    <div className="flex flex-col">
                        <span className="text-sm mb-1">From</span>
                        <select value={form.rangeStart} onChange={handleDeliveryRangeStart} className="p-2 border rounded-md border-[#512260]">
                            <option value="">Select</option>
                            {daysOfWeek.map(day => (
                                <option key={day} value={day}>{day}</option>
                            ))}
                        </select>
                    </div>
                    <HiArrowNarrowRight className="text-[#512260] text-2xl" />
                    <div className="flex flex-col">
                        <span className="text-sm mb-1">To</span>
                        <select value={form.rangeEnd} onChange={handleDeliveryRangeEnd} className="p-2 border rounded-md border-[#512260]">
                            <option value="">Select</option>
                            {daysOfWeek.map(day => (
                                <option key={day} value={day}>{day}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {errors.days && <p className="text-red-500 text-sm text-center mt-2">{errors.days}</p>}
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
                    className="bg-[#512260] text-white py-3 px-8 rounded-lg hover:bg-[#3e1b4a] transition"
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

export default SubscriptionForm;