import express from "express";
import cors from "cors";

import testimonialRoutes from "./routes/testimonialRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import adminRoutes from './routes/adminRoutes.js';

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());


app.use("/api/testimonials", testimonialRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/subscription", subscriptionRoutes);
app.use('/api/admin', adminRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});