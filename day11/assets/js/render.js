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
            <li class="leading-[2]">Tổng tiền hàng: <span>${toVND(cart.subtotal)}</span></li>
            <li class="leading-[2]">Giảm giá: ${cart._discountRate * 100}% (-${toVND(cart.subtotal * cart._discountRate)})</li>
            <li class="font-bold text-white text-[20px]">Tổng thanh toán: ${toVND(cart.totalPrice)}</li>
        </ul>
    `;
billTable.innerHTML = billHtmls;
jsTotalBill.innerHTML = totalBill;
