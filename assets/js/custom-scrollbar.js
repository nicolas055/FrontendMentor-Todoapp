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
// Default
hideScrollBar()
// Desktop
todoList.addEventListener('mouseenter', () => {
    showScrollBar();
})
todoList.addEventListener('mouseleave', () => {
    hideScrollBar();
})


// Mobile
todoList.addEventListener('touchstart', () => {
    showScrollBar()
})
todoList.addEventListener('touchend', () => {
    hideScrollBar()
}) 