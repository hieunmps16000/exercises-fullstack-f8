const $ = document.querySelector.bind(document);
const stats = {
    location: "Đang xử lý...",
    isOnline: navigator.onLine,
    browserName: null,
    os: null,
    languages: navigator.languages,
    screenWidth: screen.width,
    screenHeight: screen.height,
    orientation: screen.orientation.type,
};

function updateLocationDisplay(value) {
    const locationValue = $("#location-value");
    if (locationValue) locationValue.textContent = value;
}

function getLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Trình duyệt không hỗ trợ Geolocation"));
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve(`${position.coords.latitude}, ${position.coords.longitude}`);
            },
            (error) => reject(error),
            { enableHighAccuracy: true, timeout: 3000 },
        );
    });
}

function getBrowserName() {
    const userAgent = navigator.userAgent;

    if (userAgent.includes("Firefox")) {
        return "Firefox";
    } else if (userAgent.includes("SamsungBrowser")) {
        return "Samsung Internet";
    } else if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
        return "Opera";
    } else if (userAgent.includes("Trident") || userAgent.includes("MSIE")) {
        return "Internet Explorer";
    } else if (userAgent.includes("Edge")) {
        return "Microsoft Edge (Legacy)";
    } else if (userAgent.includes("Edg")) {
        return "Microsoft Edge (Chromium)";
    } else if (userAgent.includes("Chrome")) {
        return "Chrome";
    } else if (userAgent.includes("Safari")) {
        return "Safari";
    } else {
        return "Chưa rõ";
    }
}

function getOs() {
    const userAgent = navigator.userAgent;
    if (/Windows/.test(userAgent)) return "Windows";
    if (/Mac/.test(userAgent)) return "macOS";
    if (/iPhone|iPad|iPod/.test(userAgent)) return "iOS";
    if (/Android/.test(userAgent)) return "Android";
    if (/Linux/.test(userAgent)) return "Linux";
    if (/CrOS/.test(userAgent)) return "Chrome OS";
    return "Chưa rõ";
}

function handleRoute() {
    const path = location.pathname;
    if (path === "/" || path.endsWith("index.html") || path === "/day16/") {
        hideFingerPrinting?.();
        renderHomePage();
        renderListLanguage();
    }
    if (path === "/fingerprinting.html" || path.endsWith("fingerprinting.html")) {
        showFingerPrinting?.();
        generateFingerprint(stats);
    }
}

