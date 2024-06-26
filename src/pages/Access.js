import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './Access.css'; // Import CSS for styling

const Access = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook

    return (
       <Authenticator>
        {({ signOut, user }) => {
            // Extract the name from the user attributes
            const userName = user.attributes ? user.attributes.name : user.username;

            const handleSignOut = async () => {
                await signOut(); // Sign out the user
                navigate('/'); // Redirect to home page
            };

            const handleNavigation = (path) => {
                navigate(path); // Navigate to the specified path
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
                                <br></br>
                                <li>New Task</li>
                                <br></br>
                                <li>All Task</li>
                                <li>Today</li>
                                <li>Next 7 Days</li>
                                <br></br>
                                <li>Priority</li>
                                <li>Not Priority</li>
                                <br></br>
                                <li>Work</li>
                                <li>Finance</li>
                                <li>Billing</li>
                                <li>Others</li>
                            </ul>
                        </aside>
                        <div className="content">
                            <h4>All Task</h4>
                            
                        </div>
                    </div>
                </div>
            );
        }}
       </Authenticator>
    );
};

export default Access;
