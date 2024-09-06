const mongoose = require('mongoose');

//create the schema for the task
const TaskSchema = new mongoose.Schema({
    userID:{
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
        enum: ["pending", "ongoing", "completed"],
        default: "pending",
    },
    dueDate:{
        type: Date,
    }
});

module.exports = mongoose.model("TaskSchema", TaskSchema);
