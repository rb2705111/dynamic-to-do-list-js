document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage and render them
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTaskToDOM(taskText, false));
    }

    // Save the current tasks array to localStorage
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Get current tasks from localStorage as an array
    function getStoredTasks() {
        return JSON.parse(localStorage.getItem('tasks') || '[]');
    }

    // Add task function with optional save parameter
    function addTask(taskText, save = true) {
        taskText = taskText.trim();
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }
        addTaskToDOM(taskText, save);
    }

    // Helper function to create li element with remove button and append it to DOM
    function addTaskToDOM(taskText, save) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn');
        removeBtn.onclick = function() {
            taskList.removeChild(li);
            if (save) {
                removeTaskFromStorage(taskText);
            }
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        if (save) {
            const tasks = getStoredTasks();
            tasks.push(taskText);
            saveTasks(tasks);
            taskInput.value = "";
        }
    }

    // Remove task from localStorage by value
    function removeTaskFromStorage(taskText) {
        let tasks = getStoredTasks();
        tasks = tasks.filter(task => task !== taskText);
        saveTasks(tasks);
    }

    // Event listeners for adding tasks
    addButton.addEventListener('click', () => {
        addTask(taskInput.value);
    });

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });

    // Load stored tasks on page load
    loadTasks();
});
