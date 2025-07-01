import React, { useEffect, useReducer } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { fadeIn } from '../../../utils/motion';

const initialState = {
    testimonials: [],
    currentIndex: 0,
    direction: 1,
    form: { message: '', rating: 0 },
    selectedRating: 0,
    hoverRating: 0,
    messageLength: 0,
};

const dummyTestimonials = [
    {
        name: "Ade Rai",
        message: "SEA Catering is amazing! I don't need to blend 10 boile eggs anymore for my breakfast!",
        rating: 4.5,
    },
    {
        name: "Deddy Corbuzier",
        message: "This makes my own diet progeam (OCD) very far below than this",
        rating: 5,
    },
    {
        name: "Ashton Hall",
        message: "The meals is very suitable for my morning routine!",
        rating: 4,
    },
];

function reducer(state, action) {
    switch (action.type) {
        case 'ADD_TESTIMONIAL':
            return {
                ...state,
                testimonials: [...state.testimonials, action.payload],
                currentIndex: state.testimonials.length, // langsung ke testimonial terbaru
            };
        case 'SET_TESTIMONIALS':
            return { ...state, testimonials: action.payload };
        case 'SET_FORM_FIELD':
            return {
                ...state,
                form: { ...state.form, [action.field]: action.value },
                messageLength: action.value.length,
            };
        case 'SET_RATING':
            return {
                ...state,
                selectedRating: action.value,
                form: { ...state.form, rating: action.value },
            };
        case 'SET_HOVER_RATING':
            return { ...state, hoverRating: action.value };
        case 'RESET_FORM':
            return {
                ...state,
                form: { message: '', rating: 0 },
                selectedRating: 0,
                hoverRating: 0,
                messageLength: 0,
            };
        case 'NEXT':
            return {
                ...state,
                direction: 1,
                currentIndex: (state.currentIndex + 1) % state.testimonials.length,
            };
        case 'PREV':
            return {
                ...state,
                direction: -1,
                currentIndex:
                    (state.currentIndex - 1 + state.testimonials.length) % state.testimonials.length,
            };
        default:
            return state;
    }
}

