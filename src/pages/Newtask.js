import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './Newtask.css';

const Newtask = () => {
    const navigate = useNavigate();
    const createTask = `mutation CreateTask($input: CreateTaskInput!) {
        createTask(input: $input) {
            id
            title
            description
        }
    }`;

    const [task, setTask] = useState({ title: '', description: '' });

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.graphql(graphqlOperation(createTask, { input: task }));
            setTask({ title: '', description: '' });
            navigate('/'); // Navigate back to home page after adding task
        } catch (err) {
            console.error('Error creating task:', err);
        }
    };

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
                                <h1>Create New Task</h1>
                                <form onSubmit={handleSubmit} className="form">
                                    <input
                                        name="title"
                                        value={task.title}
                                        onChange={handleChange}
                                        placeholder="Title"
                                        required
                                        className="input"
                                    />
                                    <textarea
                                        name="description"
                                        value={task.description}
                                        onChange={handleChange}
                                        placeholder="Description"
                                        className="textarea"
                                    />
                                    <button type="submit" className="button">Add Task</button>
                                </form>
                            </div>
                        </div>
                    </div>
                );
            }}
        </Authenticator>
    );
};

export default Newtask;
