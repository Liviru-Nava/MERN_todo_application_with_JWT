const mongoose = require('mongoose');

//create the schema for the user
const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    }, 
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("UserSchema", UserSchema);