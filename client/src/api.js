const PORT = process.env.PORT;
const API_URL = `${PORT}`;

// Get all tasks
export const getTasks = async() => {
  const res = await fetch(`${API_URL}/tasks`);
  const data = await res.json();

  if (!res.ok){
    throw new Error(data.message || 'Failed to fetch tasks');
  }

  return data
};

// Get a single task
export const getTask = async (id) => {
  const res = await fetch(`${API_URL}/tasks/${id}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Failed to fetch task');
  }

  return data;
};

// Create a new task
export const createTask = async (taskData) => {
  const res = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    header: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Failed to create task');
  }
  return data;
};

// Update a task
export const updateTask = async (id, taskData) => {
  const res = await fetch(`${API_URL}/tasks${id}`, {
    method: 'PUT',
    header: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Failed to update task');
  }

  return data;
};


