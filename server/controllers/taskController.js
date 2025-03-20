const Task = require('../models/Task');

// @desc Get all tasks
// @route GET /api/tasks
// @access Public
const getTasks = async(req, res, next) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1});
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

// @desc Get single task
// @route GET /api/tasks/:id
// @access Public
const getTask = async (req, res, next) => {
  try{
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    res.status(200).json(task);
  } catch (error){
    next(error);
  }
};

// @desc Create a task
// @route POST /api/tasks
// @access Public
const createTask = async (req, res, next) => {
  try {
    const { title, description, status, dueDate, priority} = req.body;

    if (!title) {
      res.status(400);
      throw new Error('Please add a title');
    }

    const task = await Task.create({
      title,
      description,
      status,
      dueDate,
      priority,
    });

    res.status(201).json(task);
  } catch (error) {
    next(error) 
  }
};

// @desc Update a task
// @route PUT /api/tasks/:id
// @access Public
const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedTask);
  } catch (error) {
    next(error) 
  }
};

// @desc Delete a task
// @route DELETE /api/tasks/:id
// @access Public
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    await task.deleteOne();

    res.status(200).json({ id: req.params.id });
  } catch (error) {
    next(error) 
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
