import React, { useState, useEffect } from 'react';
import { retrieveTasks, createTask, updateTask, deleteTask } from "../API";
import { useNavigate } from 'react-router-dom';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('pending');
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchTasks = async () => {
        const token = localStorage.getItem('token');
        const headers = { 'x-auth-token': token };
        if (!token) {
          navigate('/login');
          return;
        }
        try {
            const response = await retrieveTasks(headers);
            setTasks(response.data);
        } catch (err) {
            // Check if the error is related to authentication (e.g., token expired or unauthorized)
            if (err.response && (err.response.status === 401 || err.response.status === 403)) {
            // If unauthorized or forbidden, remove the token and redirect to login
            localStorage.removeItem('token');
            navigate('/login');
          } else {
            // Log other errors to the console if needed (for debugging purposes)
            console.error("An unexpected error occurred:", err);
          }
        }
    };
    fetchTasks();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const headers = { 'x-auth-token': token };
    try {
      await createTask({ title, description, status, dueDate },headers);
      setTitle('');
      setDescription('');
      setStatus('pending');
      const response = await retrieveTasks(headers);
      setTasks(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    const headers = { 'x-auth-token': token };
    try {
      await deleteTask(id, headers);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (id, newStatus) => {
    const token = localStorage.getItem('token');
    const headers = { 'x-auth-token': token };
    try {
      await updateTask(id, { status: newStatus }, headers);
      const response = await retrieveTasks(headers);
      setTasks(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Tasks</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label>Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <button onClick={() => handleUpdate(task._id, task.status === 'pending' ? 'completed' : 'pending')}>
              Mark as {task.status === 'pending' ? 'Completed' : 'Pending'}
            </button>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskPage;
