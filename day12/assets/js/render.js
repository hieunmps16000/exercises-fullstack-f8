const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const boxBg = $(".js-change-color");
const btnChangeColor = $(".js-btn-change-color");
const tableBodyProductsList = $(".js-products-list");
const filterCategoriesList = $(".js-filter-category-list");
const filterPriceItems = $$(".js-filter-price-item");
const otpList = $(".js-otp");
const otpBtn = $(".js-otp-btn");
const filterBtns = $$(".js-filter-btn");
const filters = [];
const totalPrice = $(".js-total-price");

function toVND(price) {
    return price.toLocaleString("vi-VN");
}

function renderProducts(products) {
    const htmls = products
        .map(
            (product) => `
        <tr>
            <td>${product.name}</td>
            <td>${toVND(product.price)}</td>
            <td>${product.category}</td>
        </tr>
    `,
        )
        .join("");
    tableBodyProductsList.innerHTML = htmls;
}

function renderCategories(products) {
    const htmls = products
        .filter((product, index, arr) => index === arr.findIndex((item) => item.category === product.category))
        .map((product) => {
            return `
            <li class="js-filter-category-item group flex items-center gap-2 leading-[2.2] cursor-pointer select-none" data-category="${product.category}">
                <span
                    class="size-4 border-2 border-dark-900 rounded-full transition-colors duration-300 group-[.active]:bg-gray-300 group-hover:bg-gray-300"
                ></span>
                <span class="flex items-center gap-1">${product.category}</span>
            </li>
        `;
        })
        .join("");
    filterCategoriesList.innerHTML = htmls;
}

function renderOtpNumbers() {
    const opts = generateOTP() + "";
    const htmls = opts
        .split("")
        .map((char) => {
            return `
            <div class="w-12 h-14 bg-gray-900 border border-cyan-500/50 rounded-xl flex items-center justify-center text-2xl font-mono font-bold text-cyan-400 shadow-inner shadow-cyan-500/20">
                ${char}
            </div>
        `;
        })
        .join("");
    otpList.innerHTML = htmls;
}

function renderTotalPrice(products) {
    totalPrice.textContent = toVND(calculateTotal(products));
}

function toggleClassActive(arr) {
    arr.forEach((item) => {
        item.addEventListener("click", (e) => {
            arr.forEach((item) => item.classList.remove("active"));
            e.target.closest("li").classList.add("active");
        });
    });
}

function init(products) {
    renderProducts(products);
    renderCategories(products);
    toggleClassActive(filterPriceItems);
    renderTotalPrice(products);
    renderOtpNumbers();
}

// Init
init(products);

// Attach event listeners
filterBtns.forEach((btn) => {
    btn.onclick = (e) => {
        const filterList = e.target.nextElementSibling;
        filterList.classList.toggle("active");
    };
});

filterPriceItems.forEach((item) => {
    item.addEventListener("click", () => {
        renderTotalPrice(products);
    });
});

const fitlerCategoryItems = $$(".js-filter-category-item");
toggleClassActive(fitlerCategoryItems);
fitlerCategoryItems.forEach((item) => {
    item.addEventListener("click", () => {
        const category = item.dataset.category;
        const filteredProducts = getFilteredProducts(products, category);
        renderProducts(filteredProducts);
        renderTotalPrice(filteredProducts);
    });
});

otpBtn.onclick = renderOtpNumbers;
