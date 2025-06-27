import React from "react";
import { motion } from "framer-motion";

const MenuCard = ({ plan, onSelect, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-transform duration-300 hover:-translate-y-2 hover:scale-[1.03] border border-[#e5d3ef]"
        >
            <img src={plan.image} alt={plan.name} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h3 className="text-xl font-bold text-[#512260] mb-1">{plan.name}</h3>
                <p className="text-sm text-[#6c4b6e] mb-2">{plan.price}</p>
                <p className="text-gray-700 text-sm line-clamp-2">{plan.description}</p>

                <button
                    onClick={() => onSelect(plan)}
                    className="mt-3 inline-block text-sm font-medium text-[#512260] hover:underline underline-offset-2"
                >
                    See More Details
                </button>
            </div>
        </motion.div>
    );
};

export default MenuCard;
