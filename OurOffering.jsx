import React from 'react';
import Footer from './Footer';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

export default function OurOffering() {
    const navigate = useNavigate();

    return (
        <>
            <Header />

            {/* Banner Section */}
            <div className="text-center text-white d-flex justify-content-center align-items-center"
                style={{
                    backgroundImage: "url('/adpic.webp')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "30rem",
                    fontSize: "2.5rem",
                    fontWeight: "700"
                }}
            >
                From us, you can enjoy the following:
            </div>

            <div className="container py-5">
                {/* Header Text */}
                <div className="text-center mb-5">
                    <h3 style={{ fontSize: "2rem", fontFamily: "revert-layer" }}>
                        We offer different products and services to our loyal customers in Dr. Ambedkar Nagar.
                    </h3>
                </div>

                {/* Offering 1 */}
                <div className="row mb-5">
                    <div className="col-12 col-md-6 mb-3 mb-md-0">
                        <img
                            src="https://images.wallpaperscraft.com/image/single/camera_glare_reflection_195277_1280x720.jpg"
                            alt="Environment"
                            className="img-fluid rounded"
                            style={{ height: "100%", objectFit: "cover" }}
                        />
                    </div>
                    <div className="col-12 col-md-6 d-flex align-items-center" style={{ backgroundColor: "#9e9090ff" }}>
                        <div className="p-4">
                            <h2>A Great Working Environment</h2>
                            <p>We don't want you to dread Mondays. We build a positive, empowering space for growth.</p>
                            <p className="text-danger" role="button" onClick={() => navigate('/Contact')}>Contact Us</p>
                        </div>
                    </div>
                </div>

                {/* Offering 2 */}
                <div className="row mb-5 flex-md-row-reverse">
                    <div className="col-12 col-md-6 mb-3 mb-md-0">
                        <img
                            src="https://images.wallpaperscraft.com/image/single/laptop_backlight_colorful_194324_1280x720.jpg"
                            alt="Salaries"
                            className="img-fluid rounded"
                            style={{ height: "100%", objectFit: "cover" }}
                        />
                    </div>
                    <div className="col-12 col-md-6 d-flex align-items-center" style={{ backgroundColor: "#9e9090ff" }}>
                        <div className="p-4">
                            <h2>Competitive Salaries</h2>
                            <p>We reward our team well. If you help us grow, we ensure you're paid accordingly.</p>
                            <p className="text-danger" role="button" onClick={() => navigate('/Contact')}>Contact Us</p>
                        </div>
                    </div>
                </div>

                {/* Offering 3 */}
                <div className="row mb-5">
                    <div className="col-12 col-md-6 mb-3 mb-md-0">
                        <img
                            src="https://images.wallpaperscraft.com/image/single/drone_camera_technology_171576_1280x720.jpg"
                            alt="Benefits"
                            className="img-fluid rounded"
                            style={{ height: "100%", objectFit: "cover" }}
                        />
                    </div>
                    <div className="col-12 col-md-6 d-flex align-items-center" style={{ backgroundColor: "#9e9090ff" }}>
                        <div className="p-4">
                            <h2>Employee Benefits</h2>
                            <p>From paid time off to overtime pay — we offer complete support to our team.</p>
                            <p className="text-danger" role="button" onClick={() => navigate('/Contact')}>Contact Us</p>
                        </div>
                    </div>
                </div>

                {/* Final Call to Action */}
                <div className="row mb-5">
                    <div
                        className="col-12 text-center d-flex justify-content-center align-items-center"
                        style={{
                            backgroundImage: "url('https://images.wallpaperscraft.com/image/single/keyboard_backlight_red_136083_1280x720.jpg')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            height: "30rem"
                        }}
                    >
                        <div className="p-4 rounded" style={{ maxWidth: "400px" }}>
                            <p style={{ fontSize: "2rem", fontWeight: "700" }}>We Move Differently</p>
                            <p>We are a team of ambitious entrepreneurs operating in Dr. Ambedkar Nagar.</p>
                            <button
                                onClick={() => navigate('/Contact')}
                                className="btn btn-dark w-100"
                            >
                                <i className="fa-solid fa-phone"></i> Contact Us
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
