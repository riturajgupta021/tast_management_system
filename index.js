require("dotenv").config();
const express = require("express");
const dbConnection = require("./config/dbConnection");
const userRouter = require("./routes/user.routes");
const taskRouter = require("./routes/task.routes");

const app = express();

const PORT = process.env.PORT || 3000;

dbConnection()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", userRouter);
app.use("/api/crud",taskRouter)




app.get("/", (req, res) => {
    res.send("Hello World");
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});