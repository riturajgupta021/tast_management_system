const { validationResult } = require("express-validator");
const Task = require("../model/task.model");

const createTask = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { title, description, dueDate, priority, status } = req.body;
        const task = await Task.create({ title, description, dueDate, priority, status, user: req.user.userId });
        res.status(201).json(task);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
};
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.userId }).populate('user');
        res.json(tasks);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
};
const getSingleTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.json(task);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
};
const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("user");
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.json(task);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
};

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.json({ message: 'Task deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
};

module.exports = { createTask, getAllTasks, getSingleTask, updateTask, deleteTask };