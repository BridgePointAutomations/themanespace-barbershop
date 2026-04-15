import React from 'react';
import './Bookings.css';

const Bookings = () => {
    // Use the global Booksy link
    const BOOKING_URL = 'https://booksy.com/en-us/instant-experiences/widget/1704307?instant_experiences_enabled=true&ig_ix=true&_branch_match_id=1563671290806293177&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXz8nMy9ZLys%2FPLq7US87P1XcNrTCLSLUw8zJMsq8rSk1LLSrKzEuPTyrKLy9OLbJ1zijKz00FAM05atc9AAAA';

    return (
        <div className="bookings-page section-padding">
            <div className="container booking-container-simple">
                <div className="section-header">
                    <h2 className="section-title">Book an Appointment</h2>
                    <div className="section-divider"></div>
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
