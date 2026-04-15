import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import './BookingModal.css';

const BookingModal = ({ isOpen, onClose }) => {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
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
                <iframe
                    src={BOOKING_URL}
                    className="booking-iframe"
                    title="Booksy Appointment Booking"
                    loading="lazy"
                ></iframe>
            </div>
        </div>
    );
};

export default BookingModal;
