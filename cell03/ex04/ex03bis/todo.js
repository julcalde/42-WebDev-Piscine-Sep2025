$(document).ready(function() {
    loadTodos();

    $('#newTodoBtn').click(function() {
        const todoText = prompt('Enter a new TO DO:');
        if (todoText && todoText.trim() !== '') {
            const $todoDiv = $('<div>').text(todoText).click(function() {
                if (confirm('Do you want to remove this TO DO?')) {
                    $(this).remove();
                    saveTodos();
                }
            });
            $('#ft_list').prepend($todoDiv);
            saveTodos();
        }
    });

    function saveTodos() {
        const todos = $('#ft_list div').map(function() {
            return $(this).text();
        }).get();
        document.cookie = `todos=${JSON.stringify(todos)}; path=/; max-age=31536000`;
    }

    function loadTodos() {
        const cookie = document.cookie.split('; ').find(row => row.startsWith('todos='));
        if (cookie) {
            const todos = JSON.parse(cookie.split('=')[1]);
            $.each(todos.reverse(), function(index, todo) {
                const $todoDiv = $('<div>').text(todo).click(function() {
                    if (confirm('Do you want to remove this TO DO?')) {
                        $(this).remove();
                        saveTodos();
                    }
                });
                $('#ft_list').append($todoDiv);
            });
        }
    }
});