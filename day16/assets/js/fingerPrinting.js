function stringTo25Digits(str) {
    let hash = 0n;
    const PRIME = 1099511628211n;
    const MOD = 2n ** 64n;
    for (let i = 0; i < str.length; i++) {
        hash ^= BigInt(str.charCodeAt(i));
        hash = (hash * PRIME) % MOD;
    }
    let digits = hash.toString();
    const TARGET_LENGTH = 25;
    while (digits.length < TARGET_LENGTH) {
        digits += hash.toString();
    }
    return digits.slice(0, TARGET_LENGTH);
}

function showFingerPrinting() {
    $("#home-section").hidden = true;
    $("#fingerprinting-section").hidden = false;
}

function hideFingerPrinting() {
    $("#home-section").hidden = false;
    $("#fingerprinting-section").hidden = true;
}

function generateFingerprint(data) {
    if (!data) return "Không có dữ liệu";

    const result = [
        data.isOnline || "",
        data.browserName || "",
        data.os || "",
        data.languages || "",
        data.screenWidth || "",
        data.screenHeight || "",
        data.orientation || "",
    ].join("_");
    $(".js-fingerprinting-value").textContent = stringTo25Digits(result);
}

$(".js-back-to-home").addEventListener("click", () => {
    history.back();
    hideFingerPrinting();
});
