function maskEmail(email) {
    let output = "";
    const atSymbolIndex = email.indexOf("@");
    const userName = email.slice(0, atSymbolIndex);
    const domain = email.slice(atSymbolIndex);
    const headTailCharCount = 2;
    const headCharCount = 1;

    if (userName.length > 4) {
        const head = userName.slice(0, headTailCharCount);
        const tail = userName.slice(userName.length - headTailCharCount);
        const body = userName.slice(headTailCharCount, -headTailCharCount);
        const mask = "*".repeat(body.length);
        output = `${head}${mask}${tail}${domain}`;
    } else {
        const head = userName.slice(0, headCharCount);
        const body = userName.slice(headCharCount);
        const mask = "*".repeat(body.length);
        output = `${head}${mask}${domain}`;
    }
    return output;
}

function handleGetEmail() {
    let email = "";
    do {
        email = prompt("Nhập email của bạn");

        if (email === null) return;

        if (!isValidEmail(email)) {
            alert("Email không hợp lệ. Vui lòng nhập lại!");
        }
    } while (email.trim() === "" || !isValidEmail(email));

    alert(`Input: email = "${email}" \nOutput: "${maskEmail(email)}"`);
}

$("#btn-email-masking").onclick = handleGetEmail;
