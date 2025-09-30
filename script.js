function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    // Create new list item
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = "Remove";
    removeBtn.className = 'remove-btn';

    // Set onclick event to remove the li element from taskList
    removeBtn.onclick = function() {
        taskList.removeChild(li);
    };

    // Append remove button to list item
    li.appendChild(removeBtn);

    // Append list item to the task list
    taskList.appendChild(li);

    // Clear the input field
    taskInput.value = "";
}
