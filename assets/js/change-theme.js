// Getting data from localStorage or prefers-color-scheme
if (localStorage.getItem('prefered-theme') !== null) {
    body.classList.replace('dark-theme', localStorage.getItem('prefered-theme'));
} else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    body.classList.replace('dark-theme', 'light-theme')
}

// EventListener to change theme
toggleTheme.addEventListener('click', () => {
    if(body.classList.contains('dark-theme')) {
        body.classList.replace('dark-theme', 'light-theme');
        localStorage.setItem('prefered-theme', 'light-theme');
    } else {
        body.classList.replace('light-theme', 'dark-theme');
        localStorage.setItem('prefered-theme', 'dark-theme');
    }
})