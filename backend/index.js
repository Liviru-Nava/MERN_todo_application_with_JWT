//We first need to require express, cors, dotenv and mongoose
//--code here--
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//we need to make the app use express and cors and config the dotenv
//--code here--
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

//test with a simple route
app.get("/", (request, response)=>{
    response.send("MERN Server is running");
});

//import routes for authentication process
const authentication_routes = require("./routes/authentication")
app.use("/auth", authentication_routes);

//import routes for the task process
const task_routes = require("./routes/tasks");
app.use("/tasks", task_routes);

//connect to mongodb
mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=> console.log("Connected to MongoDB"))
.catch((err)=>console.log(err));

//start the server
const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});