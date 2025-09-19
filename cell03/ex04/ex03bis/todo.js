document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, attempting to load todos...');
    // Test cookie to check if cookies are enabled
    document.cookie = "testcookie=test; path=/; max-age=604800";
    console.log('Test cookie set, checking cookies:', document.cookie);
    loadTodos();
});

/** Add event listener to the "Add" button */
function addNewTodo() {
    const todoText = prompt('Enter a new TO DO:');
    if (todoText && todoText.trim() !== '') {
        console.log('Adding new todo:', todoText);
        const todoList = document.getElementById('ft_list');
        const todoDiv = document.createElement('div');
        todoDiv.textContent = todoText;
        todoDiv.onclick = () => confirmDelete(todoDiv);
        todoList.insertBefore(todoDiv, todoList.firstChild);
        saveTodos();
    } else {
        console.log('Todo input was empty or canceled');
    }
}

/* Confirm deletion of a todo item */
function confirmDelete(todoDiv) {
    if (confirm('Do you want to remove this TO DO?')) {
        console.log('Removing todo:', todoDiv.textContent);
        todoDiv.remove();
        saveTodos();
    }
}

/* Save the current list of todos to a cookie */
function saveTodos() {
    const todoList = document.getElementById('ft_list');
    const todos = Array.from(todoList.children).map(div => div.textContent);
    const cookieValue = `todos=${encodeURIComponent(JSON.stringify(todos))}; path=/; max-age=604800`;
    console.log('Saving todos:', todos);
    console.log('Cookie value:', cookieValue);
    console.log('Cookie length:', cookieValue.length);
    if (cookieValue.length > 4000) {
        console.warn('Cookie size too large, may not save properly');
    }
    document.cookie = cookieValue;
    console.log('Cookies after save:', document.cookie);
}

/* Load todos from the cookie */
function loadTodos() {
    console.log('Current cookies:', document.cookie);
    const cookie = document.cookie.split('; ').find(row => row.startsWith('todos='));
    if (cookie) {
        console.log('Found todos cookie:', cookie);
        try {
            const todos = JSON.parse(decodeURIComponent(cookie.split('=')[1]));
            console.log('Parsed todos:', todos);
            const todoList = document.getElementById('ft_list');
            todos.reverse().forEach(todo => {
                console.log('Adding todo to DOM:', todo);
                const todoDiv = document.createElement('div');
                todoDiv.textContent = todo;
                todoDiv.onclick = () => confirmDelete(todoDiv);
                todoList.insertBefore(todoDiv, todoList.firstChild);
            });
        } catch (e) {
            console.error('Failed to parse todos cookie:', e);
        }
    } else {
        console.log('No todos cookie found');
    }
}