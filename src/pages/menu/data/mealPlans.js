// src/data/mealPlans.js
const mealPlans = [
    {
        id: 1,
        name: "Diet Plan",
        price: "Rp 30.000 / meal",
        description: "Paket rendah kalori, cocok untuk menurunkan berat badan dan meningkatkan kesehatan.",
        image: "/images/diet.jpg",
        details: {
            mealsPerWeek: "14 meals",
            caloriesPerMeal: "500-700 kcal",
            deliveryDays: "Senin - Sabtu",
            ingredients: "Ayam, Telur, Brokoli, Kentang",
            dietType: "High Protein",
        },
    },
    {
        id: 2,
        name: "Protein Plan",
        price: "Rp 40.000 / meal",
        description: "Paket tinggi protein, cocok untuk gym enthusiast.",
        image: "/images/protein.jpg",
        details: {
            mealsPerWeek: "14 meals",
            caloriesPerMeal: "500-700 kcal",
            deliveryDays: "Senin - Sabtu",
            ingredients: "Ayam, Telur, Brokoli, Kentang",
            dietType: "High Protein",
        },
    },
    {
        id: 3,
        name: "Royal Plan",
        price: "Rp 60.000 / meal",
        description: "Paket mewah, cocok untuk sensasi makanan yang nikmat dan kaya protein.",
        image: "/images/royal.jpg",
        details: {
            mealsPerWeek: "14 meals",
            caloriesPerMeal: "500-700 kcal",
            deliveryDays: "Senin - Sabtu",
            ingredients: "Ayam, Telur, Brokoli, Kentang",
            dietType: "High Protein",
        },
    },
];

export default mealPlans;
