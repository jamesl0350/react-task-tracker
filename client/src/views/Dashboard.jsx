import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { getTasks } from '../api';
import TaskForm from '../components/TaskForm'
import TaskItem from '../components/TaskItem';
import { createTask, deleteTask } from '../api';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading ] = useState(true);
  const [error, setError ] = useState(null);

  // Fetch tasks on component mount
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

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await createTask(taskData);
      setTasks([newTask, ...tasks]);
    } catch (err) {
      setError('Failed to create task');
      console.error(err)
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      setError('Failed to delete task')
      console.error(err)
    }
  };

  // Get tasks by status
  const pendingTasks = tasks.filter(task => task.status === 'pending');
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress');
  const completedTasks = tasks.filter(task => task.status === 'completed');

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="dashboard-summary">
        <div className="summary-card">
          <h3>Pending</h3>
          <p className="count">{pendingTasks.length}</p>
        </div>
        <div className="summary-card">
          <h3>In Progress</h3>
          <p className="count">{inProgressTasks.length}</p>
        </div>
        <div className="summary-card">
          <h3>Completed</h3>
          <p className="count">{completedTasks.length}</p>
        </div>
        <div className="summary-card">
          <h3>Total</h3>
          <p className="count">{tasks.length}</p>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="create-task">
          <h2>Create New Task</h2>
          <TaskForm onSubmit={handleCreateTask} buttonText="Create Task" />
        </div>

        <div className="recent-tasks">
          <div className="header-actions">
            <h2>Recent Tasks</h2>
            <Link to="/tasks" className="btn">View All Tasks</Link>
          </div>

          {isLoading ? (
            <p>Loading tasks...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : tasks.length === 0 ? (
            <p>No tasks found. Create you first task!</p>
          ) : (
            <div className="task-list">
                    {tasks.slice(0, 5).map(task => (
                      <TaskItem
                        key={task._id}
                        task={task}
                        onDelete={handleDeleteTask}
                      />
                    ))}
                  </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
