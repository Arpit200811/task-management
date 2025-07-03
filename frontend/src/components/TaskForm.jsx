import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import API from '../api';
import { addTask } from '../redux/taskSlice';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/tasks', { title, description, dueDate, priority });
      dispatch(addTask(data));
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('Medium');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto mt-6 bg-white shadow-md rounded-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">Add New Task</h2>
      
      <input 
        type="text" 
        placeholder="Task Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        required 
        className="w-full border-b border-gray-400 py-2 mb-4 focus:outline-none focus:border-blue-500"
      />

      <input 
        type="text" 
        placeholder="Task Description" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        required 
        className="w-full border-b border-gray-400 py-2 mb-4 focus:outline-none focus:border-blue-500"
      />

      <input 
        type="date" 
        value={dueDate} 
        onChange={(e) => setDueDate(e.target.value)} 
        required 
        className="w-full border-b border-gray-400 py-2 mb-4 focus:outline-none focus:border-blue-500"
      />

      <select 
        value={priority} 
        onChange={(e) => setPriority(e.target.value)} 
        className="w-full border-b border-gray-400 py-2 mb-6 focus:outline-none focus:border-blue-500"
      >
        <option value="Low">Low Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="High">High Priority</option>
      </select>

      <button 
        type="submit" 
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