const Testimonial = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchTestimonials = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/testimonials');
            const data = await res.json();

            const combined = [...dummyTestimonials, ...data];
            dispatch({ type: 'SET_TESTIMONIALS', payload: combined });
        } catch (err) {
            console.error('Failed to fetch testimonials:', err);
        }
    };


    useEffect(() => {
        const token = localStorage.getItem("token");

        dispatch({ type: 'SET_TESTIMONIALS', payload: dummyTestimonials });

        if (token) {
            fetchTestimonials();
        }
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Kamu harus login dulu sebelum memberi testimonial!");
                return;
            }

            const payload = {
                message: state.form.message,
                rating: state.form.rating,
            };

            const res = await fetch("http://localhost:5000/api/testimonials", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Gagal submit testimonial");

            const newTestimonial = await res.json();
            dispatch({ type: "ADD_TESTIMONIAL", payload: newTestimonial });
            dispatch({ type: "RESET_FORM" });

        } catch (err) {
            console.error(err);
            alert("Gagal mengirim testimonial");
        }
    };


    const renderStars = (rating) => {
        const stars = [];
        let remaining = rating;
        for (let i = 0; i < 5; i++) {
            if (remaining >= 1) {
                stars.push(<FaStar key={i} className="text-yellow-400" />);
                remaining -= 1;
            } else if (remaining >= 0.5) {
                stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
                remaining -= 0.5;
            } else {
                stars.push(<FaRegStar key={i} className="text-yellow-400" />);
            }
        }
        return stars;
    };

    const handleStarClick = (e, star) => {
        const box = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX - box.left;
        const value = mouseX < box.width / 2 ? star - 0.5 : star;
        dispatch({ type: 'SET_RATING', value });
    };

    const currentTestimonial = state.testimonials[state.currentIndex];


    return (
        <section
            id="testimonial"
            className="relative z-10 w-full min-h-screen bg-gradient-to-b from-[#e3d0ed] via-[#d8c3e5] to-[#d1b8df] px-6 lg:px-24 py-24 text-[#512260] font-cabin"
        >
            <motion.h2
                variants={fadeIn('up', 0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.4 }}
                className="text-center text-[2.8rem] md:text-[4.5rem] lg:text-[5.5rem] font-bold font-josefin mb-16"
            >
                Customer Testimonial
            </motion.h2>

            <div className="flex flex-col md:flex-row items-start justify-center gap-12 max-w-7xl mx-auto">
                {/* Carousel */}
                <motion.div
                    variants={fadeIn('left', 0.2)}
                    initial="hidden"
                    whileInView="show"
                    className="w-full md:w-1/2 bg-white text-[#512260] p-8 rounded-2xl shadow-lg relative overflow-hidden min-h-[280px] flex items-center justify-center"
                >
                    {currentTestimonial && (
                        <AnimatePresence custom={state.direction} initial={false}>
                            <motion.div
                                key={state.currentIndex}
                                custom={state.direction}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.4, ease: 'easeInOut' }}
                                className="w-full h-full flex flex-col justify-center items-center text-center px-4"
                            >
                                <p className="text-xl md:text-2xl leading-relaxed font-medium">
                                    "{currentTestimonial.message}"
                                </p>
                                <div className="mt-4 font-semibold text-lg">– {currentTestimonial.name}</div>
                                <div className="mt-2 flex justify-center gap-1">
                                    {renderStars(currentTestimonial.rating)}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    )}
                    <div className="absolute top-1/2 left-3 transform -translate-y-1/2 z-10">
                        <MdArrowBackIos size={28} className="cursor-pointer" onClick={() => dispatch({ type: 'PREV' })} />
                    </div>
                    <div className="absolute top-1/2 right-3 transform -translate-y-1/2 z-10">
                        <MdArrowForwardIos size={28} className="cursor-pointer" onClick={() => dispatch({ type: 'NEXT' })} />
                    </div>
                </motion.div>

                {/* Form */}
                <motion.form
                    onSubmit={handleSubmit}
                    variants={fadeIn('right', 0.3)}
                    initial="hidden"
                    whileInView="show"
                    className="w-full md:w-1/2 bg-white p-8 rounded-2xl shadow-lg space-y-6"
                >
                    <h3 className="text-2xl md:text-3xl font-bold font-dm mb-4">Leave a Review</h3>

                    {/* Message */}
                    <div>
                        <label className="block mb-1 font-medium">Message</label>
                        <textarea
                            name="message"
                            maxLength={250}
                            value={state.form.message}
                            onChange={(e) =>
                                dispatch({ type: 'SET_FORM_FIELD', field: 'message', value: e.target.value })
                            }
                            rows={4}
                            className="w-full p-3 rounded-md border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-[#bfa3d1]"
                            required
                        />
                        <div className="text-sm text-right text-gray-500">{state.messageLength} / 250</div>
                    </div>

                    {/* Rating */}
                    <div>
                        <label className="block mb-1 font-medium">Rating</label>
                        <div className="flex flex-col items-center">
                            <div className="flex gap-2 mb-1">
                                {[1, 2, 3, 4, 5].map((star) => {
                                    const current = state.hoverRating || state.selectedRating || state.form.rating;
                                    const isFull = current >= star;
                                    const isHalf = current >= star - 0.5 && current < star;

                                    return (
                                        <div
                                            key={star}
                                            className="relative w-10 h-10 cursor-pointer"
                                            onMouseMove={(e) => {
                                                const box = e.currentTarget.getBoundingClientRect();
                                                const mouseX = e.clientX - box.left;
                                                const value = mouseX < box.width / 2 ? star - 0.5 : star;
                                                dispatch({ type: 'SET_HOVER_RATING', value });
                                            }}
                                            onMouseLeave={() => dispatch({ type: 'SET_HOVER_RATING', value: 0 })}
                                            onClick={(e) => handleStarClick(e, star)}
                                        >
                                            <FaStar size={40} className="text-gray-300" />
                                            {(isFull || isHalf) && (
                                                <div
                                                    className="absolute top-0 left-0 h-full overflow-hidden"
                                                    style={{ width: isFull ? '100%' : '50%' }}
                                                >
                                                    <FaStar size={40} className="text-yellow-400" />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            <span className="text-lg font-semibold">{state.selectedRating || state.form.rating} / 5</span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#512260] hover:bg-[#3a1b48] text-white py-3 rounded-lg font-semibold transition"
                    >
                        Submit Review
                    </button>
                </motion.form>
            </div>
        </section>
    );
};

export default Testimonial;