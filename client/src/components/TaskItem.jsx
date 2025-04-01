import { useState, useEffect } from 'react';

function TaskForm({ task, onSubmit, buttonText = 'Save'}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    dueDate: '',
    priority: 'medium',
  });

  useEffect(() => {
    if (task) {
      // Format the form date for the date input
      const formattedDate = task.dueDate
        ? new Date(task.dueDate).toISOString().split('T')[0]
        : '';

      setFormData({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'pending',
        dueDate: formattedDate,
        priority: task.priority || 'medium',
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return (
  <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input 
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
        ></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          name="status"
          id="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="dueDate">Due Date</label>
        <input
          type="text"
          id="dueDate"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />
      </div>


    </form>
  )
}
