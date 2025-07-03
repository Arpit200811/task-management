import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import API from '../api';
import { setTasks, deleteTask } from '../redux/taskSlice';
import TaskEditForm from './TaskEditForm';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await API.get('/tasks');
        dispatch(setTasks(data));
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, [dispatch]);

  const handleDelete = async (taskId) => {
    try {
      await API.delete(`/tasks/${taskId}`);
      dispatch(deleteTask(taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className={`p-4 mb-2 rounded-lg shadow-md text-white ${task.priority === 'High' ? 'bg-red-500' : task.priority === 'Medium' ? 'bg-orange-400' : 'bg-green-500'}`}>
            <div className="flex justify-between items-center">
              <span className="text-lg">{task.title} - <span className="italic">{task.status}</span></span>
              <div>
                <button className="bg-blue-600 px-3 py-1 rounded text-white mr-2" onClick={() => setEditTask(task)}>Edit</button>
                <button className="bg-red-600 px-3 py-1 rounded text-white" onClick={() => handleDelete(task._id)}>Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {editTask && <TaskEditForm task={editTask} closeEdit={() => setEditTask(null)} />}
    </div>
  );
};

export default TaskList;
