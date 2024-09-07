// Import express, the model, and the middleware
const express = require('express');
const TaskSchema = require("../schemas/TaskSchema");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get all the tasks
router.get("/", authMiddleware, async (request, response) => {
    try {
        const tasks = await TaskSchema.find({ userId: request.user.id });
        response.json(tasks);
    } catch (error) {
        response.status(500).json({ error: "Server error" });
    }
});

// Get a specific task
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        // Find the task by ID
        const task = await TaskSchema.findById(req.params.id);

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

// Create a new task
router.post("/", authMiddleware, async (request, response) => {
    const { title, description, status, dueDate } = request.body;

    try {
        const newTask = new TaskSchema({
            userId: request.user.id,
            title,
            description,
            status,
            dueDate,
        });

        const task = await newTask.save();
        response.json(task);
    } catch (error) {
        console.error(error);  // Log the error to the console for debugging
        response.status(500).json({ error: "Server error" });
    }
});

// Update a task
router.put("/:id", authMiddleware, async (request, response) => {
    const { title, description, status, dueDate } = request.body;

    try {
        let task = await TaskSchema.findById(request.params.id);
        if (!task) {
            return response.status(404).json({ error: "Task not found" });
        }

        if (task.userId.toString() !== request.user.id) {
            return response.status(401).json({ msg: 'Not authorized' });
        }

        task = await TaskSchema.findByIdAndUpdate(
            request.params.id,
            { $set: { title, description, status, dueDate } },
            { new: true }
        );

        response.json(task);
    } catch (error) {
        response.status(500).json({ error: "Server error" });
    }
});

// Delete a task
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
      // Find the task by ID
      const task = await TaskSchema.findById(req.params.id);
      
      // Check if the task exists
      if (!task) {
          return res.status(404).json({ msg: 'Task not found' });
      }

      // Ensure the task belongs to the authenticated user
      if (task.userId.toString() !== req.user.id) {
          return res.status(401).json({ msg: 'Not authorized' });
      }

      // Remove the task
      await TaskSchema.findByIdAndDelete(req.params.id);
      res.json({ msg: 'Task removed' });
  } catch (err) {
      console.error(err); // Log the error for debugging
      res.status(500).json({ msg: 'Server error' });
  }
});


module.exports = router;
