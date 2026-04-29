import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Instagram, Twitter, Linkedin } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import './Team.css';
import nicaso from '../assets/team/nicaso.jpg';

const Team = () => {
    const navigate = useNavigate();
    const { openBookingModal } = useBooking();

    const teamMembers = [
        {
            id: 1,
            name: 'Dom',
            role: 'Owner/Head Barber',
            image: '',
            bio: 'Dom discovered his passion for barbering in high school, where he started cutting friends hair and quickly realized he had a gift. Starting from nothing but a pair of clippers and a dream, he built his reputation one haircut at a time. Through unwavering determination, Dom transformed that humble beginning into The Mane Space Barbershop, proving that passion combined with relentless work ethic can turn a high school side hustle into a thriving legacy.',
            socials: { instagram: '#' }
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
        },
        {
            id: 4,
            name: 'Nicaso',
            role: 'Barber',
            image: nicaso,
            bio: 'Nicaso is known for his attention to detail and sharp styling. Booking with him guarantees a fresh, modern look every time.',
            socials: { instagram: 'https://www.instagram.com/nicasioagosto4' }
        }
    ];

    const handleBookStylist = (stylist) => {
        openBookingModal();
    };

    return (
        <div className="team-page section-padding">
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
