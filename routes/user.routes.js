const express = require("express");
const { body } = require('express-validator');
const { registerUser, loginUser } = require("../controllers/user.controller");
const userRouter = express.Router();

userRouter.post("/register", [
    body('username').isString().notEmpty().isLength({ min: 3 }),
    body('password').isLength({ min: 6 })
], registerUser);
userRouter.post("/login", [
    body('username').isString().notEmpty().isLength({ min: 3 }),
    body('password').notEmpty()
], loginUser)

module.exports = userRouter;