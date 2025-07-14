import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Header from '../Pages/Header';
import Footer from '../Pages/Footer';

export default function UserLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const invalidAliasRegex = /\+.+@gmail\.com$/;

    const handleToSubmit = async (e) => {
        e.preventDefault();

        if (!gmailRegex.test(email) || invalidAliasRegex.test(email)) {
            toast.error("Only valid Gmail addresses are allowed (no aliases)");
            return;
        }

        try {
            const { data } = await axios.post("http://localhost:5500/api/user/UserLogin", { email, password });

            if (data.success) {
                localStorage.setItem("userData", JSON.stringify({
                    _id: data.user.id,
                    name: data.user.name,
                    email: data.user.email,
                    phone: data.user.phone
                }));

                toast.success("User Logged In Successfully!");
                navigate('/Home');
            } else {
                toast.error(data.msg);
            }
        } catch (error) {
            toast.error("Login Failed. Please try again.");
        }
    };

    return (
        <div className='d-flex flex-column min-vh-100' style={{
            backgroundImage: "url('https://images.wallpaperscraft.com/image/single/cube_dark_texture_119956_1280x720.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
        }}>
            <Header />

            <div className="flex-grow-1 d-flex justify-content-center align-items-center px-3" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
                <div className="w-100" style={{ maxWidth: '450px' }}>
                    <div className="p-4 text-white shadow-lg"
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.08)',
                            backdropFilter: 'blur(18px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '1.5rem'
                        }}>
                        <div className="text-center mb-4">
                            <h2 style={{ fontFamily: 'cursive', fontWeight: '700' }}>Welcome Back</h2>
                            <p className="text-light">Login to your Shivaay Films account</p>
                        </div>

                        <form onSubmit={handleToSubmit}>
                            <input
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Email Address'
                                className='form-control mt-3 p-3 rounded-pill border-0'
                                autoFocus
                                required
                            />

                            <div className="position-relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder='Password'
                                    className='form-control mt-3 p-3 rounded-pill border-0'
                                    required
                                />
                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: '20px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        cursor: 'pointer',
                                        color: '#333'
                                    }}
                                >
                                    {showPassword ? '🙈' : '👁️'}
                                </span>
                            </div>

                            <button
                                type='submit'
                                className="btn btn-warning w-100 mt-4 py-2 rounded-pill fw-bold"
                                style={{ fontSize: '1.1rem' }}
                            >
                                Login Now
                            </button>
                        </form>

                        <div className="text-center mt-4">
                            <p>
                                New to Shivaay Films?{" "}
                                <span
                                    className="text-warning fw-bold"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => navigate('/UserRegister')}
                                >
                                    Register Now
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
