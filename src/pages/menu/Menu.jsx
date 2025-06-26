import React, { useState } from "react";
import { motion } from "framer-motion";
import MenuCard from "./components/MenuCard";
import MealPlanModal from "./components/MealPlanModal";
import mealPlans from "./data/mealPlans";
import useModal from "./hooks/useModal";
import { fadeIn, staggerContainer, textVariant } from "../../utils/motion";

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
        <motion.section
            className="min-h-screen w-full px-6 py-24 lg:px-32 bg-[#bfa3d1] relative overflow-hidden"
            variants={staggerContainer(0.2, 0.1)}
            initial="hidden"
            animate="show"
        >
            <motion.h2
                className="text-4xl md:text-5xl font-bold text-center text-[#512260] mb-16"
                variants={textVariant(0.1)}
            >
                Our Meal Plans
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {mealPlans.map((plan, index) => (
                    <MenuCard key={plan.id} plan={plan} onSelect={handleSelect} index={index} />
                ))}
            </div>

            {isOpen && selectedPlan && (
                <MealPlanModal plan={selectedPlan} onClose={handleClose} />
            )}
        </motion.section>
    );
};

export default Menu;
