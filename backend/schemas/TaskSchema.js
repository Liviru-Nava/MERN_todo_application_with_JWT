const mongoose = require('mongoose');

//create the schema for the task
const TaskSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserSchema",
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
    },
    status:{
        type: String,
        enum: ["pending", "Pending", "ongoing", "Ongoing", "completed", "Completed"],
        default: "pending",
    },
    dueDate:{
        type: Date,
    }
});

module.exports = mongoose.model("TaskSchema", TaskSchema);
