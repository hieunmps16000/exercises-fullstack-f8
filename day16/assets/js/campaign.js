const $ = document.querySelector.bind(document);
const urlParams = new URLSearchParams(location.search);
$(".js-campage-name").textContent = urlParams.get("utm_source") ?? "Không có tham số quảng cáo";
$(".js-campage-info").textContent = urlParams.get("utm_campaign") ?? "Không có tham số quảng cáo";
