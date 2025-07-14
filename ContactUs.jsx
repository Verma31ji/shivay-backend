import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ContactUs() {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const workPost = location.state?.workPost || {};
    const user = JSON.parse(localStorage.getItem("userData"));

    const handleMessageChange = (e) => {
        if (e.target.value.length <= 5000) {
            setMessage(e.target.value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            alert("Please login first.");
            return navigate('/UserLogin');
        }

        if (!message.trim()) {
            return alert("Message is required");
        }

        try {
            setLoading(true);
            const { data } = await axios.post("http://localhost:5500/api/query/contact", {
                userId: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                message,
                category: workPost.category || '',
                price: workPost.price || ''
            });

            if (data.success) {
                toast.success("Message sent to admin successfully!");
                setMessage('');
            } else {
                alert(data.msg || "Something went wrong.");
            }
        } catch (err) {
            console.error(err);
            alert("Failed to send message");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <div className="min-vh-100 d-flex align-items-center justify-content-center text-white"
                style={{
                    backgroundImage: "url('https://images.wallpaperscraft.com/image/single/cube_dark_texture_119956_1280x720.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    padding: "2rem"
                }}
            >
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8 col-lg-6">
                            <div
                                className="card p-4 shadow-lg border-0"
                                style={{
                                    backgroundColor: "rgba(255,255,255,0.1)",
                                    backdropFilter: "blur(10px)",
                                    borderRadius: "1rem"
                                }}
                            >
                                <h3 className="text-center text-white mb-4">Let's Connect</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <input type="text" value={user?._id || ''} disabled className="form-control" placeholder="User ID" />
                                    </div>
                                    <div className="mb-3">
                                        <input type="text" value={user?.name || ''} disabled className="form-control" placeholder="Name" />
                                    </div>
                                    <div className="mb-3">
                                        <input type="email" value={user?.email || ''} disabled className="form-control" placeholder="Email" />
                                    </div>
                                    <div className="mb-3">
                                        <input type="text" value={user?.phone || ''} disabled className="form-control" placeholder="Phone" />
                                    </div>
                                    <div className="mb-3">
                                        <input type="text" value={workPost.category || ''} disabled className="form-control" placeholder="Category" />
                                    </div>
                                    <div className="mb-3">
                                        <input type="text" value={workPost.price ? `₹${workPost.price}` : ''} disabled className="form-control" placeholder="Price" />
                                    </div>
                                    <div className="mb-3">
                                        <textarea
                                            className="form-control"
                                            placeholder="Leave a message (max 5000 characters)"
                                            rows={6}
                                            value={message}
                                            onChange={handleMessageChange}
                                            required
                                        />
                                        <small className="text-light">{message.length} / 5000 characters</small>
                                    </div>
                                    <div className="d-grid">
                                        <button
                                            type="submit"
                                            className="btn"
                                            style={{ backgroundColor: "#fb5607", color: "#fff" }}
                                            disabled={loading}
                                        >
                                            {loading ? 'Sending...' : 'Send Message'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
