function generateRandomHexColor() {
    const hexChars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
    let hex = "";
    for (let i = 1; i <= 6; i++) {
        hex += hexChars[Math.floor(Math.random() * hexChars.length)];
    }
    return "#" + hex;
}
const color = generateRandomHexColor();
console.log(color);
