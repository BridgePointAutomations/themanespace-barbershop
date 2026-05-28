import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useBooking } from '../context/BookingContext';
import './Home.css';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import barber1 from '../assets/team/barber1.jpg';
import barber2 from '../assets/team/barber2.jpg';
import barber3 from '../assets/team/barber3.jpg';
import nicaso from '../assets/team/nicaso.jpg';
import heroImage from '../assets/hero.jpg';

const Home = () => {
    const { openBookingModal } = useBooking();
    const carouselRef = useRef(null);
    const isPaused = useRef(false);
    const pauseTimeout = useRef(null);

    // Unique, high-impact review data
    const reviews = [
        {
            text: "Dominic is simply the best! Between me and my son, we get compliments every where we go. He is quick, and doesn't take shortcuts. I highly recommend anybody to go to him.",
            author: "Troy Spears",
            role: "Client"
        },
        {
            text: "Paul did a GREAT job on my son’s hair. We have been struggling to find someone who can keep up with all these new trends. My son was extremely happy with his cut. He loves the vibe of the shop as well. Paul took his time explaining the cut & then how to style it. Brody will definitely be back & I'm bringing my younger son in next week!!",
            author: "Katie E",
            role: "Client"
        },
        {
            text: "We love India! Both my boys have been getting their hair cut by Indie for several years now and always does an amazing job! Their friends and teachers are constantly asking who cuts their hair so they can go there also. If you’re looking for a great barber I highly recommend you make an appointment with Indie!",
            author: "Maureen Wolfe",
            role: "Client"
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
            <Helmet>
                <title>The Mane Space | Premium Barbershop in Broadview Heights, OH</title>
                <meta name="description" content="The Mane Space is a premium barbershop in Broadview Heights, OH offering classic cuts, modern styling, long scissor cuts, and beard grooming in a relaxed atmosphere. Book your appointment today." />
                <link rel="canonical" href="https://themanespace.us/" />
                <meta property="og:title" content="The Mane Space | Premium Barbershop in Broadview Heights, OH" />
                <meta property="og:description" content="Experience the best in service and atmosphere at The Mane Space. Classic techniques, modern style." />
                <meta property="og:url" content="https://themanespace.us/" />
                <meta property="og:image" content="https://themanespace.us/og-image.png" />
            </Helmet>
            {/* Hero Section */}
            <section className="hero fade-up">
                <div className="container hero-container">
                    <div className="hero-content">
                        <h1 className="hero-title">Redefining Hair Grooming at The Mane Space</h1>
                        <p className="hero-subtitle">The Mane Space is an elevated barbershop that specializes in tailored hair services, attention to detail, and a true sense of community.</p>
                        <button onClick={openBookingModal} className="btn btn-primary">Book Now</button>
                    </div>
                </div>
            </section>

            {/* Hero Large Image */}
            <section className="hero-image-section fade-up">
                <div className="hero-large-image">
                    <img className="classic-hero-image" src={heroImage} alt="The Mane Space Interior" />
                </div>
            </section>

            {/* Pricing Summary */}
            <section id="pricing" className="pricing-section section-padding fade-up">
                <div className="container">
                    <div className="section-header text-center" style={{ marginBottom: 'var(--spacing-lg)' }}>
                        <h2 className="section-title">Transparent Pricing,<br />Premium Quality</h2>
                        <p className="section-desc" style={{ maxWidth: '600px', margin: '0 auto' }}>Experience our full range of men’s grooming services, tailoring traditional techniques for the modern gentleman.</p>
                    </div>

                    <div className="pricing-table">
                        <div className="pricing-header">
                            <div>SERVICE</div>
                            <div className="text-center">DURATION</div>
                            <div className="text-right">PRICE</div>
                        </div>
                        <div className="pricing-list">
                            <div className="price-row">
                                <div className="price-name">Adult Haircut</div>
                                <div className="price-duration">45m</div>
                                <div className="price-amt">$45.00</div>
                            </div>
                            <div className="price-row">
                                <div className="price-name">Beard Trim & Razor Line Up</div>
                                <div className="price-duration">30m</div>
                                <div className="price-amt">$35.00</div>
                            </div>
                            <div className="price-row">
                                <div className="price-name">Men's Haircut & Beard Trim</div>
                                <div className="price-duration">50m</div>
                                <div className="price-amt">$50.00</div>
                            </div>
                            <div className="price-row">
                                <div className="price-name">Precision Haircut (Long Hair Trim)</div>
                                <div className="price-duration">50m</div>
                                <div className="price-amt">$50.00</div>
                            </div>
                            <div className="price-row">
                                <div className="price-name">Father & Son</div>
                                <div className="price-duration">1h 15m</div>
                                <div className="price-amt">$78.00</div>
                            </div>
                            <div className="price-row">
                                <div className="price-name">Father & 2 Sons</div>
                                <div className="price-duration">1h 30m</div>
                                <div className="price-amt">$110.00</div>
                            </div>
                            <div className="price-row">
                                <div className="price-name">Children's Haircut (Under 12)</div>
                                <div className="price-duration">45m</div>
                                <div className="price-amt">$35.00</div>
                            </div>
                            <div className="price-row">
                                <div className="price-name">The Mane Space Experience</div>
                                <div className="price-duration">1h</div>
                                <div className="price-amt">$80.00</div>
                            </div>
                        </div>
                        <div className="text-center" style={{ marginTop: 'var(--spacing-md)' }}>
                            <button onClick={openBookingModal} className="btn btn-primary">Book Now</button>
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
                                <ChevronLeft size={20} />
                            </button>
                            <button className="carousel-btn" onClick={() => manualScroll('right')} aria-label="Next review">
                                <ChevronRight size={20} />
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
                            { name: 'Dominic', img: '', ig: '#' },
                            { name: 'Kiara', img: barber1, ig: 'https://www.instagram.com/getrightbyki', imageStyle: { height: 'calc(100% + 60px)', top: '-30px' } },
                            { name: 'Paul', img: barber2, ig: 'https://www.instagram.com/paul_ontko' },
                            { name: 'India', img: barber3, ig: 'https://www.instagram.com/indie_thebarber' },
                            { name: 'Nicasio', img: nicaso, ig: 'https://www.instagram.com/nicasioagosto4' }
                        ].map((member) => (
                            <div className="team-card" key={member.name}>
                                <div className="team-image-container">
                                    <div className="team-image-wrapper parallax-image-container">
                                        {member.img && <img className="parallax-image" src={member.img} alt={member.name} style={member.imageStyle || undefined} />}
                                    </div>
                                </div>
                                <div className="team-info">
                                    <h3>{member.name}</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                        <button onClick={openBookingModal} className="btn-link">Book with {member.name} →</button>
                                        <a href={member.ig} target={member.ig !== '#' ? "_blank" : undefined} rel={member.ig !== '#' ? "noreferrer" : undefined} className="btn-link" style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: '0.25rem' }}>Instagram</a>
                                    </div>
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
                            <button onClick={openBookingModal} className="btn btn-primary desktop-only">Book Now</button>
                        </div>
                        <div className="faq-list">
                            <div className="faq-item">
                                <h3>What are your hours?</h3>
                                <p>Monday - Closed<br />Tuesday - Friday 10am - 7pm<br />Saturday - Sunday 9am - 5pm</p>
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
                    <h2 className="section-title">Contact Us</h2>
                    <p>Got a question? Reach out or stop by, we’re here to help.</p>
                    <div className="contact-links">
                        <a href="https://www.google.com/maps/search/?api=1&query=7976+Broadview+Rd,+Broadview+Heights,+OH+44147" target="_blank" rel="noreferrer" className="contact-link">7976 Broadview Rd, Broadview Heights, OH</a>
                        <a href="tel:+12165607650" className="contact-link">216-560-7650</a>
                        <a href="https://www.instagram.com/themane.space?igsh=c2VmMGx6eDk1ZjE1&utm_source=qr" target="_blank" rel="noreferrer" className="contact-link">Instagram</a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