function renderHomePage() {
    const homeSection = $("#home-section");
    if (!homeSection) return;

    // Online - Offline
    homeSection.innerHTML = `
        <div>
            <div class="mb-6 flex items-center gap-3">
                <span class="text-xs px-3 py-1 rounded-full bg-accent/15 text-accent font-medium">Trang 1</span>
                <h1 class="text-2xl font-bold">Trang chủ — Thông tin BOM VIEWER</h1>
            </div>

            <!-- Status banner -->
            <div class="flex items-center justify-between bg-card border border-border rounded-2xl px-6 py-5 mb-6">
                <div class="flex items-center gap-4">
                    <span class="relative flex h-4 w-4">
                        <span
                            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-60"
                        ></span>
                        <span class="relative inline-flex rounded-full h-4 w-4 bg-success"></span>
                    </span>
                    <div>
                        <h2 class="font-semibold js-online-status">
                            ${stats.isOnline ? "Đang Online" : "Đang Offline"}
                        </h2>
                        <p class="mt-1 text-xs text-muted js-online-desc">
                            ${stats.isOnline ? "Trạng thái kết nối mạng" : "Trạng thái không kết nối mạng"}
                        </p>
                    </div>
                </div>
                <button class="px-4 py-2 text-sm rounded-lg bg-accent hover:bg-accent2 transition font-medium js-fingerprinting-btn"
                >
                    → Trang Fingerprinting
                </button>
            </div>

            <!-- Info cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <!-- Tọa độ -->
                <div class="bg-card border border-border rounded-2xl p-5 hover:border-accent/50 transition">
                    <div class="flex items-center gap-3 mb-3">
                        <div class="w-9 h-9 rounded-lg bg-accent/15 flex items-center justify-center text-accent">
                            📍
                        </div>
                        <p class="text-sm text-muted">Vị trí người dùng</p>
                    </div>
                    <p id="location-value" class="text-xl font-semibold">${stats.location}</p>
                    <p class="text-xs text-muted mt-1">Vĩ độ, Kinh độ</p>
                </div>

                <!-- Trạng thái -->
                <div class="bg-card border border-border rounded-2xl p-5 hover:border-accent/50 transition">
                    <div class="flex items-center gap-3 mb-3">
                        <div class="w-9 h-9 rounded-lg bg-success/15 flex items-center justify-center text-success">
                            🌐
                        </div>
                        <p class="text-sm text-muted">Trạng thái</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="w-3 h-3 rounded-full ${stats.isOnline ? "bg-success" : "bg-muted"}"></span>
                        <p class="text-xl font-semibold">${stats.isOnline ? "Online" : "Offline"}</p>
                    </div>
                </div>

                <!-- Trình duyệt -->
                <div class="bg-card border border-border rounded-2xl p-5 hover:border-accent/50 transition">
                    <div class="flex items-center gap-3 mb-3">
                        <div class="w-9 h-9 rounded-lg bg-accent2/15 flex items-center justify-center text-accent2">
                            🧭
                        </div>
                        <p class="text-sm text-muted">Trình duyệt</p>
                    </div>
                    <p class="text-xl font-semibold">${stats.browserName}</p>
                </div>

                <!-- Hệ điều hành -->
                <div class="bg-card border border-border rounded-2xl p-5 hover:border-accent/50 transition">
                    <div class="flex items-center gap-3 mb-3">
                        <div
                            class="w-9 h-9 rounded-lg bg-yellow-500/15 flex items-center justify-center text-yellow-400"
                        >
                            💻
                        </div>
                        <p class="text-sm text-muted">Hệ điều hành</p>
                    </div>
                    <p class="text-xl font-semibold">${stats.os}</p>
                </div>

                <!-- Ngôn ngữ -->
                <div class="bg-card border border-border rounded-2xl p-5 hover:border-accent/50 transition">
                    <div class="flex items-center gap-3 mb-3">
                        <div
                            class="w-9 h-9 rounded-lg bg-pink-500/15 flex items-center justify-center text-pink-400"
                        >
                            🗣️
                        </div>
                        <p class="text-sm text-muted">Ngôn ngữ</p>
                    </div>
                    <div class="flex flex-wrap gap-2 mt-1 list-languages">
                    </div>
                </div>

                <!-- Kích thước màn hình -->
                <div class="bg-card border border-border rounded-2xl p-5 hover:border-accent/50 transition">
                    <div class="flex items-center gap-3 mb-3">
                        <div
                            class="w-9 h-9 rounded-lg bg-cyan-500/15 flex items-center justify-center text-cyan-400"
                        >
                            🖥️
                        </div>
                        <p class="text-sm text-muted">Màn hình</p>
                    </div>
                    <p class="text-xl font-semibold">${stats.screenWidth} × ${stats.screenHeight}</p>
                    <p class="text-xs text-muted mt-1">Hướng: ${stats.orientation === "landscape-primary" ? "Chiều ngang" : "Chiều dọc"}</p>
                </div>
            </div>

            <!-- Banner quảng cáo -->
            <a
                href="./campaign.html?utm_source=nguyen_minh_hieu&utm_campaign=campage_1"
                class="group block mt-8 relative overflow-hidden rounded-2xl border border-border hover:border-accent transition"
            >
                <img
                    src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=1600&q=80"
                    class="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
                    alt="banner"
                />
                <div class="absolute inset-0 bg-gradient-to-r from-black/80 to-black/20 flex items-center px-8">
                    <div>
                        <p class="text-xs uppercase tracking-widest text-accent mb-2">Quảng cáo</p>
                        <h3 class="text-2xl font-bold">Khám phá giải pháp công nghệ mới</h3>
                        <button class="px-4 py-4 text-sm text-white mt-4 rounded-[8px] bg-[#6366f1]">Click để xem chi tiết →</button>
                    </div>
                </div>
            </a>
        </div>
    `;
}

function renderListLanguage() {
    const listLanguages = $(".list-languages");
    if (!listLanguages) return;

    listLanguages.innerHTML = stats.languages
        .map((language) => {
            return `<span class="text-xs px-2 py-1 rounded bg-white/5 border border-border">${language}</span>`;
        })
        .join("");
}

function init() {
    stats.browserName = getBrowserName();
    stats.os = getOs();

    handleRoute();

    const btn = $(".js-fingerprinting-btn");
    if (btn) {
        btn.addEventListener("click", () => {
            showFingerPrinting();
            history.pushState(stats, "Fingerprinting", "fingerprinting.html");
            generateFingerprint(stats);
        });
    }

    getLocation()
        .then((coords) => {
            stats.location = coords;
            updateLocationDisplay(coords);
        })
        .catch((err) => {
            console.error("Không lấy được vị trí:", err.message);
            stats.location = "Không xác định";
            updateLocationDisplay("Không xác định");
        });
}

window.addEventListener("popstate", handleRoute);
document.addEventListener("DOMContentLoaded", init);
