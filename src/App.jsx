import React, { Suspense, lazy } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import { BookingProvider, useBooking } from './context/BookingContext';
import './App.css';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const Bookings = lazy(() => import('./pages/Bookings'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Team = lazy(() => import('./pages/Team'));
const NotFound = lazy(() => import('./pages/NotFound'));

// ModalWrapper component to consume context and render Modal
const ModalWrapper = () => {
  const { isBookingModalOpen, closeBookingModal } = useBooking();
  return <BookingModal isOpen={isBookingModalOpen} onClose={closeBookingModal} />;
};

// Global Floating Book Button
const FloatingBookBtn = () => {
  const { openBookingModal } = useBooking();
  return (
    <button className="floating-book-btn" onClick={openBookingModal}>
      Book Now
    </button>
  );
};

function App() {
  React.useEffect(() => {
    // Initialize Lenis for globally slower, buttery-smooth scrolling
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.05, // Lower value = slower, smoother scrolling
    });

    // We can also hook our custom parallax up directly to the lenis scroll event for maximum performance
    lenis.on('scroll', (e) => {
      const windowHeight = window.innerHeight;

      document.querySelectorAll('.parallax-image').forEach((img) => {
        const container = img.parentElement;
        const rect = container.getBoundingClientRect();

        // Check if element is in viewport
        if (rect.top <= windowHeight && rect.bottom >= 0) {
          // Calculate distance from center of viewport to element
          const distanceToCenter = (rect.top + rect.height / 2) - (windowHeight / 2);

          // 2px parallax movement exactly per 1px scroll => multiplier 2.0 (or -2.0 depending on direction)
          let offset = distanceToCenter * 0.1; // Slower internal image scroll speed

          // Clamp to the rigid 100px up or down
          if (offset > 100) offset = 100;
          if (offset < -100) offset = -100;

          img.style.transform = `translateY(${offset}px)`;
        }
      });
    });

    // Intercept all anchor link clicks to use Lenis for buttery smooth navigation
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      // Only intercept internal # links
      if (href && href.startsWith('#') && href !== '#') {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          // Add a luxury artificial delay to give users a moment after clicking
          setTimeout(() => {
            lenis.scrollTo(targetElement, {
              offset: -80,
              duration: 2.5, // 2.5s duration to arrive (very slow and deliberate)
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) // Cinematic ease-out
            });
          }, 150); // 150ms structural delay
        }
      } else if (href === '#') {
        e.preventDefault();
        setTimeout(() => {
          lenis.scrollTo(0, {
            duration: 2.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
          }); // Scroll to top for empty anchors
        }, 150);
      }
    };

    document.documentElement.addEventListener('click', handleAnchorClick);

    // Cleanup 
    return () => {
      document.documentElement.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
    };
  }, []);
  return (
    <ErrorBoundary>
      <BookingProvider>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/team" element={<Team />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <ModalWrapper />
        </div>
      </BookingProvider>
    </ErrorBoundary>
  );
}

export default App;
