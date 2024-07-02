import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import { Form } from 'react-formio';
import '@aws-amplify/ui-react/styles.css';
import './Attendance.css';
import '../style/custom-styles.css';

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
                                    <br />
                                    <li onClick={() => handleNavigation('/Newtask')}>Task Management</li>
                                    <br />
                                    <li onClick={() => handleNavigation('/Attendance')}>Attendance</li>
                                    <br />
                                    <li onClick={() => handleNavigation('/')}>Home</li>
                                    <br />
                                </ul>
                            </aside>
                            <div className="content">
                                <h1>Manage Attendance</h1>
                                <Form src="https://nsxfomhvoaxgamw.form.io/attendance" />
                            </div>
                        </div>
                    </div>
                );
            }}
        </Authenticator>
    );
};

export default Attendance;
