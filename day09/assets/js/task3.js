const formTaxiFare = $("#form-taxi-fare");
const taxiFareTotal = $("#taxi-fare-total");
const inputDistance = $("#input-taxi-distance");

function isNumber(num) {
    return typeof num === "number" && !isNaN(num);
}

function clearValue() {
    inputDistance.value = "";
    inputDistance.focus();
}

formTaxiFare.onsubmit = (e) => {
    e.preventDefault();
    const distanceKm = inputDistance.value.trim();

    if (!distanceKm) {
        alert("Vui lòng nhập số km");
        clearValue();
        return;
    }
    const distanceKmNumber = +distanceKm;
    if (!isNumber(distanceKmNumber)) {
        alert("Giá trị phải là số");
        clearValue();
        return;
    }
    if (distanceKmNumber <= 0) return alert("Só km không được nhỏ hơn hoặc bằng 0");

    let total = 0;

    if (distanceKmNumber <= 1) {
        total = distanceKmNumber * 15_000;
    } else if (distanceKmNumber <= 5) {
        total = 15_000 + (distanceKmNumber - 1) * 13_500;
    } else {
        total = 15_000 + 13_500 * 4 + (distanceKmNumber - 5) * 11000;
    }

    if (distanceKmNumber > 12) {
        total *= 0.9;
    }
    taxiFareTotal.textContent = total.toLocaleString("vi-VN") + " VNĐ";
};
