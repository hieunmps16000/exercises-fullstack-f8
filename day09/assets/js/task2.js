const form = $("#form-covert");
const dayResult = $("#day-value");
form.onsubmit = (e) => {
    e.preventDefault();
    const value = $("#input-day").value;

    if (!value) {
        return alert("Số không được để trống!");
    }

    const number = +value;

    if (!isNumber(number)) {
        return alert("Dữ liệu bắt buộc phải là số!");
    }

    let day = null;
    switch (number) {
        case 1:
            day = "Chủ Nhật";
            break;
        case 2:
            day = "Thứ Hai";
            break;
        case 3:
            day = "Thứ Ba";
            break;
        case 4:
            day = "Thứ Tư";
            break;
        case 5:
            day = "Thứ Năm";
            break;
        case 6:
            day = "Thứ Sáu";
            break;
        case 7:
            day = "Thứ Bảy";
            break;
        default:
            day = "Không hợp lệ";
    }

    dayResult.textContent = day;
};

function isNumber(num) {
    return typeof num === "number" && !isNaN(num);
}

function isValueInValidRange(score) {
    return score >= 1 && score <= 7;
}
