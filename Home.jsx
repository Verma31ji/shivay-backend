import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useDarkMode } from '../Context/DarkModeContect';

export default function Home() {
    const navigate = useNavigate();
    const { darkMode } = useDarkMode();

    return (
        <>
            <Header />

            {/* Banner */}
            <div className="container-fluid text-center py-5">
                <p style={{ fontSize: "3rem", fontFamily: "fantasy" }}>
                    <i className="fa-solid fa-ear-listen fa-flip"></i> We Listen and Act
                </p>
                <h3>Transforming lives forever</h3>
            </div>

            {/* Full-Width Image */}
            <div>
                <img
                    src="Background Img.png"
                    alt="HomeImage"
                    className="img-fluid w-100"
                    style={{ maxHeight: "50rem", objectFit: "cover" }}
                />
            </div>

            {/* Benefits Section */}
            <div className={`container text-center my-5 ${darkMode ? 'text-white' : 'text-dark'}`}>
                <p style={{ fontSize: "2.5rem", fontWeight: "700" }}>From us, you can enjoy the following:</p>
                <div className="row">
                    {[
                        {
                            title: "A great working environment",
                            text: "We create a safe and productive work environment where you can achieve your full potential."
                        },
                        {
                            title: "Competitive salaries",
                            text: "We pay what you deserve or more — as long as you help us achieve our goals."
                        },
                        {
                            title: "Employee benefits",
                            text: "We provide overtime pay, paid time off, and minimum wage benefits."
                        }
                    ].map((item, index) => (
                        <div key={index} className="col-12 col-md-4 mb-4">
                            <div className={`p-3 shadow-lg rounded ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
                                <h5>{item.title}</h5>
                                <p>{item.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button onClick={() => navigate('/Offering')} className="btn btn-dark mt-3 px-4 py-2">
                    <i className="fa-solid fa-envelope"></i> Our Offering
                </button>
            </div>

            {/* Caring Section */}
            <div className={`min-vh-100 text-center py-5 ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
                <p style={{ fontSize: "3rem", fontWeight: "700", color: darkMode ? "#C7AE6A" : "#222" }}>
                    <i className="fa-solid fa-hands-holding-child fa-beat-fade"></i> We're here to take care of you
                </p>
                <div className="row justify-content-center">
                    <div className="col-10 col-md-5 mb-4">
                        <img src="/WedPics/12.07.2025_19.50.17_REC.png" className="img-fluid rounded" alt="Care1" style={{ height: "40rem" }} />
                    </div>
                    <div className="col-10 col-md-5 mb-4">
                        <img src="/WedPics/12.07.2025_19.50.50_REC.png" className="img-fluid rounded" alt="Care2" style={{ height: "40rem" }} />
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div className={`text-center py-5 ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
                <p style={{ fontSize: "2.5rem", fontWeight: "500" }}>
                    We are a business organization based in Dr. Ambedkar Nagar, and we are delighted to serve you.
                </p>
                <button onClick={() => navigate('/about')} className="btn btn-light mt-4">
                    <i className="fa-solid fa-circle-info"></i> About Us
                </button>
            </div>

            {/* Testimonials */}
            <div className={`min-vh-100 text-center py-5 ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
                <h2 className="mb-5">What Our Clients Say</h2>
                <div className="row justify-content-center">
                    {[
                        {
                            src: "girl1.jpg",
                            text: "I love Shivaay Films because their leaders are progressive and care for my needs.",
                            name: "Jane Faber"
                        },
                        {
                            src: "girl2.jpg",
                            text: "Shivaay Films has such a positive working environment. I want to grow with them.",
                            name: "John Smith"
                        },
                        {
                            src: "girl3.jpg",
                            text: "They have a clear vision, and provide fast, helpful feedback.",
                            name: "Madelaine Taylor"
                        }
                    ].map((item, index) => (
                        <div key={index} className="col-10 col-md-6 col-lg-4 mb-4">
                            <div className={`p-3 shadow-lg rounded ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
                                <img
                                    src={item.src}
                                    alt={item.name}
                                    className="img-fluid rounded-circle mb-3"
                                    style={{ height: "15rem", width: "15rem", objectFit: "cover" }}
                                />
                                <p style={{ fontFamily: "cursive" }}>{item.text}</p>
                                <h5 className="mt-2">{item.name}</h5>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </>
    );
}
