const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  const { title, description, dueDate, priority } = req.body;

  const task = new Task({
    title,
    description,
    dueDate,
    priority,
    userId: req.user.id
  });

  await task.save();
  res.json(task);
});

router.get('/', auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.json(tasks);
});

router.get('/:id', auth, async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task || task.userId.toString() !== req.user.id) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.json(task);
});

router.put('/:id', auth, async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task || task.userId.toString() !== req.user.id) {
    return res.status(404).json({ message: 'Task not found' });
  }

  task.title = req.body.title || task.title;
  task.description = req.body.description || task.description;
  task.dueDate = req.body.dueDate || task.dueDate;
  task.priority = req.body.priority || task.priority;
  task.status = req.body.status || task.status;

  await task.save();
  res.json(task);
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.userId.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await Task.deleteOne({ _id: req.params.id });

    res.json({ message: 'Task Deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});


module.exports = router;
