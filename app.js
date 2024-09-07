// app.js
document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
  
    const fetchTasks = async () => {
      const response = await fetch('/tasks');
      const tasks = await response.json();
      taskList.innerHTML = '';
      tasks.forEach(task => addTaskToDOM(task));
    };
  
    const addTaskToDOM = (task) => {
      const li = document.createElement('li');
      li.textContent = task.title;
      li.className = task.completed ? 'completed' : '';
      li.addEventListener('click', () => toggleTaskCompletion(task._id, !task.completed));
      
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteTask(task._id);
      });
      li.appendChild(deleteButton);
  
      taskList.appendChild(li);
    };
  
    const toggleTaskCompletion = async (id, completed) => {
      await fetch(`/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed })
      });
      fetchTasks();
    };
  
    const deleteTask = async (id) => {
      await fetch(`/tasks/${id}`, {
        method: 'DELETE'
      });
      fetchTasks();
    };
  
    taskForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const title = taskInput.value;
      await fetch('/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, completed: false })
      });
      taskInput.value = '';
      fetchTasks();
    });
  
    fetchTasks();
  });
  