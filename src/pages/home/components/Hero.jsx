import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../../../utils/motion";
import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#512260,_#7e4b91,_#bfa3d1)] -z-10" />

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
                    className="mt-8 flex justify-center"
                >
                    <Link to="/subscription">
                        <button className="bg-[#bfa3d1] hover:bg-[#a58abf] text-[#512260] font-semibold px-6 py-3 rounded-full shadow-lg backdrop-blur-md transition-all duration-300">
                            Explore Plans
                        </button>
                    </Link>
                </motion.div>
            </motion.div>

            <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0] z-10">
                <svg
                    className="relative block w-full h-28 md:h-36"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                    preserveAspectRatio="none"
                >
                    <path
                        fill="#f3eaf7"
                        d="M0,224L60,192C120,160,240,96,360,106.7C480,117,600,203,720,208C840,213,960,139,1080,112C1200,85,1320,107,1380,117.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                    ></path>
                </svg>
            </div>
        </section>
    );
};

export default Hero;