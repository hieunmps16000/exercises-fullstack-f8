const toggleThemeBtn = $(".js-toggle-theme");
const body = document.body;

function init() {
    const savedTheme = localStorage.getItem("isDarkTheme");
    if (savedTheme === "true") {
        body.classList.add("dark-mode");
        toggleThemeBtn.textContent = "Chế độ sáng";
    }
}

function handleToggleTheme() {
    body.classList.toggle("dark-mode");
    const isDark = body.classList.contains("dark-mode");
    localStorage.setItem("isDarkTheme", isDark);
    toggleThemeBtn.textContent = isDark ? "Chế độ sáng" : "Chế độ tối";
}

init();
toggleThemeBtn.addEventListener("click", handleToggleTheme);
