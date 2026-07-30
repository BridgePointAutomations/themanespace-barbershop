import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Instagram, Twitter, Linkedin } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import domImage from '../assets/team/dom.jpg';
import './Team.css';

const Team = () => {
    const navigate = useNavigate();
    const { openBookingModal } = useBooking();

    const teamMembers = [
        {
            id: 1,
            name: 'Dom',
            role: 'Owner/Head Barber',
            image: domImage,
            bio: 'Dom discovered his passion for barbering in high school, where he started cutting friends hair and quickly realized he had a gift. Starting from nothing but a pair of clippers and a dream, he built his reputation one haircut at a time. Through unwavering determination, Dom transformed that humble beginning into The Mane Space Barbershop, proving that passion combined with relentless work ethic can turn a high school side hustle into a thriving legacy.',
            socials: { instagram: 'https://www.instagram.com/delarosadidit?utm_source=qr' }
        },
        {
            id: 2,
            name: 'James',
            role: 'Senior Barber',
            image: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            bio: 'Specializing in modern texturizing and beard sculpting, James brings a creative flair to every cut. He loves helping clients find a style that perfectly suits their face shape.',
            socials: { instagram: '#' }
        },
        {
            id: 3,
            name: 'Mike',
            role: 'Senior Barber',
            image: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            bio: 'The freshest talent at The Mane Space, Mike is a master of fades and sharp lines. His attention to detail ensures you leave the chair looking crisp and clean every time.',
            socials: { instagram: '#' }
        }
    ];

    const handleBookStylist = (stylist) => {
        openBookingModal();
    };

    const teamSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "The Mane Space Barbers",
        "itemListElement": teamMembers.map((m, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "item": {
                "@type": "Person",
                "name": m.name,
                "jobTitle": m.role,
                "worksFor": { "@type": "Barbershop", "name": "The Mane Space" },
                "description": m.bio
            }
        }))
    };

    return (
        <div className="team-page section-padding">
            <Helmet>
                <title>Meet the Team | The Mane Space Barbershop</title>
                <meta name="description" content="Meet the skilled barbers at The Mane Space in Broadview Heights, OH — Dom, James, Mike, and more. Book your appointment with your favorite today." />
                <link rel="canonical" href="https://themanespace.us/team" />
                <meta property="og:title" content="Meet the Team | The Mane Space" />
                <meta property="og:description" content="Get to know the talented barbers behind The Mane Space. Book your next appointment with Dom, James, Mike, and more." />
                <meta property="og:url" content="https://themanespace.us/team" />
                <meta property="og:image" content="https://themanespace.us/og-image.png" />
                <script type="application/ld+json">{JSON.stringify(teamSchema)}</script>
            </Helmet>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Meet the Team</h2>
                    <div className="section-divider"></div>
                    <p className="section-subtitle"> The talent behind the shears.</p>
                </div>

                <div className="team-grid">
                    {teamMembers.map(member => (
                        <div key={member.id} className="team-card">
                            <div className="team-image-container">
                                <img src={member.image} alt={member.name} className="team-image" />
                            </div>
                            <div className="team-info">
                                <div className="team-header">
                                    <h3>{member.name}</h3>
                                    <span className="team-role">{member.role}</span>
                                </div>
                                <p className="team-bio">{member.bio}</p>
                                <div className="team-footer">
                                    <div className="team-socials">
                                        {member.socials.instagram && <Instagram size={20} className="social-icon" />}
                                        {member.socials.twitter && <Twitter size={20} className="social-icon" />}
                                        {member.socials.linkedin && <Linkedin size={20} className="social-icon" />}
                                    </div>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => handleBookStylist(member)}
                                    >
                                        Book {member.name}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Team;
