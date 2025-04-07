import { useState, useEffect } from 'react';
import { getTasks, deleteTask } from '../api';
import TaskItem from '../components/TaskItem';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const data = await getTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      setError('Failed to delete task');
      console.error(err);
    }
  };

  // Filter tasks based on status
  const filteredTasks = filter === 'all'
    ? tasks
    : tasks.filter(task => task.status === filter);

  return (
  <div className="task-list-page">
      <h1>All Tasks</h1>

      <div className="filter-control">
        <button
          className={`filter-btn ${filter === 'all'} ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`filter-btn ${filter === 'pending'} ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button
          className={`filter-btn ${filter === 'in-progress'} ? 'active' : ''}`}
          onClick={() => setFilter('in-progress')}
        >
          In Progress
        </button>
        <button
          className={`filter-btn ${filter === 'completed'} ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      {isLoading ? (
        <p>Loading tasks...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : filteredTasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <div className="task-list">
          {filteredTasks.map(task => (
          <TaskItem
              key={task._id}
              task={task}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;
