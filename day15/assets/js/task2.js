const inputPassword = $(".form__input[type='password']");
const togglePasswordBtn = $(".js-form-btn");

togglePasswordBtn.addEventListener("click", () => {
    const currentType = inputPassword.getAttribute("type");
    if (currentType === "password") {
        inputPassword.setAttribute("type", "text");
        togglePasswordBtn.textContent = "Ẩn";
    } else {
        inputPassword.setAttribute("type", "password");
        togglePasswordBtn.textContent = "Hiện";
    }
});
