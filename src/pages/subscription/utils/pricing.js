const planPrices = {
    Diet: 30000,
    Protein: 40000,
    Royal: 60000,
};

const calculatePrice = (plan, meals, days) => {
    const price = planPrices[plan] || 0;
    return price * meals * days * 4.3;
};

export default calculatePrice;