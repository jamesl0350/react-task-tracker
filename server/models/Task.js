const mongoose = require('mongoose');
const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, 'Please add a title'],
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending',
    },
    dueDate: {
      type: Date,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model('Task', taskSchema);
