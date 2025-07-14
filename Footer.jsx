import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Footer() {
    const navigate = useNavigate();
    const location = useLocation();

    // Social Handlers
    const handleToTwitter = () => window.location.href = "https://x.com/i/flow/login?lang=en";
    const handleToFacebook = () => window.location.href = "https://www.facebook.com/";
    const handleToLindin = () => window.location.href = "https://in.linkedin.com/";

    // Hide Footer on Auth Pages
    if (['/UserRegister', '/UserLogin'].includes(location.pathname)) return null;

    return (
        <div style={{ backgroundColor: "#1E201E", color: "#fff" }}>
            <div className="container py-4">
                <div className="row text-center text-md-start">
                    {/* Logo */}
                    <div className="col-12 col-md-3 mb-4 mb-md-0 d-flex justify-content-center justify-content-md-start">
                        <img src="/Brand.png" alt="Brand" className="img-fluid" style={{ height: "8rem" }} />
                    </div>

                    {/* Navigation Links */}
                    <div className="col-12 col-md-3 mb-4 mb-md-0">
                        <h6 style={{ cursor: "pointer" }} onClick={() => navigate('/Home')}>
                            <i className="fa-solid fa-house"></i> Home
                        </h6>
                        <h6 style={{ cursor: "pointer" }} onClick={() => navigate('/about')}>
                            <i className="fa-solid fa-circle-info"></i> About
                        </h6>
                        <h6 style={{ cursor: "pointer" }} onClick={() => navigate('/Offering')}>
                            <i className="fa-solid fa-envelope"></i> Our Offerings
                        </h6>
                        <h6 style={{ cursor: "pointer" }} onClick={() => navigate('/Contact')}>
                            <i className="fa-solid fa-phone"></i> Contact
                        </h6>
                    </div>

                    {/* Contact Info */}
                    <div className="col-12 col-md-3 mb-4 mb-md-0">
                        <h6><i className="fa-solid fa-phone"></i> 8214624855</h6>
                        <h6><i className="fa-solid fa-envelope"></i> ShivaayFlims@gmail.com</h6>
                        <h6><i className="fa-solid fa-location-dot"></i> BholaRam, Indore (M.P)</h6>
                        <h6><i className="fa-solid fa-globe"></i> www.shivaayflims.com</h6>
                    </div>

                    {/* Contact Us Button */}
                    <div className="col-12 col-md-3 d-flex align-items-center justify-content-center justify-content-md-end">
                        <button className="btn btn-light" onClick={() => navigate('/Contact')}>
                            <i className="fa-solid fa-phone"></i> Contact Us
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="text-white py-3 px-4 d-flex flex-column flex-md-row justify-content-between align-items-center" style={{ backgroundColor: "#181C14" }}>
                <p className="mb-2 mb-md-0">
                    <i className="fa-solid fa-copyright"></i> Shivaay Flims 2023
                </p>

                <div className="d-flex gap-3">
                    <span style={{ cursor: 'pointer' }} onClick={handleToTwitter}>
                        <i className="fa-brands fa-twitter fa-beat fa-lg me-1"></i> Twitter
                    </span>
                    <span style={{ cursor: 'pointer' }} onClick={handleToFacebook}>
                        <i className="fa-brands fa-facebook fa-beat fa-lg me-1"></i> Facebook
                    </span>
                    <span style={{ cursor: 'pointer' }} onClick={handleToLindin}>
                        <i className="fa-brands fa-linkedin fa-beat fa-lg me-1"></i> LinkedIn
                    </span>
                </div>
            </div>
        </div>
    );
}
