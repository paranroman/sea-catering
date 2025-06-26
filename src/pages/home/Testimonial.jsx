import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { fadeIn } from '../../utils/motion';

const Testimonial = () => {
    const [testimonials, setTestimonials] = useState([
        {
            name: 'Ade Rai',
            message: 'Mantap, dengan SEA Catering saya sudah tidak perlu blender 10 telur rebus lagi!',
            rating: 5,
        },
        {
            name: 'Deddy Corbuzier',
            message: 'SEA Catering membuat OCD (Obsessive Corbuzier Diet) ku jadi seperti kacang. ',
            rating: 4.5,
        },
        {
            name: 'Ashton Hall',
            message: 'Cocok menemani morning routine ku',
            rating: 5,
        },
    ]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [form, setForm] = useState({ name: '', message: '', rating: 0 });
    const [hoverRating, setHoverRating] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [testimonials]);

    const [selectedRating, setSelectedRating] = useState(0);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const newReview = {
            name: form.name,
            message: form.message,
            rating: form.rating,
        };
        setTestimonials((prev) => [...prev, newReview]);
        setCurrentIndex(testimonials.length);
        setForm({ name: '', message: '', rating: 0 });
        setHoverRating(0);
        setSelectedRating(0);

    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    return (
        <section
            id="testimonial"
            className="w-full min-h-screen bg-[#bfa3d1] text-white px-6 lg:px-32 py-24"
        >
            <motion.h2
                variants={fadeIn('up', 0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.4 }}
                className="text-center text-[3rem] md:text-[5rem] lg:text-[6rem] font-bold text-white josefin-sans leading-tight mb-20"
            >
                Customer Testimonial
            </motion.h2>


            <div className="flex flex-col md:flex-row items-start justify-between gap-12">
                {/* Carousel */}
                <motion.div
                    variants={fadeIn('left', 0.2)}
                    initial="hidden"
                    whileInView="show"
                    className="w-full md:w-1/2 bg-white text-[#512260] p-6 rounded-2xl shadow-xl relative"
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -100, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="min-h-[220px] flex flex-col items-center justify-center text-center"
                        >
                            <p className="text-2xl md:text-3xl font-medium leading-relaxed max-w-[90%] break-words whitespace-pre-wrap">
                                "{testimonials[currentIndex].message}"
                            </p>
                            <div className="mt-4 font-semibold text-lg">- {testimonials[currentIndex].name}</div>
                            <div className="mt-2 flex gap-1">{renderStars(testimonials[currentIndex].rating)}</div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Arrow Navigation */}
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2">
                        <MdArrowBackIos
                            size={30}
                            className="cursor-pointer text-[#512260] hover:text-[#381344]"
                            onClick={handlePrev}
                        />
                    </div>
                    <div className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2">
                        <MdArrowForwardIos
                            size={30}
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
                    className="w-full md:w-1/2 bg-white text-[#512260] p-8 rounded-2xl shadow-xl space-y-6"
                >
                    <h3 className="text-3xl font-bold">Leave a Review</h3>

                    <div>
                        <label className="font-semibold block mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full p-3 rounded-md border border-gray-300"
                            required
                        />
                    </div>

                    <div>
                        <label className="font-semibold block mb-2">Message</label>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            rows={4}
                            className="w-full p-3 rounded-md border border-gray-300"
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label className="font-semibold block mb-2">Rating</label>
                        <div className="flex flex-col items-center gap-3">
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => {
                                    const currentRating = hoverRating || selectedRating || form.rating;
                                    const isFull = currentRating >= star;
                                    const isHalf = currentRating >= star - 0.5 && currentRating < star;

                                    return (
                                        <div
                                            key={star}
                                            className="relative w-12 h-12 cursor-pointer"
                                            onMouseMove={(e) => {
                                                const box = e.currentTarget.getBoundingClientRect();
                                                const mouseX = e.clientX - box.left;
                                                const half = box.width / 2;
                                                const value = mouseX < half ? star - 0.5 : star;
                                                setHoverRating(value);
                                            }}
                                            onMouseLeave={() => setHoverRating(0)}
                                            onClick={(e) => {
                                                const box = e.currentTarget.getBoundingClientRect();
                                                const mouseX = e.clientX - box.left;
                                                const half = box.width / 2;
                                                const value = mouseX < half ? star - 0.5 : star;
                                                setSelectedRating(value);
                                                setForm({ ...form, rating: value });
                                            }}
                                        >
                                            {/* Base gray star */}
                                            <FaStar size={48} className="text-gray-300" />

                                            {/* Fill yellow based on full or half */}
                                            {(isFull || isHalf) && (
                                                <div
                                                    className="absolute top-0 left-0 h-full overflow-hidden"
                                                    style={{ width: isFull ? '100%' : '50%' }}
                                                >
                                                    <FaStar size={48} className="text-yellow-400" />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            <span className="text-[#512260] text-xl font-semibold">
                                {selectedRating || form.rating} / 5
                            </span>
                        </div>




                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#512260] text-white font-semibold py-3 rounded-lg hover:bg-[#3b1748] transition"
                    >
                        Submit Review
                    </button>
                </motion.form>
            </div>
        </section>
    );
};

export default Testimonial;
