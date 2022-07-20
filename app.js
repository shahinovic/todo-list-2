// Selectors
let todoInput = document.querySelector('.todo-input');
let todoButton = document.querySelector('.todo-button');
let todoList = document.querySelector('.todo-list');
let filterOption = document.querySelector('.fliter-todo');

// Event Listener
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo);
filterOption.addEventListener('click', filterTodo);

// Functions
function addTodo(e) {
    // pervent form from submitting
    e.preventDefault();
    if (todoInput.value != '') {
        // todo Div
        const todoDiv = document.createElement('div');
        todoDiv.className = 'todo';
        todoDiv.addEventListener('click', deleteCheck);
        // todo li 
        const newTodo = document.createElement('li');
        newTodo.innerHTML = todoInput.value;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        saveLocalTodos(todoInput.value);
        // check mark button 
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.className = 'complete-btn';
        todoDiv.appendChild(completedButton);
        // check trash button 
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.className = 'trash-btn';
        trashButton.onclick = function delFromLocal() {
            let local = JSON.parse(localStorage.getItem('todos'));
            local = local.filter((e) => e != this.parentElement.firstElementChild.innerHTML);
            localStorage.setItem('todos', JSON.stringify(local));
        };
        todoDiv.appendChild(trashButton);
        // append todo div to todo list
        todoList.appendChild(todoDiv);
    }
    todoInput.value = '';
}

// deleting and checking function 

function deleteCheck(e) {
    let item = e.target;
    // deleting
    if (item.classList.contains('trash-btn')) {
        item.parentElement.classList.add('fall');
        item.parentElement.addEventListener('transitionend', _ => item.parentElement.remove());


    }
    // checking 
    if (item.classList.contains('complete-btn')) {
        item.parentElement.classList.toggle('completed');
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    })
}

function saveLocalTodos(todo) {
    // check if we have todos in local storge
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    // check if we have todos in local storge
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function (todo) {
        const todoDiv = document.createElement('div');
        todoDiv.className = 'todo';
        todoDiv.addEventListener('click', deleteCheck);
        // todo li 
        const newTodo = document.createElement('li');
        newTodo.innerHTML = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        // check mark button 
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.className = 'complete-btn';
        todoDiv.appendChild(completedButton);
        // check trash button 
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.className = 'trash-btn';
        trashButton.onclick = function delFromLocal() {
            let local = JSON.parse(localStorage.getItem('todos'));
            local = local.filter((e) => e != this.parentElement.firstElementChild.innerHTML);
            localStorage.setItem('todos', JSON.stringify(local));
        };
        todoDiv.appendChild(trashButton);
        // append todo div to todo list
        todoList.appendChild(todoDiv);
    });
}