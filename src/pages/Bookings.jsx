import React from 'react';
import { Helmet } from 'react-helmet-async';
import './Bookings.css';

const Bookings = () => {
    // Use the global Booksy link
    const BOOKING_URL = 'https://booksy.com/en-us/instant-experiences/widget/1704307?instant_experiences_enabled=true&ig_ix=true&_branch_match_id=1563671290806293177&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXz8nMy9ZLys%2FPLq7US87P1XcNrTCLSLUw8zJMsq8rSk1LLSrKzEuPTyrKLy9OLbJ1zijKz00FAM05atc9AAAA';

    return (
        <div className="bookings-page section-padding">
            <Helmet>
                <title>Book an Appointment | The Mane Space Barbershop</title>
                <meta name="description" content="Schedule your haircut, beard trim, or grooming service at The Mane Space in Broadview Heights, OH. Easy online booking available — pick your barber and preferred time." />
                <link rel="canonical" href="https://themanespace.us/bookings" />
                <meta property="og:title" content="Book an Appointment | The Mane Space" />
                <meta property="og:description" content="Schedule your visit at The Mane Space barbershop. Choose your barber and book online in minutes." />
                <meta property="og:url" content="https://themanespace.us/bookings" />
                <meta property="og:image" content="https://themanespace.us/og-image.png" />
            </Helmet>
            <div className="container booking-container-simple">
                <div className="section-header">
                    <h2 className="section-title">Book an Appointment</h2>
                    <div className="section-divider"></div>
                    <p className="section-subtitle">Reserve your spot with one of our skilled barbers. We offer precision haircuts, beard trims, and full grooming packages. Walk-ins welcome when available — booking guarantees your preferred time and barber.</p>
                </div>

                <div className="iframe-container">
                    <iframe
                        src={BOOKING_URL}
                        className="booking-iframe-full"
                        title="Booksy Appointment Booking"
                        width="100%"
                        height="600px" // Adjust as needed
                        frameBorder="0"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default Bookings;
