const cart = new Map();

function addToCart(productId, productInfo) {
    if (cart.has(productId)) {
        const item = cart.get(productId);
        item.quantity += 1;
    } else {
        cart.set(productId, {
            name: productInfo.name,
            price: productInfo.price,
            quantity: 1,
        });
    }
}

addToCart(101, { name: "Áo thun", price: 150000 });
addToCart(102, { name: "Quần jeans", price: 300000 });
addToCart(101, { name: "Áo thun", price: 150000 });

console.log(cart.size); // 2
console.log(cart.get(101)); // { name: "Áo thun", price: 150000, quantity: 2 }
console.log(cart.get(102)); // { name: "Quần jeans", price: 300000, quantity: 1 }

function getTotalPrice() {
    if (cart.size === 0) return 0;
    let total = 0;
    for (const [id, item] of cart) {
        total += item.price * item.quantity;
    }
    return total;
}
console.log(getTotalPrice()); // 600000

const voucherMap = new Map([
    ["SALE10", 10],
    ["SALE20", 20],
]);

function applyVoucher(voucherMap) {
    const total = getTotalPrice();

    if (total === 0) return 0;
    const code = prompt("Nhập mã giảm giá của bạn:");

    if (!code || !voucherMap.has(code)) {
        return total;
    }

    const discountPercent = voucherMap.get(code);
    return total * (1 - discountPercent / 100);
}
console.log(applyVoucher(voucherMap));
/**
 * SALE10 - 540000
 * SALE20 - 480000
 * SALE50 - 600000
 */
