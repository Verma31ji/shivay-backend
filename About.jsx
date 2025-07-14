import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

export default function About() {
    const navigate = useNavigate();

    return (
        <>
            <Header />

            {/* Banner Section */}
            <div className='w-100'>
                <div className='d-flex justify-content-center align-items-center text-white'
                    style={{
                        fontSize: "2.5rem",
                        fontWeight: "700",
                        backgroundImage: "linear-gradient(135deg, #fcb045, #fd1d1d, #833ab4)",
                        backgroundSize: "cover",
                        height: "15rem",
                        textAlign: "center"
                    }}
                >
                    Transforming Lives Forever
                </div>
            </div>

            {/* Intro Text Section */}
            <div className='min-vh-100 d-flex justify-content-center align-items-center'>
                <div className="container text-center py-5">
                    <div className='row justify-content-center'>
                        <div className='col-12 col-md-10 col-lg-8'>
                            <div className="card-body my-3">
                                <p className='p-3 mt-3' style={{ fontSize: "2rem", fontWeight: "700" }}>
                                    We are a team of ambitious entrepreneurs operating in Dr. Ambedkar Nagar.
                                </p>
                                <p className='p-3 mb-3'>
                                    We are passionate about empowering people and creating unforgettable digital experiences.
                                </p>

                                {/* Image + CTA Section */}
                                <div className="container my-4 p-0"
                                    style={{
                                        backgroundImage: "url('https://images.wallpaperscraft.com/image/single/keyboard_backlight_red_136083_1280x720.jpg')",
                                        backgroundPosition: "center",
                                        backgroundSize: "cover",
                                        borderRadius: "15px",
                                        overflow: "hidden"
                                    }}
                                >
                                    <div className="row justify-content-center">
                                        <div className="col-12 col-md-10 d-flex justify-content-center align-items-center" style={{ height: "30rem" }}>
                                            <div className="bg-white text-dark p-4" style={{ borderRadius: "20px", maxWidth: "500px" }}>
                                                <p className='fs-4 fw-bold'>We move differently</p>
                                                <p>We're not just a team — we're a movement dedicated to innovation and excellence.</p>
                                                <button
                                                    onClick={() => navigate('/Offering')}
                                                    className="btn btn-dark w-100 mt-3"
                                                >
                                                    <i className="fa-solid fa-envelope"></i> Our Offering
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
