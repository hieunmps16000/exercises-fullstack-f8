const $ = document.querySelector.bind(document);
const formScore = $("#form-score");
const avgScoreEl = $("#avg-score");
const rankEl = $("#rank");

function isNumber(num) {
    return typeof num === "number" && !isNaN(num);
}

function isScoreInValidRange(score) {
    return score >= 0 && score <= 10;
}

formScore.onsubmit = (e) => {
    avgScoreEl.textContent = "0";
    rankEl.textContent = "?";
    e.preventDefault();
    const mathValue = $("#math").value.trim();
    const literatureValue = $("#literature").value.trim();
    const englishValue = $("#english").value.trim();
    let rank = "";

    if (!mathValue || !literatureValue || !englishValue) {
        return alert("Điểm không được để trống!");
    }

    const mathScore = +mathValue;
    const literatureScore = +literatureValue;
    const englishScore = +englishValue;

    if (!isNumber(mathScore) || !isNumber(literatureScore) || !isNumber(englishScore)) {
        return alert("Dữ liệu bắt buộc phải là số!");
    } else if (
        !isScoreInValidRange(mathScore) ||
        !isScoreInValidRange(literatureScore) ||
        !isScoreInValidRange(englishScore)
    ) {
        return alert("Dữ liệu không hợp lệ");
    }

    const avgScore = (mathScore + literatureScore + englishScore) / 3;
    switch (true) {
        case avgScore >= 9.0 && mathScore >= 8 && literatureScore >= 8 && englishScore >= 8:
            rank = "Xuất sắc";
            break;
        case avgScore >= 8.0 && mathScore >= 6.5 && literatureScore >= 6.5 && englishScore >= 6.5:
            rank = "Giỏi";
            break;
        case avgScore >= 6.5 && mathScore >= 5.0 && literatureScore >= 5.0 && englishScore >= 5.0:
            rank = "Khá";
            break;
        case avgScore >= 5.0 && mathScore >= 3.5 && literatureScore >= 3.5 && englishScore >= 3.5:
            rank = "Trung bình";
            break;
        default:
            rank = "Yếu";
    }

    avgScoreEl.textContent = Number(avgScore).toFixed(1);
    rankEl.textContent = rank;
};
