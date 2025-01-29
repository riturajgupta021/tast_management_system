const mongoose = require('mongoose');
function dbConnection() {
    mongoose.connect('mongodb://localhost:27017/task-manager').then(() => {
        console.log("Connected to database");
    }).catch((err) => {
        console.log("Error connecting to database", err.message);
    });
}
module.exports = dbConnection;