const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
});
userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}
const User = mongoose.model('User', userSchema);
module.exports = User;