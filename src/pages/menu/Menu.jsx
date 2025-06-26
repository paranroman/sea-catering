// src/pages/menu/Menu.jsx
import React, { useState } from "react";
import MenuCard from "./components/MenuCard";
import MealPlanModal from "./components/MealPlanModal.jsx";
import mealPlans from "./data/mealPlans";
import useModal from "./hooks/useModal";

const Menu = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const { isOpen, open, close } = useModal();

    const handleSelect = (plan) => {
        setSelectedPlan(plan);
        open();
    };

    const handleClose = () => {
        close();
        setSelectedPlan(null);
    };

    return (
        <section className="min-h-screen w-full px-6 py-24 lg:px-32 bg-[#bfa3d1] relative overflow-hidden">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-[#512260] mb-16">
                Our Meal Plans
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {mealPlans.map((plan) => (
                    <MenuCard key={plan.id} plan={plan} onSelect={handleSelect} />
                ))}
            </div>

            {isOpen && selectedPlan && (
                <MealPlanModal plan={selectedPlan} onClose={handleClose} />
            )}
        </section>
    );
};

export default Menu;
