import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDarkMode } from '../Context/DarkModeContect';

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const { darkMode, toggleDarkMode } = useDarkMode();


    const handleLogout = async () => {
        try {
            await axios.post("/api/auth/logout", {}, { withCredentials: true });
            toast.success("User Logged Out Successfully");
            navigate('/UserLogin');
        } catch (error) {
            console.error("Logout failed", error);
        }
    };


    if (['/UserRegister', '/UserLogin'].includes(location.pathname)) return null;

    return (
        <div
            className="py-3"
            style={{
                backgroundImage: darkMode ? "linear-gradient(135deg , #0f2027, #203a43, #2c5364)" : "none",
                backgroundColor: darkMode ? undefined : "#f9f9f9",
                color: darkMode ? "#fff" : "#222",
            }}
        >

            <div className="container">
                <div className="row align-items-center justify-content-between">

                    <div className="col-12 col-md-3 text-center text-md-start mb-2 mb-md-0">
                        <img
                            src="/Brand.png"
                            alt="Brand Logo"
                            className="img-fluid"
                            style={{ height: "4rem", cursor: "pointer" }}
                            onClick={() => navigate('/Home')}
                        />
                    </div>


                    <div className="col-12 col-md-6 text-center mb-2 mb-md-0">
                        <div className="d-flex flex-wrap justify-content-center gap-3">
                            <h6 style={{ cursor: 'pointer' }} onClick={() => navigate('/Home')}>🏠 Home</h6>
                            <h6 style={{ cursor: 'pointer' }} onClick={() => navigate('/about')}>ℹ️ About</h6>
                            <h6 style={{ cursor: 'pointer' }} onClick={() => navigate('/Offering')}>🎁 Offerings</h6>
                            <h6 style={{ cursor: 'pointer' }} onClick={() => navigate('/Contact')}>📞 Contact</h6>
                            <h6 style={{ cursor: 'pointer' }} onClick={() => navigate('/ShootOrder')}>📝 Post</h6>
                        </div>
                    </div>


                    <div className="col-12 col-md-3 text-center text-md-end">
                        <div className="d-flex justify-content-center justify-content-md-end gap-2 flex-wrap">
                            <button onClick={handleLogout} className="btn btn-sm btn-danger">
                                Logout
                            </button>
                            <button onClick={toggleDarkMode} className="btn btn-sm btn-outline-secondary">
                                {darkMode ? 'Light Mode' : 'Dark Mode'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
