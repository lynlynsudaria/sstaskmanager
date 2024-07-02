import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { Authenticator, withAuthenticator } from '@aws-amplify/ui-react';
import { Form } from 'react-formio';
import { API, Auth } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import './Access.css';

Modal.setAppElement('#root');

const Access = () => {
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [adminList, setAdminList] = useState([]);
    const [employeeList, setEmployeeList] = useState([]);
    const [displayTable, setDisplayTable] = useState('');

    const openModal = (type) => {
        setModalType(type);
        setModalIsOpen(true);
    };

    const closeModal = () => setModalIsOpen(false);

    const handleFormSubmit = async (submission) => {
        const { data } = submission;

        // Extract necessary fields
        const { name, email, username } = data;

        // Perform basic validation
        if (!name || !email || !username) {
            alert('All fields are required.');
            return;
        }

        try {
            // Example of making an authenticated API request
            const apiName = 'tmapi';
            const path = 'https://qy4c52xisg.execute-api.us-east-2.amazonaws.com/dev';
            const myInit = {
                body: {
                    name: data.name,
                    email: data.email,
                    username: data.username
                },
                headers: {
                    Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
                }
            };

            await API.post(apiName, path, myInit);

            // Add submission to the appropriate list
            if (modalType === 'admin') {
                setAdminList([...adminList, { name: data.name, email: data.email, username: data.username }]);
            } else if (modalType === 'employee') {
                setEmployeeList([...employeeList, { name: data.name, email: data.email, username: data.username }]);
            }

            closeModal();
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("An error occurred while submitting the form.");
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
                        <div className="main-contents">
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
                            <div className="contents">
                                <div className="manage-buttons">
                                    <button onClick={() => { setDisplayTable('admin'); openModal('admin'); }}>Manage Admin</button>
                                    <button onClick={() => { setDisplayTable('employee'); openModal('employee'); }}>Manage Employee</button>
                                </div>

                                {displayTable === 'admin' && (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Username</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {adminList.map((admin, index) => (
                                                <tr key={index}>
                                                    <td>{admin.name}</td>
                                                    <td>{admin.email}</td>
                                                    <td>{admin.username}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}

                                {displayTable === 'employee' && (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Username</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {employeeList.map((employee, index) => (
                                                <tr key={index}>
                                                    <td>{employee.name}</td>
                                                    <td>{employee.email}</td>
                                                    <td>{employee.username}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            contentLabel={modalType === 'admin' ? "Add Admin Info" : "Add Employee Info"}
                            className="modal"
                            overlayClassName="overlay"
                        >
                            <h2>{modalType === 'admin' ? "ADD ADMIN INFO" : "ADD EMPLOYEE INFO"}</h2>
                            <button onClick={closeModal} className="close-button">&times;</button>
                            <Form
                                src={modalType === 'admin' ? "https://nsxfomhvoaxgamw.form.io/adminform" : "https://nsxfomhvoaxgamw.form.io/addemployee"}
                                onSubmitDone={handleFormSubmit} // Handle form submission locally
                            />
                        </Modal>
                    </div>
                );
            }}
        </Authenticator>
    );
};

export default withAuthenticator(Access);
