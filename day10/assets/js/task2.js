function formatFullName(fullName) {
    if (!fullName) return "";

    return fullName
        .trim()
        .toLowerCase()
        .replace(/(?:^|\s)\S/g, (char) => char.toUpperCase())
        .replace(/\s+/g, " ");
}

function handleGetFullName() {
    let fullName = "";
    do {
        fullName = prompt("Nhập họ và tên cần chuẩn hóa");

        if (fullName === null) return;

        if (fullName.trim() === "") {
            alert("Vui lòng nhập họ và tên");
        }
    } while (fullName.trim() === "");

    alert(`Input: fullName = "${fullName}" \nOutput: "${formatFullName(fullName)}"`);
}

$("#btn-format-username").onclick = handleGetFullName;
