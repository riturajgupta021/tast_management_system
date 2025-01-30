const mongoose = require('mongoose');
function dbConnection() {
    mongoose.connect(Mong_url).then(() => {
        console.log("Connected to database");
    }).catch((err) => {
        console.log("Error connecting to database", err.message);
    });
}
module.exports = dbConnection;
