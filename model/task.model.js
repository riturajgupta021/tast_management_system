const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type:String,
        required: true
    },
    dueDate: { 
        type: Date, 
        validate: {
          validator: function(value) {
            return value >= new Date();
          },
          message: 'Due date must be in the future'
        }
    },
    priority: { 
        type: String, 
        enum: ['Low', 'Medium', 'High'], 
        default: 'Medium' 
    },
    status: { 
        type: String, 
        enum: ['Pending', 'In Progress', 'Completed'], 
        default: 'Pending' 
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
});
const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
