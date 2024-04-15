let tasks = [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        tasks.push({ id: Date.now(), text: taskText, completed: false });
        renderTasks();
        taskInput.value = '';
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function toggleTaskStatus(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });
    renderTasks();
}

function handleEnterKey(event) {
    if (event.keyCode === 13) { 
        event.preventDefault(); 
        addTask();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    taskInput.addEventListener('keydown', handleEnterKey);
});

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
   
    const incompleteTasks = tasks.filter(task => !task.completed);
    const completeTasks = tasks.filter(task => task.completed);
    
    const sortedTasks = [...incompleteTasks, ...completeTasks];

    sortedTasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        
        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        taskText.style.textDecoration = task.completed ? 'line-through' : 'none';

        const taskActions = document.createElement('div');

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm mr-2 mx-1';
        deleteButton.textContent = 'Hapus';
        deleteButton.addEventListener('click', () => deleteTask(task.id));

        const toggleButton = document.createElement('button');
        toggleButton.className = 'btn btn-success btn-sm mx-1';
        toggleButton.textContent = 'Selesai';
        toggleButton.addEventListener('click', () => toggleTaskStatus(task.id));

        taskActions.appendChild(deleteButton);
        taskActions.appendChild(toggleButton);

        taskItem.appendChild(taskText);
        taskItem.appendChild(taskActions);

        taskList.appendChild(taskItem);
    });
}
