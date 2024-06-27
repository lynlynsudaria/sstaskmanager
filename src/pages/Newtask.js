// Access.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './Access.css';
import Newtask from './Newtask'; // Import Newtask component

const Access = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <Authenticator>
            {({ signOut, user }) => {
                const userName = user.attributes ? user.attributes.name : user.username;

                const handleSignOut = async () => {
                    await signOut();
                    navigate('/');
                };

                return (
                    <div className="access-container">
                        <header className="navbar">
                            <div className="logo">LOGO</div>
                            <div className="auth-buttons">
                                {user && <span className="welcome-message">{userName}</span>}
                                <button onClick={handleSignOut}>Sign Out</button>
                            </div>
                        </header>
                        <div className="main-content">
                            <aside className="sidebar">
                                <ul>
                                    <li onClick={() => handleNavigation('/')}>Home</li>
                                    <br />
                                    <li onClick={() => handleNavigation('/Newtask')}>New Task</li>
                                    <br />
                                    <li>All Task</li>
                                    <li>Today</li>
                                    <li>Next 7 Days</li>
                                    <br />
                                    <li>Priority</li>
                                    <li>Not Priority</li>
                                    <br />
                                    <li>Work</li>
                                    <li>Finance</li>
                                    <li>Billing</li>
                                    <li>Others</li>
                                </ul>
                            </aside>
                            <div className="content">
                                {/* Display content based on selected navigation */}
                                {/* For New Task page */}
                                <Newtask /> {/* Render Newtask component here */}
                            </div>
                        </div>
                    </div>
                );
            }}
        </Authenticator>
    );
};

export default Access;
