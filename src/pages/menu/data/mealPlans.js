import dietImg from '../../../assets/images/diet.jpg';
import proteinImg from '../../../assets/images/protein.jpg';
import royalImg from '../../../assets/images/royal.jpg';

const mealPlans = [
    {
        id: 1,
        name: "Diet Plan",
        pricePerMeal: 30000,
        description: "A low-calorie meal plan designed to support weight loss and overall wellness.",
        image: dietImg,
        details: {
            caloriesPerMeal: "500–700 kcal",
            deliveryDays: "Monday – Sunday",
            dietType: "Low Calorie",
            meals: [
                {
                    type: "Breakfast",
                    ingredients: "Rolled oats, banana, Greek yogurt, honey, chia seeds",
                    sampleMenu: "Banana oatmeal bowl with honey, Greek yogurt, and chia seeds",
                },
                {
                    type: "Lunch",
                    ingredients: "Grilled chicken breast, steamed broccoli, brown rice, olive oil",
                    sampleMenu: "Grilled chicken served with steamed broccoli and brown rice",
                },
                {
                    type: "Dinner",
                    ingredients: "Chicken thigh, carrots, potatoes, onion, low-sodium broth",
                    sampleMenu: "Low-calorie chicken soup with root vegetables in clear broth",
                },
            ],
        },
    },
    {
        id: 2,
        name: "Protein Plan",
        pricePerMeal: 40000,
        description: "A high-protein plan ideal for muscle building and active lifestyles.",
        image: proteinImg,
        details: {
            caloriesPerMeal: "600–800 kcal",
            deliveryDays: "Monday – Sunday",
            dietType: "High Protein",
            meals: [
                {
                    type: "Breakfast",
                    ingredients: "Eggs, whole wheat bread, avocado, lemon, olive oil",
                    sampleMenu: "Scrambled eggs with avocado on toasted whole wheat bread",
                },
                {
                    type: "Lunch",
                    ingredients: "Grilled chicken steak, quinoa, mixed greens, vinaigrette",
                    sampleMenu: "Grilled chicken breast with quinoa and garden salad",
                },
                {
                    type: "Dinner",
                    ingredients: "Salmon fillet, steamed sweet potatoes, long beans, sesame oil",
                    sampleMenu: "Baked salmon with sweet potatoes and sautéed long beans",
                },
            ],
        },
    },
    {
        id: 3,
        name: "Royal Plan",
        pricePerMeal: 60000,
        description: "A premium gourmet plan with luxurious ingredients and balanced nutrition.",
        image: royalImg,
        details: {
            caloriesPerMeal: "700–900 kcal",
            deliveryDays: "Monday – Sunday",
            dietType: "Balanced Gourmet",
            meals: [
                {
                    type: "Breakfast",
                    ingredients: "Avocado, banana, mixed berries, granola, coconut milk",
                    sampleMenu: "Avocado-banana smoothie bowl topped with granola and fresh berries",
                },
                {
                    type: "Lunch",
                    ingredients: "Beef sirloin, black pepper sauce, roasted potatoes, green beans",
                    sampleMenu: "Black pepper beef steak with roasted potatoes and green beans",
                },
                {
                    type: "Dinner",
                    ingredients: "Grilled dory fillet, white rice, tofu stir-fry, bok choy",
                    sampleMenu: "Grilled dory with steamed rice and sautéed tofu with bok choy",
                },
            ],
        },
    },
];

export default mealPlans;
