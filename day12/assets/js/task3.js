function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateOTP() {
    return getRandomInt(100000, 999999);
}

console.log(generateOTP());
console.log(generateOTP());
console.log(generateOTP());
