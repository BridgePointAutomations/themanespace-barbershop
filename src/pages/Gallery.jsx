import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { X, ZoomIn } from 'lucide-react';
import './Gallery.css';

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const images = [
        { id: 1, src: 'https://images.unsplash.com/photo-1599351431202-1e0f013dcec5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', alt: 'Fresh Fade' },
        { id: 2, src: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', alt: 'Beard Trim' },
        { id: 3, src: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', alt: 'Classic Cut' },
        { id: 4, src: 'https://images.unsplash.com/photo-1532710093739-9470acff878f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', alt: 'Shop Interior' },
        { id: 5, src: 'https://images.unsplash.com/photo-1593702295094-aea8cdd39d38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', alt: 'Barber Tools' },
        { id: 6, src: 'https://images.unsplash.com/photo-1512690459411-b9245aed8ad5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', alt: 'Styling' },
    ];

    const openLightbox = (image) => {
        setSelectedImage(image);
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    };

    const closeLightbox = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'auto'; // Restore scrolling
    };

    return (
        <div className="gallery-page section-padding">
            <Helmet>
                <title>Our Work & Gallery | The Mane Space Barbershop</title>
                <meta name="description" content="Browse our gallery of precision fades, classic cuts, and beard styling from The Mane Space barbershop in Broadview Heights, OH. See the craft behind every cut." />
                <link rel="canonical" href="https://themanespace.us/gallery" />
                <meta property="og:title" content="Our Work & Gallery | The Mane Space" />
                <meta property="og:description" content="See the precision and style behind every cut at The Mane Space. Fades, classic cuts, and beard work from our skilled barbers." />
                <meta property="og:url" content="https://themanespace.us/gallery" />
                <meta property="og:image" content="https://themanespace.us/og-image.png" />
            </Helmet>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Our Work</h2>
                    <div className="section-divider"></div>
                    <p className="section-subtitle">A showcase of our precision and style.</p>
                </div>

                <div className="gallery-grid">
                    {images.map(image => (
                        <div key={image.id} className="gallery-item" onClick={() => openLightbox(image)}>
                            <img src={image.src} alt={image.alt} loading="lazy" />
                            <div className="gallery-overlay">
                                <ZoomIn className="zoom-icon" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div className="lightbox" onClick={closeLightbox}>
                    <div className="lightbox-content" onClick={e => e.stopPropagation()}>
                        <button className="close-btn" onClick={closeLightbox}>
                            <X size={32} />
                        </button>
                        <img src={selectedImage.src} alt={selectedImage.alt} />
                        <div className="lightbox-caption">{selectedImage.alt}</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;
