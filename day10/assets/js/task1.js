function handleCheckPrime() {
    let input;
    let num;
    do {
        input = prompt("Nhập một số tự nhiên");

        if (input === null) return;

        if (!isNumber(input)) {
            alert("Vui lòng nhập số");
        }
    } while (!isNumber(input));

    if (input !== null) {
        num = Number(input);
        alert(`Input: n = ${num} \nOutput: ${isPrime(num)}`);
    }
}

function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i * i <= num; i++) {
        if (num % i === 0) return false;
    }
    return true;
}

$("#btn-prime").onclick = handleCheckPrime;
