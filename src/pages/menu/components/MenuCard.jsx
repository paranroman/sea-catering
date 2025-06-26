import React from 'react';

const MenuCard = ({ plan, onSelect }) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
            <img src={plan.image} alt={plan.name} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h3 className="text-xl font-bold text-[#512260]">{plan.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{plan.price}</p>
                <p className="text-gray-700 text-sm line-clamp-2">{plan.description}</p>

                <button
                    onClick={() => onSelect(plan)}
                    className="mt-3 text-sm font-medium text-[#512260] hover:underline"
                >
                    See More Details
                </button>
            </div>
        </div>
    );
};

export default MenuCard;
