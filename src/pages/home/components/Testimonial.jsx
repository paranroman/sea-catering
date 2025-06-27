import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { fadeIn } from '../../../utils/motion';

const Testimonial = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [form, setForm] = useState({ name: '', message: '', rating: 0 });
    const [hoverRating, setHoverRating] = useState(0);
    const [selectedRating, setSelectedRating] = useState(0);
    const [direction, setDirection] = useState(1);
    const [messageLength, setMessageLength] = useState(0);
    const [nameLength, setNameLength] = useState(0);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/testimonials');
                const data = await res.json();
                setTestimonials(data);
            } catch (err) {
                console.error('Failed to fetch testimonials:', err);
            }
        };

        fetchTestimonials();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/testimonials', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error('Failed to submit testimonial');

            const newTestimonial = await res.json();
            setTestimonials((prev) => [...prev, newTestimonial]);
            setCurrentIndex(testimonials.length);
            setForm({ name: '', message: '', rating: 0 });
            setHoverRating(0);
            setSelectedRating(0);
        } catch (err) {
            console.error(err);
            alert('Gagal mengirim testimonial');
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

    const handlePrev = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const variants = {
        enter: (dir) => ({
            x: dir > 0 ? 150 : -150,
            opacity: 0,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
        }),
        center: {
            x: 0,
            opacity: 1,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
        },
        exit: (dir) => ({
            x: dir > 0 ? -150 : 150,
            opacity: 0,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
        }),
    };

    return (
        <section
            id="testimonial"
            className="w-full min-h-screen bg-gradient-to-b from-[#f3eaf7] via-[#e8d7ee] to-[#d6bfe2] px-6 lg:px-24 py-24 text-[#512260] font-cabin"
        >
            {/* Title */}
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
                    {testimonials.length > 0 && (
                        <AnimatePresence custom={direction} initial={false}>
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.4, ease: 'easeInOut' }}
                                className="w-full h-full flex flex-col justify-center items-center text-center px-4"
                            >
                                <p className="text-xl md:text-2xl leading-relaxed font-medium">
                                    "{testimonials[currentIndex].message}"
                                </p>
                                <div className="mt-4 font-semibold text-lg">
                                    – {testimonials[currentIndex].name}
                                </div>
                                <div className="mt-2 flex justify-center gap-1">
                                    {renderStars(testimonials[currentIndex].rating)}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    )}

                    {/* Arrows */}
                    <div className="absolute top-1/2 left-3 transform -translate-y-1/2 z-10">
                        <MdArrowBackIos
                            size={28}
                            className="cursor-pointer text-[#512260] hover:text-[#381344]"
                            onClick={handlePrev}
                        />
                    </div>
                    <div className="absolute top-1/2 right-3 transform -translate-y-1/2 z-10">
                        <MdArrowForwardIos
                            size={28}
                            className="cursor-pointer text-[#512260] hover:text-[#381344]"
                            onClick={handleNext}
                        />
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
                    <h3 className="text-2xl md:text-3xl font-bold font-dm mb-4">
                        Leave a Review
                    </h3>

                    {/* Name */}
                    <div>
                        <label className="block mb-1 font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            maxLength={25}
                            onChange={(e) => {
                                setForm({ ...form, name: e.target.value });
                                setNameLength(e.target.value.length);
                            }}
                            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#bfa3d1]"
                            required
                        />
                        <div className="text-sm text-right text-gray-500">{nameLength} / 25</div>
                    </div>

                    {/* Message */}
                    <div>
                        <label className="block mb-1 font-medium">Message</label>
                        <textarea
                            name="message"
                            value={form.message}
                            maxLength={250}
                            onChange={(e) => {
                                setForm({ ...form, message: e.target.value });
                                setMessageLength(e.target.value.length);
                            }}
                            rows={4}
                            className="w-full p-3 rounded-md border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-[#bfa3d1]"
                            required
                        />
                        <div className="text-sm text-right text-gray-500">{messageLength} / 250</div>
                    </div>

                    {/* Rating */}
                    <div>
                        <label className="block mb-1 font-medium">Rating</label>
                        <div className="flex flex-col items-center">
                            <div className="flex gap-2 mb-1">
                                {[1, 2, 3, 4, 5].map((star) => {
                                    const currentRating = hoverRating || selectedRating || form.rating;
                                    const isFull = currentRating >= star;
                                    const isHalf = currentRating >= star - 0.5 && currentRating < star;

                                    return (
                                        <div
                                            key={star}
                                            className="relative w-10 h-10 cursor-pointer"
                                            onMouseMove={(e) => {
                                                const box = e.currentTarget.getBoundingClientRect();
                                                const mouseX = e.clientX - box.left;
                                                const value = mouseX < box.width / 2 ? star - 0.5 : star;
                                                setHoverRating(value);
                                            }}
                                            onMouseLeave={() => setHoverRating(0)}
                                            onClick={(e) => {
                                                const box = e.currentTarget.getBoundingClientRect();
                                                const mouseX = e.clientX - box.left;
                                                const value = mouseX < box.width / 2 ? star - 0.5 : star;
                                                setSelectedRating(value);
                                                setForm({ ...form, rating: value });
                                            }}
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
                            <span className="text-lg font-semibold">{selectedRating || form.rating} / 5</span>
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
