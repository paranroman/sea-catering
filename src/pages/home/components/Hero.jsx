import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../../../utils/motion";

const Hero = () => {
    return (
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-[#512260]/90 via-[#512260]/60 to-transparent z-10" />

            <motion.div
                variants={fadeIn("up", 0.3)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.7 }}
                className="relative z-20 text-center text-white max-w-3xl px-6"
            >
                <motion.h1
                    variants={textVariant(0.4)}
                    className="text-4xl md:text-6xl font-bold leading-tight mb-4 font-josefin"
                >
                    SEA Catering
                </motion.h1>

                <motion.p
                    variants={fadeIn("up", 0.6)}
                    className="text-lg md:text-xl font-dm"
                >
                    Healthy Meals, Anytime, Anywhere
                </motion.p>

                <motion.div
                    variants={fadeIn("up", 0.9)}
                    className="mt-8"
                >
                    <button className="bg-[#bfa3d1] hover:bg-[#a58abf] text-[#512260] font-semibold px-6 py-3 rounded-full shadow-lg transition duration-300">
                        Explore Plans
                    </button>
                </motion.div>
            </motion.div>
            <div className="absolute bottom-0 w-full overflow-hidden leading-[0] rotate-180 z-20">
                <svg className="relative block w-full h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
                    <path fill="#7e4b91" d="M0,0 C480,100 960,0 1440,100 L1440,0 L0,0 Z"></path>
                </svg>
            </div>
        </section>
    );
};

export default Hero;
