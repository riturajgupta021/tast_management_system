const express = require("express");
const taskRouter = express.Router();
const { createTask, getAllTasks, getSingleTask, updateTask, deleteTask } = require("../controllers/task.controller");
const { body } = require("express-validator");
const authMiddleware = require("../middleware/auth");


taskRouter.post("/create_task", authMiddleware, [
    body('title').isString().notEmpty().isLength({ min: 6, max: 50 }),
    body('description').isString().notEmpty().isLength({ min: 10, max: 100 }),
    body('priority').isIn(['Low', 'Medium', 'High']),
    body('status').isIn(['Pending', 'In Progress', 'Completed']),
    body('dueDate').isISO8601().custom(value => {
        if (new Date(value) < new Date()) {
            throw new Error('Due date must be in the future');
        }
        return true;
    })
], createTask);

taskRouter.get("/all_task", authMiddleware, getAllTasks);

taskRouter.get("/single_task/:id", authMiddleware, getSingleTask);

taskRouter.put("/update_task/:id", authMiddleware, [
    body('title').optional().isString().notEmpty(),
    body('priority').optional().isIn(['Low', 'Medium', 'High']),
    body('status').optional().isIn(['Pending', 'In Progress', 'Completed']),
    body('dueDate').optional().isISO8601().custom(value => {
        if (new Date(value) < new Date()) {
            throw new Error('Due date must be in the future');
        }
        return true;
    })
], updateTask);

taskRouter.delete("/delete_task/:id", authMiddleware, deleteTask);

module.exports = taskRouter;