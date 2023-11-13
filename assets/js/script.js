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
let allTodoInnerHTML = [];
let allTodoClasses = [];

// Get data from localStorage
if (localStorage.getItem('all') !== null && localStorage.getItem('classes') !== null) {
    let localStorageAllTodo = JSON.parse(localStorage.getItem('all'))
    let localStorageClasses = JSON.parse(localStorage.getItem('classes'))
    for (let i = 0; i < localStorageAllTodo.length; i++) {
        newTodo(localStorageAllTodo[i], Object.values(localStorageClasses[i]).join(' '));
    }
    filterTodo();
    update();
}




// Functions
function filterTodo() {
    completedTodo = allTodo.filter(todo => todo.classList.contains('completed'))
    activeTodo = allTodo.filter(todo => !todo.classList.contains('completed'));
}

function newTodo(newTodoInnerHtml, addClass) {
    let newTodo;
    function createTodo () {
        newTodo = document.createElement('li')
        newTodo.setAttribute('class', addClass);
        newTodo.innerHTML = newTodoInnerHtml;
    }
    function checkTodo() {
        let checkTodoEl = newTodo.querySelector('.check-todo');
        checkTodoEl.addEventListener('click', () => {
            newTodo.classList.toggle('completed');
            filterTodo()
            update();
        })
    }
    function removeTodo() {
        let removeTodoEl = newTodo.querySelector('.delete-todo');
        removeTodoEl.addEventListener('click', () => {
            allTodo.splice(allTodo.indexOf(newTodo), 1);
            filterTodo()
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
        newTodo(`
        <div class="check-todo">
            <button class="circle">
                <img src="assets/images/icon-check.svg" alt="check-icon"/>
            </button>
        </div>
        <input type="text" class="todo-title" value="${insertTodo.value}" disabled/>
        <button class="delete-todo">
            <img src="assets/images/icon-cross.svg" alt="X icon">
        </button>
        `, 'todo-item');
        update();
        insertTodo.value = ''; // Empty the insertTodo Value
    }
}

function update() {
    todoList.innerHTML = '';
    filter();
    addToLocalStorage();
    todoListMaxLines(6, 3);
    itemCounter.innerHTML = `${activeTodo.length} items left`;  // Update the items left counter
}

// Set the number of todos that will displayed on screen
function todoListMaxLines(lineNumberDesktop, lineNumberMobile) {
    function maxLines(lineNumber) {
        if (todoList.childElementCount >= lineNumber) {
            todoList.style.maxHeight = lineNumber * todoList.children[0].offsetHeight + 'px';
        } else {
            todoList.style.maxHeight = 'auto';
        }
    }
    if(body.offsetHeight >= 600) {
        maxLines(lineNumberDesktop);
    } else if (body.offsetHeight < 600) {
        maxLines(lineNumberMobile);
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

function addToLocalStorage() {
    allTodoInnerHTML = [];
    allTodoClasses = [];
    allTodo.forEach((todo) => {
        allTodoInnerHTML.push(todo.innerHTML);
        allTodoClasses.push(todo.classList);
    })
    localStorage.setItem('all', JSON.stringify(allTodoInnerHTML));
    localStorage.setItem('classes', JSON.stringify(allTodoClasses));
}

/* EventListeners */
insertTodo.addEventListener('keyup', (e) => {
    addTodo(e);
})
clearCompleted.addEventListener('click', removeCompletedTodos);
// Add event listeners to the filter options
for (let i = 0; i < filterLabels.length; i++) {
    filterLabels[i].addEventListener('click', () => setTimeout(update, '10'))
}



