/**
 * Bài 2: Bộ công cụ xử lý thời gian
 * =================================
 * Nếu thời gian truyền vào cách hiện tại dưới 1 phút: trả về "Vừa xong".
 * Nếu dưới 60 phút: trả về "X phút trước".
 * Nếu dưới 24 giờ: trả về "X giờ trước".
 * Nếu từ 24 giờ trở lên: trả về định dạng DD/MM/YYYY.
 */
function timeAgo(dateString) {
    const now = new Date("2026-09-20T15:00:00+07:00");
    const past = new Date(dateString);
    const diffInSeconds = Math.floor((now - past) / 1000);

    if (diffInSeconds < 60) {
        return "Vừa xong";
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes} phút trước`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours} giờ trước`;
    }

    const day = String(past.getDate()).padStart(2, "0");
    const month = String(past.getMonth() + 1).padStart(2, "0");
    const year = past.getFullYear();

    return `${day}/${month}/${year}`;
}

console.log(timeAgo("2026-09-20T14:59:30+07:00"));
console.log(timeAgo("2026-09-20T14:30:00+07:00"));
console.log(timeAgo("2026-09-20T10:00:00+07:00"));
console.log(timeAgo("2026-09-18T08:00:00+07:00"));

/**
 * Viết hàm getCountdown(targetDateString).
 * ========================================
 * Nhận vào một thời điểm trong tương lai.
 * Trả về object chứa số ngày, giờ, phút, giây còn lại đến thời điểm đó.
 */
function getCountdown(targetDateString) {
    const targetTime = new Date(targetDateString).getTime();
    const now = new Date().getTime();
    const difference = (targetTime - now) / 1000;

    if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const seconds = Math.floor(difference % 60);
    const minutes = Math.floor((difference / 60) % 60);
    const hours = Math.floor((difference / 3600) % 24);
    const days = Math.floor(difference / (3600 * 24));

    return {
        days,
        hours,
        minutes,
        seconds,
    };
}
const countdown = getCountdown("2026-09-24T15:30:20+07:00");
console.log(countdown);

function isWeekend(dateString) {
    const day = new Date(dateString).getDay();
    return day === 0 || day === 6;
}

/**
 * 0: Chủ nhật
 * 1: Thứ hai
 * 2: Thứ ba
 * 3: Thứ tư
 * 4: Thứ năm
 * 5: Thứ sáu
 * 6: Thứ bảy
 */

console.log(isWeekend("2026-09-19")); // true
console.log(isWeekend("2026-09-20")); // true
console.log(isWeekend("2026-09-21")); // false
