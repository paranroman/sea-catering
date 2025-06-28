import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MealPlanModal = ({ plan, onClose }) => {
    if (!plan) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 30 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 30 }}
                    transition={{ duration: 0.3 }}
                    className="relative bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-2xl p-6 border border-[#e5d3ef]"
                >
                    <button
                        className="absolute top-4 right-4 z-20 text-3xl text-white bg-black/60 w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/80 transition"
                        onClick={onClose}
                    >
                        &times;
                    </button>


                    <img
                        src={plan.image}
                        alt={plan.name}
                        className="rounded-md mb-4 w-full h-48 object-cover"
                    />

                    <h2 className="text-3xl font-bold text-[#512260] mb-1">{plan.name}</h2>
                    <p className="text-lg text-[#6c4b6e] mb-4">Rp {plan.pricePerMeal.toLocaleString()} / meal</p>

                    <div className="space-y-2 text-[#4f3a50] text-sm leading-relaxed">
                        <p><strong>🔥 Calories per Meal:</strong> {plan.details.caloriesPerMeal}</p>
                        <p><strong>🚚 Delivery Days:</strong> {plan.details.deliveryDays}</p>
                        <p><strong>🌿 Diet Type:</strong> {plan.details.dietType}</p>

                        <div className="mt-4">
                            <h4 className="text-lg font-semibold">🍱 Meal Details:</h4>
                            <ul className="mt-2 space-y-2">
                                {plan.details.meals.map((meal, idx) => (
                                    <li key={idx}>
                                        <p><strong>{meal.type}:</strong> {meal.sampleMenu}</p>
                                        <p className="text-sm text-gray-600">Bahan: {meal.ingredients}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default MealPlanModal;
