import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './Home.css'; // Import CSS for styling

const Home = () => {
    const [loggedIn, setLoggedIn] = useState(false); // State to track login status
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleLoginToggle = () => {
        setLoggedIn(prevLoggedIn => !prevLoggedIn);
        navigate('/Access'); // Redirect to Access page on login toggle
    };

    const handleRegister = () => {
        navigate('/Access'); // Redirect to Access page on register
    };

    const handleGetStarted = () => {
        if (loggedIn) {
            navigate('/signed-in'); // Redirect to signed-in part if logged in
        } else {
            navigate('/Access'); // Redirect to Access page if not logged in
        }
    };

    return (
        <div className="home-container">
            <div className="header">
                <h3>LOGO</h3>
                <div className="auth-buttons">
                    {loggedIn ? (
                        <button onClick={handleLoginToggle}>Sign Out</button>
                    ) : (
                        <button onClick={handleLoginToggle}>Sign In</button>
                    )}
                    <button onClick={handleRegister}>Register</button>
                </div>
            </div>
            <div className="content">
                <h1>TASK MANAGER</h1>
                <div className="quote">
                    <p>"Organize your life with Task Manager!"</p>
                </div>
                <button className="get-started-button" onClick={handleGetStarted}>Get Started</button>
                <p>The key is not to prioritize what's on your schedule, but to schedule your priorities. --Stephen Covey</p>
            </div>
            <footer className="footer">
                <div className="rating">
                    <p>Rate our application:</p>
                    <div className="stars">
                        ★★★★☆
                    </div>
                </div>
                <div className="additional-info">
                    <p>Contact Us | Privacy Policy | Terms of Service</p>
                </div>
            </footer>
        </div>
    );
}

export default Home;
