import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function ShootOrder() {
    const [posts, setPosts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5500/api/GetAllPost');
                setPosts(response.data.WorkPost || []);
            } catch (err) {
                console.error(err);
            }
        };
        fetchPosts();
    }, []);

    const handlePlaceOrder = (workPost) => {
        const user = JSON.parse(localStorage.getItem("userData"));
        if (!user) {
            alert("Please login to continue.");
            return navigate("/UserLogin");
        }
        navigate("/Contact", { state: { workPost } });
    };

    const filteredPosts =
        selectedCategory === 'All'
            ? posts
            : posts.filter((post) => post.category === selectedCategory);

    const categories = [
        'All',
        'Pre-Wedding',
        'Wedding',
        'Song',
        'Baby Shoot',
        'Event',
        'Portfolio'
    ];

    return (
        <>
            <Header />
            <div className="min-vh-100 py-5"
                style={{
                    backgroundImage: "linear-gradient(135deg, #fcb045, #fd1d1d, #833ab4)",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>

                <div className="container text-white text-center mb-4">
                    <h1 style={{
                        fontFamily: 'cursive',
                        fontWeight: '700',
                        fontSize: '2.5rem',
                        background: 'linear-gradient(to right, #00c6ff, #0072ff)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>
                        Book Your Shoot With Us 🎥
                    </h1>

                    {/* Category Filter Buttons */}
                    <div className="d-flex flex-wrap justify-content-center mt-4 gap-3">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`btn ${selectedCategory === category ? 'btn-primary' : 'btn-outline-light'} px-4`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="container">
                    <div className="row justify-content-center">
                        {filteredPosts.length === 0 ? (
                            <p className="text-light text-center">No shoots found in this category.</p>
                        ) : (
                            filteredPosts.map((workPost) => (
                                <div key={workPost._id} className="col-12 col-sm-10 col-md-6 col-lg-4 mb-4 d-flex align-items-stretch">
                                    <div className="card text-white w-100"
                                        style={{
                                            backgroundColor: 'rgba(255,255,255,0.12)',
                                            backdropFilter: 'blur(15px)',
                                            borderRadius: '20px',
                                        }}
                                    >
                                        <span className="badge text-light bg-danger position-absolute top-0 end-0 m-2" style={{ fontSize: '13px' }}>
                                            📷 Clicked by: {workPost.clickBy}
                                        </span>
                                        <img
                                            src={workPost.image}
                                            alt={workPost.title}
                                            className="card-img-top img-fluid"
                                            style={{ height: '20rem', objectFit: 'cover', borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}
                                        />
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title">🏷️ Title: {workPost.title}</h5>
                                            <h6>📍 Location: {workPost.location}</h6>
                                            <p>💡 Description: {workPost.description}</p>
                                            <p>📅 Date: {workPost.date}</p>
                                            <p>📂 Category: {workPost.category || 'Other'}</p>
                                            <p>💰 Price: ₹{workPost.price || 'N/A'}</p>

                                            <button
                                                className="btn btn-success rounded-pill mt-auto w-100"
                                                onClick={() => handlePlaceOrder(workPost)}
                                            >
                                                📩 Book This Shoot
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
