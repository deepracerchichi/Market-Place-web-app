// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todolist', { useNewUrlParser: true, useUnifiedTopology: true });

// Task Schema
const taskSchema = new mongoose.Schema({
  title: String,
  completed: Boolean
});

const Task = mongoose.model('Task', taskSchema);

// Routes
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.json(newTask);
});

app.put('/tasks/:id', async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTask);
});

app.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
