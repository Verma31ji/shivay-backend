import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserHomePage() {
    const navigate = useNavigate();

    return (
        <div
            className="d-flex flex-column min-vh-100 text-white"
            style={{
                backgroundImage: "url('https://images.wallpaperscraft.com/image/single/cube_dark_texture_119956_1280x720.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* Overlay */}
            <div
                className="flex-grow-1 d-flex align-items-center justify-content-center px-3"
                style={{
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    padding: '2rem',
                }}
            >
                <div className="text-center" style={{ maxWidth: "900px", width: "100%" }}>
                    <img
                        src="https://static.vecteezy.com/system/resources/previews/059/881/366/non_2x/indian-welcome-namaste-hands-free-png.png"
                        alt="Namaste"
                        className="img-fluid"
                        style={{ height: "5rem", objectFit: 'contain' }}
                    />
                    <h1
                        className="mt-3 text-warning"
                        style={{
                            fontFamily: 'cursive',
                            fontWeight: '700',
                            fontSize: "2.8rem"
                        }}
                    >
                        Welcome to <span className="text-light">Shivaay Films</span> 🎬
                    </h1>
                    <p
                        className="mt-3 px-2"
                        style={{
                            fontSize: "1.2rem",
                            fontFamily: 'cursive',
                            maxWidth: "700px",
                            margin: "auto"
                        }}
                    >
                        We're excited to have you here! Dive into a world of creativity, passion, and unforgettable moments.
                    </p>

                    <div className="mt-5 d-flex justify-content-center gap-3 flex-wrap">
                        <button
                            onClick={() => navigate('/UserRegister')}
                            className="btn btn-outline-warning px-4 py-2 rounded-pill fw-bold"
                        >
                            Register
                        </button>
                        <button
                            onClick={() => navigate('/UserLogin')}
                            className="btn btn-warning px-4 py-2 rounded-pill fw-bold"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => navigate('/Home')}
                            className="btn btn-warning px-4 py-2 rounded-pill fw-bold"
                        >
                            Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
