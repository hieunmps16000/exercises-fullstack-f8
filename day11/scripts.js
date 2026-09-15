function toVND(price) {
    return price.toLocaleString("vi-VN");
}

const cart = {
    items: [
        {
            id: 1,
            name: "Laptop",
            price: 15000000,
            quantity: 1,
            category: "Electronics",
        },
        {
            id: 2,
            name: "Mouse",
            price: 300000,
            quantity: 2,
            category: "Electronics",
        },
    ],
    _discountRate: 0,
    validCoupons: {
        WELCOME10: 0.1,
        SUMMER20: 0.2,
        VIP30: 0.3,
    },

    // Trả về tổng sản phẩm trong giỏ
    get totalQuantity() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    },

    // Tính tổng tiền hàng (chưa áp dụng mã giảm giá)
    get subtotal() {
        return this.items.reduce((total, item) => total + item.quantity * item.price, 0);
    },

    // Áp dụng mã giảm giá bằng cách truyền tên coupon
    // Nếu coupon có trong `validCoupons`, gán `_discountRate`. Nếu không, in thông báo lỗi và không gán.
    set applyCoupon(code) {
        if (this.validCoupons[code] !== undefined) {
            this._discountRate = this.validCoupons[code];
        } else {
            console.error("Lỗi: Mã giảm giá không tồn tại!");
        }
    },

    // Tính tổng tiền thực tế phải trả
    get totalPrice() {
        return this.subtotal - this.subtotal * this._discountRate;
    },

    // Thêm nhiều sản phẩm cùng lúc
    // - Nếu item đã tồn tại (dựa vào id): cộng dồn quantity.
    // - Nếu chưa có: kiểm tra xem item truyền vào có mặc định `quantity` chưa, nếu chưa thì gán mặc định bằng 1 rồi mới push.
    addItems(...newItems) {
        newItems.forEach((newItem) => {
            const duplicatedItem = this.items.find((item) => item.id === newItem.id);
            const quantity = "quantity" in newItem ? newItem.quantity : 1;
            if (duplicatedItem) {
                duplicatedItem.quantity += quantity;
            } else {
                this.items.push({ ...newItem, quantity });
            }
        });
    },

    // Cập nhật số lượng sản phẩm theo id
    // Nếu newQuantity <= 0 thì tự động xoá sản phẩm đó khỏi giỏ.
    updateQuantity(id, newQuantity) {
        const item = this.items.find((item) => item.id === id);

        if (!item) {
            console.error(`Lỗi: Không tìm thấy sản phẩm theo ID = ${id}`);
            return;
        }

        newQuantity <= 0 ? this.removeItem(id) : (item.quantity = newQuantity);
    },

    // Xoá sản phẩm theo id
    removeItem(id) {
        const index = this.items.findIndex((item) => item.id === id);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
    },

    // Lọc danh sách sản phẩm theo danh mục (category)
    getItemsByCategory(category) {
        return this.items.filter((item) => item.category.toLowerCase() === category.toLowerCase());
    },

    // In hoá đơn chi tiết ra console
    printInvoice() {
        console.log("================ HOÁ ĐƠN BAN HÀNG ================");
        // In danh sách từng dòng: Tên - Đơn giá - Số lượng - Thành tiền
        this.items.forEach((item) => {
            console.log(
                `${item.name} - ${toVND(item.price)} x ${item.quantity} = ${toVND(item.price * item.quantity)}`,
            );
        });

        // In Tổng tiền hàng (Subtotal)
        console.log(`Tổng tiền hàng: ${toVND(this.subtotal)}`);

        // In Giảm giá (% và số tiền giảm)
        if (this._discountRate) {
            console.log(`Giảm giá: ${this._discountRate * 100}% (-${toVND(this.subtotal * this._discountRate)})`);
        }

        // In Tổng thanh toán (Total Price)
        console.log(`Tổng thanh toán: ${toVND(this.totalPrice)}`);
        console.log("==================================================");
    },
};

// console.log(cart.totalQuantity); // 3
// console.log(toVND(cart.subtotal)); // 15.600.000
cart.applyCoupon = "WELCOME10";
// console.log(toVND(cart.totalPrice)); // subtotal sau khi giảm 10%
// cart.applyCoupon = "INVALID";
// cart.addItems(
//     { id: 3, name: "Keyboard", price: 700000, category: "Electronics" },
//     { id: 2, name: "Mouse", price: 300000, quantity: 1, category: "Electronics" },
// );
// console.log(cart.items);
// cart.updateQuantity(1, 3); // Laptop quantity = 3
// cart.updateQuantity(2, 0); // Xoá Mouse khỏi giỏ hàng
// console.log(cart.items);
// cart.removeItem(1); // Xoá sản phẩm có id = 1
// console.log(cart.items);
// console.log(cart.getItemsByCategory("Electronics"));
cart.printInvoice();
