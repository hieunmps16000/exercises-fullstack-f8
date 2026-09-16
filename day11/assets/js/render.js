const $ = document.querySelector.bind(document);
const cartTable = $(".js-cart-table");
const billTable = $(".js-bill-table");
const jsTotalBill = $(".js-total-bill");

const cartHtmls = cart.items
    .map((item) => {
        return `
        <tr>
            <td>${item.name}</td>
            <td>${toVND(item.price)}</td>
            <td>${item.quantity}</td>
            <td>${toVND(item.price * item.quantity)}</td>
        </tr>
    `;
    })
    .join("");
cartTable.innerHTML = cartHtmls;

const billHtmls = cart.items
    .map((item) => {
        return `
        <tr>
            <td>${item.name}</td>
            <td>${toVND(item.price)} x ${item.quantity}</td>
            <td>${toVND(item.price * item.quantity)}</td>
        </tr>
    `;
    })
    .join("");
const totalBill = `
        <ul>
            <li class="leading-[2]">Tổng tiền hàng: <span>${toVND(cart.subtotal)} VNĐ</span></li>
            <li class="leading-[2]">Giảm giá: <span class="px-[4px] rounded-[4px] bg-[#e000ef] text-white">${cart._discountRate * 100}%</span> (-${toVND(cart.subtotal * cart._discountRate)}) VNĐ</li>
            <li class="mt-3 font-bold text-white text-[20px]">Tổng thanh toán: ${toVND(cart.totalPrice)} VNĐ</li>
        </ul>
    `;
billTable.innerHTML = billHtmls;
jsTotalBill.innerHTML = totalBill;
