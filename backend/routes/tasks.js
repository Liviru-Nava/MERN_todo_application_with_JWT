//import express, model and the middleware
const express = require('express');
const TaskSchema = require("../schemas/TaskSchema");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

//get all the tasks
router.get("/", authMiddleware, async (request, response)=>{
    try{
        const tasks = await TaskSchema.find({user: request.user.id});
        response.json(tasks);
    }catch(error){
        response.status(500).json({error: "Server error"});
    }
});

//getting a specific task
router.get('/:id', authMiddleware, async (req, res) => {
    try {
      // Find the task by ID
      const task = await Task.findById(req.params.id);
  
      // Check if the task exists
      if (!task) {
        return res.status(404).json({ msg: 'Task not found' });
      }
  
      // Ensure the task belongs to the authenticated user
      if (task.userId.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not authorized' });
      }
  
      // If everything is okay, return the task
      res.json(task);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server error' });
    }
});

//create a new task
router.post("/", authMiddleware, async (request, response) =>{
    const {title, description, dueDate} = request.body;

    try{
        const newTask = new TaskSchema({
            userId: request.user.id,
            title,
            description,
            dueDate,
        });

        const task = await newTask.save();
        response.json(task);
    }catch(error){
        response.status(500).json({error: "Server error"});
    }
});

//update a task
router.put("/:id", authMiddleware, async (request, response) => {
    const {title, descritpion, dueDate} = request.body;

    try{
        let task = await TaskSchema.findById(request.params.id);
        if(!task){
            return response.status(404).json({error:"Task not found"});
        }
        if (task.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        task = await Task.findByIdAndUpdate(
            req.params.id,
            { $set: { title, description, status, dueDate } },
            { new: true }
        );
      
        res.json(task);
    }catch(error){
        response.status(500).json({error: "Server error"});
    }
});

// Delete a task
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(404).json({ msg: 'Task not found' });
      }
  
      if (task.userId.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not authorized' });
      }
  
      await Task.findByIdAndRemove(req.params.id);
      res.json({ msg: 'Task removed' });
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;