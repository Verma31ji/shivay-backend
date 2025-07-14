import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Header from '../Pages/Header';
import Footer from '../Pages/Footer';

export default function UserRegister() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const invalidAliasRegex = /\+.+@gmail\.com$/;

    const HandleToSubmit = async (e) => {
        e.preventDefault();

        if (!gmailRegex.test(email) || invalidAliasRegex.test(email)) {
            toast.error("Only valid Gmail addresses are allowed (no aliases)");
            return;
        }

        if (phone.length !== 10) {
            toast.error("Phone number must be exactly 10 digits");
            return;
        }

        try {
            const { data } = await axios.post("http://localhost:5500/api/user/UserRegister", {
                name,
                email,
                phone,
                password
            });

            if (data.success) {
                toast.success("User Registered Successfully!");
                navigate('/UserLogin');
            } else {
                toast.error(data.msg);
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <div className='d-flex flex-column min-vh-100' style={{
            backgroundImage: "url('https://images.wallpaperscraft.com/image/single/cube_dark_texture_119956_1280x720.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        }}>
            <Header />

            <div className="flex-grow-1 d-flex justify-content-center align-items-center px-3" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
                <div className="w-100" style={{ maxWidth: '450px' }}>
                    <div className="p-4 text-white shadow-lg"
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            backdropFilter: 'blur(15px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '1.5rem'
                        }}>
                        <div className="text-center mb-4">
                            <h2 style={{ fontFamily: 'cursive', fontWeight: '700' }}>Create Your Account</h2>
                            <p className="text-light">Join Shivaay Films and experience the magic.</p>
                        </div>

                        <form onSubmit={HandleToSubmit}>
                            <input
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder='Full Name'
                                className='form-control mt-3 p-3 rounded-pill border-0'
                                required
                            />
                            <input
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Email Address'
                                className='form-control mt-3 p-3 rounded-pill border-0'
                                required
                            />
                            <input
                                type='tel'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder='Phone Number'
                                pattern='[0-9]{10}'
                                maxLength='10'
                                className='form-control mt-3 p-3 rounded-pill border-0'
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
                                        color: '#ccc'
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
                                Register Now
                            </button>
                        </form>

                        <div className="text-center mt-3">
                            <p>
                                Already a member?{" "}
                                <span
                                    onClick={() => navigate('/UserLogin')}
                                    className="text-warning fw-bold"
                                    style={{ cursor: "pointer" }}
                                >
                                    Login here
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
