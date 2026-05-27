import React, { useEffect, useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import './BookingModal.css';

const BookingModal = ({ isOpen, onClose }) => {
    const [isLoading, setIsLoading] = useState(true);

    // Prevent scrolling when modal is open and reset loading
    useEffect(() => {
        if (isOpen) {
            setIsLoading(true);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Listen for Booksy's internal close button click to close our React modal
    useEffect(() => {
        const handleMessage = (event) => {
            // Booksy sends a postMessage with events.close when its X is clicked
            if (event.data && event.data.events && event.data.events.close) {
                onClose();
            }
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [onClose]);

    if (!isOpen) return null;

    // This specific widget URL allows embedding inside an iframe without connection refusals
    const BOOKING_URL = 'https://booksy.com/en-us/instant-experiences/widget/1704307?instant_experiences_enabled=true&ig_ix=true&_branch_match_id=1563671290806293177&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXz8nMy9ZLys%2FPLq7US87P1XcNrTCLSLUw8zJMsq8rSk1LLSrKzEuPTyrKLy9OLbJ1zijKz00FAM05atc9AAAA';

    return (
        <div className="booking-modal-overlay" onClick={onClose}>
            <div className="booking-modal-content" onClick={e => e.stopPropagation()}>
                <button
                    className="booking-modal-close"
                    onClick={onClose}
                    aria-label="Close booking modal"
                >
                    <X size={24} />
                </button>

                {isLoading && (
                    <div className="booking-modal-loader">
                        <Loader2 className="spinner" size={48} />
                        <p>Loading booking system...</p>
                    </div>
                )}

                <iframe
                    src={BOOKING_URL}
                    className={`booking-iframe ${isLoading ? 'loading' : ''}`}
                    title="Booksy Appointment Booking"
                    onLoad={() => setIsLoading(false)}
                ></iframe>
            </div>
        </div>
    );
};

export default BookingModal;
