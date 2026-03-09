import React, { useEffect, useRef } from 'react';
import { useBooking } from '../context/BookingContext';
import './Home.css';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Home = () => {
    const { openBookingModal } = useBooking();
    const carouselRef = useRef(null);
    const isPaused = useRef(false);
    const pauseTimeout = useRef(null);

    // Unique, high-impact review data
    const reviews = [
        {
            text: "The precision here is unmatched. Lucio doesn't just cut hair; he understands the structural geometry of a perfect fade. The atmosphere is curated, masculine, and refined.",
            author: "Marcus Aurelius V.",
            role: "Creative Director"
        },
        {
            text: "I've been to every 'high-end' shop in the city, but The Mane Space is in a league of its own. The attention to detail during the beard trim was meticulous. Truly a SOTA experience.",
            author: "Julian Thorne",
            role: "Product Designer"
        },
        {
            text: "Bruna's scissor work is phenomenal. She handled my long hair with expert structure and clean shaping. It's rare to find a place that understands contemporary men's styles so deeply.",
            author: "Soren K.",
            role: "Software Architect"
        },
        {
            text: "The aesthetic of the shop is as sharp as the straight-razor shaves. It's a true community hub where the conversation is as good as the grooming. My weekly ritual for a reason.",
            author: "Dominic Black",
            role: "Founder"
        },
        {
            text: "Immaculate vibes and consistent excellence. Every barber here is an artist. They've redefined what I expect from a grooming session. Total visual and tactile luxury.",
            author: "Xavier Reed",
            role: "Photographer"
        }
    ];

    const manualScroll = (direction) => {
        if (carouselRef.current) {
            const { clientWidth, scrollLeft } = carouselRef.current;
            const scrollAmount = clientWidth > 600 ? 640 : clientWidth;
            const newScrollTarget = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;

            carouselRef.current.scrollTo({
                left: newScrollTarget,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        });

        const elements = document.querySelectorAll('.fade-up');
        elements.forEach(el => observer.observe(el));

        return () => {
            elements.forEach(el => observer.unobserve(el));
        };
    }, []);

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero fade-up">
                <div className="container hero-container">
                    <div className="hero-content">
                        <h1 className="hero-title">Redefining Hair Grooming at The Mane Space</h1>
                        <p className="hero-subtitle">The Mane Space is a men and woman’s hair salon that specializes in elevated hair services, attention to detail, and true sense of community.</p>
                        <button onClick={openBookingModal} className="btn btn-primary">Book Appointment Now</button>
                    </div>
                </div>
            </section>

            {/* Hero Large Image */}
            <section className="hero-image-section fade-up">
                <div className="hero-large-image parallax-image-container">
                    <img className="parallax-image" src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" alt="The Mane Space Interior" />
                </div>
            </section>

            {/* Pricing Summary */}
            <section id="pricing" className="pricing-section section-padding fade-up">
                <div className="container">
                    <div className="grid-split">
                        <div className="sticky-sidebar">
                            <h2 className="section-title">Transparent Pricing,<br />Premium Quality</h2>
                            <p className="section-desc">Experience our full range of men’s grooming services, tailoring traditional techniques for the modern gentleman.</p>
                            <button onClick={openBookingModal} className="btn btn-primary desktop-only">Book Now</button>
                        </div>
                        <div className="pricing-list">
                            <div className="price-item">
                                <div className="price-info">
                                    <h3>Precision Haircut</h3>
                                    <p>Tailored to your style and hair type. 1h</p>
                                </div>
                                <div className="price-amt">From $55</div>
                            </div>
                            <div className="price-item">
                                <div className="price-info">
                                    <h3>Haircut & Beard Trim</h3>
                                    <p>Complete grooming service. 1h – 1h 15min</p>
                                </div>
                                <div className="price-amt">From $75</div>
                            </div>
                            <div className="price-item">
                                <div className="price-info">
                                    <h3>Long / Scissor Cut</h3>
                                    <p>Tailored scissor cut for longer styles. 1h 30min</p>
                                </div>
                                <div className="price-amt">From $90</div>
                            </div>
                            <div className="price-item">
                                <div className="price-info">
                                    <h3>Beard Trim</h3>
                                    <p>Shape, trim, and clean up your beard. 30min</p>
                                </div>
                                <div className="price-amt">From $30</div>
                            </div>
                            <div className="price-item">
                                <div className="price-info">
                                    <h3>Custom Grooming Session</h3>
                                    <p>Personalized consultation and advanced styling. 2h</p>
                                </div>
                                <div className="price-amt">$170</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reviews (SOTA dynamic carousel) */}
            <section id="reviews" className="reviews-section section-padding fade-up">
                <div className="container">
                    <div className="section-header review-header">
                        <div className="header-text">
                            <h2 className="section-title">Client Voice</h2>
                            <p className="header-eyebrow">Real Stories, Real Transformations</p>
                        </div>
                        <div className="carousel-controls">
                            <button className="carousel-btn" onClick={() => manualScroll('left')} aria-label="Previous review">
                                <ChevronLeft size={24} />
                            </button>
                            <button className="carousel-btn" onClick={() => manualScroll('right')} aria-label="Next review">
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </div>
                    <div className="reviews-carousel" ref={carouselRef}>
                        {reviews.map((review, i) => (
                            <div className="review-card" key={i} style={{ '--index': i }}>
                                <div className="review-content">
                                    <p className="review-text">{review.text}</p>
                                    <div className="review-meta">
                                        <div className="author-info">
                                            <span className="review-author">{review.author}</span>
                                            <span className="review-role">{review.role}</span>
                                        </div>
                                        <div className="review-rating">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className="star">★</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Meet the Team */}
            <section id="team" className="team-section section-padding fade-up">
                <div className="container">
                    <h2 className="section-title">Meet the Team</h2>
                    <div className="team-grid">
                        {[
                            { name: 'Lucio', img: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                            { name: 'Chris', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                            { name: 'Juan', img: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                            { name: 'Bruna', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                            { name: 'Jordan', img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
                        ].map((member) => (
                            <div className="team-card" key={member.name}>
                                <div className="team-image-container">
                                    <div className="team-image-wrapper parallax-image-container">
                                        <img className="parallax-image" src={member.img} alt={member.name} />
                                    </div>
                                </div>
                                <div className="team-info">
                                    <h3>{member.name}</h3>
                                    <button onClick={openBookingModal} className="btn-link">Book with {member.name} →</button>
                                </div>
                            </div>
                        ))
                        }
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="faq-section section-padding fade-up">
                <div className="container">
                    <div className="grid-split">
                        <div className="sticky-sidebar">
                            <h2 className="section-title">Questions?<br />We’ve Got Answers</h2>
                            <p>Find quick, helpful answers to the most common questions about bookings, services, and what to expect at The Mane Space.</p>
                            <button onClick={openBookingModal} className="btn btn-primary desktop-only">Book now</button>
                        </div>
                        <div className="faq-list">
                            <div className="faq-item">
                                <h3>What are your hours?</h3>
                                <p>We’re open Tuesday to Friday, 10 AM to 8 PM, and Saturday from 9 AM to 5 PM. We’re closed Sunday and Monday.</p>
                            </div>
                            <div className="faq-item">
                                <h3>Do I need an appointment?</h3>
                                <p>Yes, we recommend booking in advance to ensure your preferred time and barber are available. Walk-ins are welcome when possible, but not guaranteed.</p>
                            </div>
                            <div className="faq-item">
                                <h3>What services do you provide?</h3>
                                <p>We offer a full range of men’s grooming services including precision haircuts, beard trims, long/scissor cuts, and combo packages. We also provide custom sessions for more tailored needs.</p>
                            </div>
                            <div className="faq-item">
                                <h3>Do you do long hair?</h3>
                                <p>Absolutely. We specialize in long and scissor haircuts for men who want to maintain length with clean shaping and structure.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Contact Section */}
            <section id="contact" className="contact-section section-padding fade-up">
                <div className="container text-left">
                    <h2 className="section-title">Contact us</h2>
                    <p>Got a question? Reach out or stop by, we’re here to help.</p>
                    <div className="contact-links">
                        <a href="https://maps.app.goo.gl/" target="_blank" rel="noreferrer" className="contact-link">123 Barber Street, Cleveland, OH</a>
                        <a href="#" className="contact-link">Instagram</a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
