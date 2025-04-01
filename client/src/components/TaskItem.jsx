import { Link } from 'react-router-dom';

function TaskItem({ task, onDelete }) {
  const getStatusClass = (status) => {
    switch (status){
      case 'completed':
        return 'status-completed';
      case 'in-progress':
        return 'status-in-progress';
      default:
        return 'status-pending';
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority){
      case 'high':
        return 'priority-high';
      case 'low':
        return 'priority-low';
      default:
        return 'priority-medium';
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="task-item">
      <div className="task-content">
        <h3>
          <Link to={`/tasks/${task._id}`}>{task.title}</Link>
        </h3>
        <p className="task-description">
          {task.description || 'No task description provided'}
        </p>
        <div className="task-meta">
          <span className={`tasks-status ${getStatusClass(task.status)}`}>
            {task.status}
          </span>
          <span className={`task-priority ${getPriorityClass(task.priority)}`}>
            {task.priority}
          </span>
          <span className="task-date">Due: {formatDate(task.dueDate)}</span>
        </div>
      </div>
      <div className="task-actions">
        <Link to={`/tasks/${task._id}`} className="btn btn-small">
          View
        </Link>
        <button onClick={() => onDelete(task._id)} className="btn btn-small btn-danger">
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
