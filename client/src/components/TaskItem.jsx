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

}
