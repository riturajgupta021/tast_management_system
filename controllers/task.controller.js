const { validationResult } = require("express-validator");
const Task = require("../model/task.model");
const client = require("../config/redisClint");





const createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { title, description, dueDate, priority, status } = req.body;
    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      status,
      user: req.user.userId
    });
    res.status(201).json({ "message": "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




const getAllTasks = async (req, res) => {
  try {
    let taskfromCache = await client.get("tasks");
    if (taskfromCache) {
      return res.json({
        "source": "cache",
        "data": JSON.parse(taskfromCache)
      });
    }

    const tasks = await Task.find({ user: req.user.userId }).populate("user");
    await client.set("tasks", JSON.stringify(tasks), { 
      EX: 1 
    });
    res.json({
      "source": "api",
      "data": tasks
    });
  } catch (error) {
    res.status(500).json(error.message);
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
    res.json({ "message": "Task updated successfully", task });
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

module.exports = {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask
};