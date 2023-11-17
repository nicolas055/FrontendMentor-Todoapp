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
        newTodo.setAttribute('draggable', 'true');
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


let hideScrollBarTimeout = null;
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
        // Empty the insertTodo Value
        insertTodo.value = ''; 
        // Make the scrollbar go to the bottom of the todoList
        todoList.children[1].scrollTo(0, todoList.children[1].scrollHeight);
        // Show scroll for a short time when an item is added
        showScrollBar();
        if(hideScrollBarTimeout != null) {
            clearTimeout(hideScrollBarTimeout);
            hideScrollBarTimeout = null;
        }
        hideScrollBarTimeout = setTimeout(hideScrollBar, '1000');
    }
}

function running() {
    while (true) {
        console.log('Running')
    }
}

function update() {
    todoList.children[1].innerHTML = '';
    filter();
    addToLocalStorage();
    todoListMaxLines(6, 3);
    itemCounter.innerHTML = `${activeTodo.length} items left`;  // Update the items left counter
}

// Set the number of todos that will displayed on screen
function todoListMaxLines(lineNumberDesktop, lineNumberMobile) {
    function maxLines(lineNumber) {
        if (todoList.children[1].childElementCount >= lineNumber) {
            todoList.style.maxHeight = lineNumber * todoList.children[1].children[0].offsetHeight + 'px';
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
        allTodo.forEach((todo) => todoList.children[1].append(todo));
        labelFilterAll.classList.add('active');
        labelFilterActive.classList.remove('active');
        labelFilterCompleted.classList.remove('active');
    } else if (inputFilterActive.checked) {
        activeTodo.forEach((todo) => todoList.children[1].append(todo));
        labelFilterActive.classList.add('active');
        labelFilterAll.classList.remove('active');
        labelFilterCompleted.classList.remove('active');
    } else if (inputFilterCompleted.checked) {
        completedTodo.forEach((todo) => todoList.children[1].append(todo));
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





