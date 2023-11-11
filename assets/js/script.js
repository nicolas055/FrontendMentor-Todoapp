// Getting elements from html
const todoList = document.querySelector('#todo-list');
const insertTodo = document.querySelector('#new-todo');
const itemCounter = document.querySelector('#item-counter');
const filterEl = document.querySelector('#filter');
const filterLabels = filterEl.querySelectorAll('label');
const labelFilterAll = document.querySelector('#filter-all');
const labelFilterActive = document.querySelector('#filter-active');
const labelFilterCompleted = document.querySelector('#filter-completed');
const inputFilterAll = document.querySelector('#input-all');
const inputFilterActive = document.querySelector('#input-active');
const inputFilterCompleted = document.querySelector('#input-completed');
const clearCompleted = document.querySelector('#clear-completed');
const completeTodo = document.querySelectorAll('.check-todo');


// Variables
let allTodo = [];
let activeTodo = [];
let completedTodo = [];

// Functions
function newTodo() {
    let newTodo;
    function createTodo () {
        newTodo = document.createElement('li')
        newTodo.classList.add('todo-item');
        newTodo.innerHTML = `
        <button class="circle check-todo">
            <img src="assets/images/icon-check.svg" alt="check-icon"/>
        </button>
        <input type="text" class="todo-title" value="${insertTodo.value}" disabled/>
        <button class="delete-todo">
            <img src="assets/images/icon-cross.svg" alt="X icon">
        </button>`
    }
    function checkTodo() {
        let checkTodoEl = newTodo.querySelector('.check-todo');
        checkTodoEl.addEventListener('click', () => {
            newTodo.classList.toggle('completed');
            completedTodo = allTodo.filter(todo => todo.classList.contains('completed'))
            activeTodo = allTodo.filter(todo => !todo.classList.contains('completed'));
            update();
        })
    }
    function removeTodo() {
        let removeTodoEl = newTodo.querySelector('.delete-todo');
        removeTodoEl.addEventListener('click', () => {
            allTodo.splice(allTodo.indexOf(newTodo), 1);
            activeTodo = allTodo.filter(todo => !todo.classList.contains('completed'))
            completedTodo = allTodo.filter(todo => todo.classList.contains('completed'))
            update();
        })
    }
    createTodo();
    checkTodo();
    removeTodo();
    allTodo.push(newTodo);
    activeTodo.push(newTodo);
}

function removeCompletedTodos() {
    allTodo = allTodo.filter(todo => !todo.classList.contains('completed'));
    completedTodo = [];
    update()
}

function addTodo(e) {
    if(e.key === 'Enter' && insertTodo.value !== '') {
        newTodo();
        update();
        insertTodo.value = ''; // Empty the insertTodo Value
    }
}

function update() {
    todoList.innerHTML = '';
    filter();
    addToLocalStorage();
    todoListMaxLines(5);
    itemCounter.innerHTML = `${activeTodo.length} items left`;  // Update the items left counter
}

function todoListMaxLines(lineNumber) {
    if (todoList.childElementCount >= lineNumber) {
        todoList.style.maxHeight = todoList.offsetHeight + 'px';
    } else {
        todoList.style.maxHeight = 'auto';
    }

    if(todoList.childElementCount > lineNumber) {
        todoList.style.overflowY = 'scroll';
        
    } else {
        todoList.style.overflowY = 'auto';
    }
}

function filter() {
    if (inputFilterAll.checked) {
        allTodo.forEach((todo) => todoList.append(todo));
        labelFilterAll.classList.add('active');
        labelFilterActive.classList.remove('active');
        labelFilterCompleted.classList.remove('active');
    } else if (inputFilterActive.checked) {
        activeTodo.forEach((todo) => todoList.append(todo));
        labelFilterActive.classList.add('active');
        labelFilterAll.classList.remove('active');
        labelFilterCompleted.classList.remove('active');
    } else if (inputFilterCompleted.checked) {
        completedTodo.forEach((todo) => todoList.append(todo));
        labelFilterCompleted.classList.add('active');
        labelFilterActive.classList.remove('active');
        labelFilterAll.classList.remove('active');
    }
}

let allTodoInnerHTML = []
let newInner = [];
function addToLocalStorage() {
    allTodoInnerHTML = [];
    newInner = [];
    allTodo.forEach((todo) => {
        allTodoInnerHTML.push(todo.innerHTML);
    })
    allTodoInnerHTML.forEach((item) => {
        let newTodo = document.createElement('li');
        newTodo.classList.add('todo-item');
        newTodo.innerHTML = item;
        newInner.push(newTodo);
    })
    localStorage.setItem('all', JSON.stringify(allTodoInnerHTML));
    localStorage.setItem('active', JSON.stringify(activeTodo));
    localStorage.setItem('completed', JSON.stringify(completedTodo));
}

// EventListeners
insertTodo.addEventListener('keyup', (e) => {
    addTodo(e);
})
clearCompleted.addEventListener('click', removeCompletedTodos);

for (let i = 0; i < filterLabels.length; i++) {
    filterLabels[i].addEventListener('click', () => setTimeout(update, '10'))
}



