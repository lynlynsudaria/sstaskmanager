import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './Attendance.css';

const Attendance = () => {
    const navigate = useNavigate();

    return (
        <Authenticator>
            {({ signOut, user }) => {
                const userName = user.attributes ? user.attributes.name : user.username;

                const handleSignOut = async () => {
                    await signOut();
                    navigate('/');
                };

                const handleNavigation = (path) => {
                    navigate(path);
                };

                return (
                    <div className="access-container">
                        <header className="navbar">
                            <div className="logo">ETMS</div>
                            <div className="auth-buttons">
                                {user && <span className="welcome-message">{userName}</span>}
                                <button onClick={handleSignOut}>Sign Out</button>
                            </div>
                        </header>
                        <div className="main-content">
                            <aside className="sidebar">
                                <ul>
                                    <li onClick={() => handleNavigation('/Access')}>Administration</li>
                                    <br></br>
                                    <li onClick={() => handleNavigation('/Newtask')}>Task Management</li>
                                    <br></br>
                                    <li onClick={() => handleNavigation('/Attendance')}>Attendance</li>
                                    <br></br>
                                    <li onClick={() => handleNavigation('/')}>Home</li>
                                    <br></br>
                                </ul>
                            </aside>
                            <div className="content">
                            <h1>Manage Attendance</h1>
                            </div>
                        </div>
                    </div>
                );
            }}
        </Authenticator>
    );
};

export default Attendance;
