document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('themeToggle');
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme) {
        document.documentElement.setAttribute('data-bs-theme', storedTheme);
        themeToggle.checked = storedTheme === 'dark';
    }

    themeToggle.addEventListener('change', function () {
        const theme = this.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme);
    });
});