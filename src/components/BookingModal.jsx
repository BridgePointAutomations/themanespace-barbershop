import React, { useEffect, useRef, useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import './BookingModal.css';

// Booksy widget URL — this specific variant allows iframe embedding
const BOOKING_URL = 'https://booksy.com/en-us/instant-experiences/widget/1704307?instant_experiences_enabled=true&ig_ix=true&_branch_match_id=1563671290806293177&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXz8nMy9ZLys%2FPLq7US87P1XcNrTCLSLUw8zJMsq8rSk1LLSrKzEuPTyrKLy9OLbJ1zijKz00FAM05atc9AAAA';

// Extra time after iframe onLoad to let Booksy's SPA render before hiding the spinner
const BOOKSY_BOOT_DELAY_MS = 2500;

const BookingModal = ({ isOpen, onClose }) => {
    const [isLoading, setIsLoading] = useState(true);
    const hasLoadedRef = useRef(false);
    const bootTimerRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            // Only show the spinner on the very first load
            if (!hasLoadedRef.current) {
                setIsLoading(true);
            }
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data && event.data.events && event.data.events.close) {
                onClose();
            }
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [onClose]);

    // Clean up boot timer on unmount
    useEffect(() => {
        return () => clearTimeout(bootTimerRef.current);
    }, []);

    const handleIframeLoad = () => {
        // Wait for Booksy's SPA to finish booting before hiding the spinner
        bootTimerRef.current = setTimeout(() => {
            setIsLoading(false);
            hasLoadedRef.current = true;
        }, BOOKSY_BOOT_DELAY_MS);
    };

    return (
        <div
            className="booking-modal-overlay"
            style={{ display: isOpen ? 'flex' : 'none' }}
            onClick={onClose}
        >
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
                    onLoad={handleIframeLoad}
                    allow="payment"
                ></iframe>
            </div>
        </div>
    );
};

export default BookingModal;
