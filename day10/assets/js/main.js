const $ = document.querySelector.bind(document);

function isNumber(value) {
    return value !== null && value.trim() !== "" && !isNaN(Number(value));
}

function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9_.+/#$*{}?^=-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}
