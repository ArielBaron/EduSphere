import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
    return (
        <div className="homepage-container">
            <div className="homepage-banner">
                <h1 className="banner-title">Welcome to eduSphere</h1>
                <p className="banner-subtitle">Unifying academic tools and insights in one platform</p>
            </div>

            <div className="homepage-content">
                <section className="feature-section">
                    <h2 className="section-title">What We Offer</h2>
                    <div className="feature-cards">
                        <Link to="/about#mashov" className="feature-card">
                            <div>
                                <h3>Mashov Integration</h3>
                                <p>Access and manage your Mashov data effortlessly.</p>
                            </div>
                        </Link>
                        <Link to="/about#iscool" className="feature-card">
                            <div>
                                <h3>Iscool Timetable</h3>
                                <p>Stay on top of your schedule with an integrated timetable.</p>
                            </div>
                        </Link>
                        <Link to="/about#insights" className="feature-card">
                            <div>
                                <h3>Learning Insights</h3>
                                <p>Get updates on vacations, exams, and important events.</p>
                            </div>
                        </Link>
                    </div>
                </section>
                    <section className="cta-section">
                        <h2 className="section-title">Dont wanna log in?</h2>
                        <Link to="/general">                
                            <button className="cta-button">Explore anonymously Now!</button>
                        </Link>
                    </section>
                    <section className="cta-section">
                        <h2 className="section-title">Already familar?</h2>
                        <Link to="/login">                
                            <button className="cta-button">Login</button>
                        </Link>
                    </section>
            </div>

        </div>
    );
}

export default HomePage;