document.addEventListener('DOMContentLoaded', () => {
    loadTodos();
});

function addNewTodo() {
    const todoText = prompt('Enter a new TO DO:');
    if (todoText && todoText.trim() !== '') {
        const todoList = document.getElementById('ft_list');
        const todoDiv = document.createElement('div');
        todoDiv.textContent = todoText;
        todoDiv.onclick = () => confirmDelete(todoDiv);
        todoList.insertBefore(todoDiv, todoList.firstChild);
        saveTodos();
    }
}

function confirmDelete(todoDiv) {
    if (confirm('Do you want to remove this TO DO?')) {
        todoDiv.remove();
        saveTodos();
    }
}

function saveTodos() {
    const todoList = document.getElementById('ft_list');
    const todos = Array.from(todoList.children).map(div => div.textContent);
    document.cookie = `todos=${JSON.stringify(todos)}; path=/; max-age=31536000`;
}

function loadTodos() {
    const cookie = document.cookie.split('; ').find(row => row.startsWith('todos='));
    if (cookie) {
        const todos = JSON.parse(cookie.split('=')[1]);
        const todoList = document.getElementById('ft_list');
        todos.reverse().forEach(todo => {
            const todoDiv = document.createElement('div');
            todoDiv.textContent = todo;
            todoDiv.onclick = () => confirmDelete(todoDiv);
            todoList.appendChild(todoDiv);
        });
    }
}