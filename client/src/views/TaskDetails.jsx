import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {getTask, updateTask, deleteTask } from '../api';
import TaskForm from '../components/TaskForm.jsx';

function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const data = await getTask(id);
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      const updatedTask = await updateTask(id, taskData);
      setTask(updatedTask);
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update task');
      console.error(err);
    }
  };

  const handleDeleteTask = async () => {
    try {
      await deleteTask(id);
      navigate('/tasks');
    } catch (err) {
      setError('Failed to delete task');
      console.error(err);
    }
  };

  // Format date
  const formateDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Format date and time
  const formatDateTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (isLoading) {
    return <p>Loading task...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>
  }

  if (!task) {
    return <p>Task not found</p>;
  }

  return (
    <div className="task-details">
      <div className="task-header">
        <h1>{task.title}</h1>
        <div className="task-actions">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className='btn'
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          <button
            onClick={handleDeleteTask}
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      </div>

      {isEditing ? (
        <TaskForm
          task={task}
          onSubmit={handleUpdateTask}
          buttonText="Update Task"
        />
      ) : (
        <div className="task-info">
            <div className="task-meta">
              <div className="meta-item">
                <span className="label">Status:</span>
                <span className={`value status-${task.status}`}>{task.status}</span>
              </div>
              <div className="meta-item">
                <span className="label">Priority:</span>
                <span className={`value priority-${task.priority}`}>{task.priority}</span>
              </div>
              <div className="meta-item">
                <span className="label">Due Date:</span>
                <span className="value">{formatDate(task.dueDate)}</span>
              </div>
            </div>

            <div className="task-description">
              <h3>Description</h3>
              <p>{task.description || 'No description provided'}</p>
            </div>

            <div className="task-timestamps">
              <p>Created: {formatDateTime(task.createdAt)}</p>
              <p>Last Updated: {formatDateTime(task.updatedAt)}</p>
            </div>
          </div>
      )}
    </div>
  );
}

export default TaskDetails;
