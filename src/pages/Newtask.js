import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { API, graphqlOperation } from 'aws-amplify';
import './Newtask.css'; // Import your CSS file
//import schema from '../graphql/schema.json';

const Newtask = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

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
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <input name="title" value={task.title} onChange={handleChange} placeholder="Title" required className="input" />
        <textarea name="description" value={task.description} onChange={handleChange} placeholder="Description" className="textarea" />
        <button type="submit" className="button">Add Task</button>
      </form>
    </div>
  );
};


export default Newtask;
