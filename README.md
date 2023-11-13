# Frontend Mentor - Todo app solution

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)


## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- **Bonus**: Drag and drop to reorder items on the list

### Screenshot

![Screenshot](/screenshots/screenshot.jpg)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- LocalStorage
- Basic Js

### What I learned

- I learned how to better use the property overflow in css
```css
#todo-list {
    max-height: 420px;
    overflow-y: auto;
}
```

- I learned how to use JSON
```js
if (localStorage.getItem('all') !== null && localStorage.getItem('classes') !== null) {
    let localStorageAllTodo = JSON.parse(localStorage.getItem('all'))
    let localStorageClasses = JSON.parse(localStorage.getItem('classes'))
    for (let i = 0; i < localStorageAllTodo.length; i++) {
        newTodo(localStorageAllTodo[i], Object.values(localStorageClasses[i]).join(' '));
    }
    filterTodo();
    update();
}
```
```js
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
```

### Continued development

I want to learn how to work with drag and drop in js and how to change the scrollbar style

### Useful resources

- [devdocs](https://devdocs.io/) - This is a very good api with concepts of a lot of languages. It helped understand a lot of js concepts.
- [ChatGPT](https://chat.openai.com/) - It help me build regex and understand how to use it.


## Author

- Github - [@nicolas055](https://github.com/nicolas055)
- Frontend Mentor - [@nicolas055](https://www.frontendmentor.io/profile/nicolas055)
- Instagram - [@nicolas_leite2](https://www.instagram.com/nicolas_leite2/)
