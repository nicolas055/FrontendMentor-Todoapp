var { 
    OverlayScrollbars, 
    ScrollbarsHidingPlugin, 
    SizeObserverPlugin, 
    ClickScrollPlugin  
} = OverlayScrollbarsGlobal;

const osInstance = OverlayScrollbars(document.querySelector('#todo-list'), {
    scrollbars:  {
        theme: 'os-theme-light'
    }
});

// Toggle scrollBar
function showScrollBar() {
    document.querySelector('.os-scrollbar-vertical').style.opacity = '1'
}

function hideScrollBar() {
    document.querySelector('.os-scrollbar-vertical').style.opacity = '0';
}

// Desktop
todoList.addEventListener('mouseover', () => {
    showScrollBar()
})
todoList.addEventListener('mouseout', () => {
    hideScrollBar()
})

// Mobile
todoList.addEventListener('touchstart', () => {
    showScrollBar()
})
todoList.addEventListener('touchend', () => {
    hideScrollBar()
})