const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const boxBg = $(".js-change-color");
const btnChangeColor = $(".js-btn-change-color");
const tableBodyProductsList = $(".js-products-list");
const filterCategoriesList = $(".js-filter-category-list");
const filterPricesList = $(".js-filter-price-list");
const otpList = $(".js-otp");
const otpBtn = $(".js-otp-btn");
const filterBtns = $$(".js-filter-btn");
const totalPrice = $(".js-total-price");
let productsOfCategory = [];

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

function renderCategories(categories) {
    const htmls = categories
        .map((category) => {
            return `
            <li class="js-filter-category-item group flex items-center gap-2 leading-[2.2] cursor-pointer select-none" data-category="${category}">
                <span
                    class="size-4 border-2 border-dark-900 rounded-full transition-colors duration-300 group-[.active]:bg-gray-300 group-hover:bg-gray-300"
                ></span>
                <span class="flex items-center gap-1">${category}</span>
            </li>
        `;
        })
        .join("");
    filterCategoriesList.innerHTML = htmls;
}

function renderSorts(sorts) {
    const htmls = sorts
        .map((sort) => {
            return `
            <li class="js-filter-price-item group flex items-center gap-2 leading-[2.2] cursor-pointer select-none"
                data-type="${sort.type}"
            >
                <span
                    class="size-4 border-2 border-dark-900 rounded-full transition-colors duration-300 group-[.active]:bg-gray-300 group-hover:bg-gray-300"
                ></span>
                <span class="flex items-center gap-1">${sort.name}</span>
            </li>
        `;
        })
        .join("");
    filterPricesList.innerHTML = htmls;
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

function handleSort() {
    const filterPriceItems = $$(".js-filter-price-item");
    toggleClassActive(filterPriceItems);
    filterPriceItems.forEach((item) => {
        item.addEventListener("click", () => {
            const type = item.dataset.type;
            if (productsOfCategory.length) {
                renderProducts(getSortedProducts(productsOfCategory, type));
            } else {
                renderProducts(getSortedProducts(products, type));
            }
            renderTotalPrice(products);
        });
    });
}

function handleFilterCategory() {
    const fitlerCategoryItems = $$(".js-filter-category-item");
    toggleClassActive(fitlerCategoryItems);
    fitlerCategoryItems.forEach((item) => {
        item.addEventListener("click", () => {
            const category = item.dataset.category;
            const filteredProducts = getFilteredProducts(products, category);
            productsOfCategory = filteredProducts;
            renderProducts(filteredProducts);
            renderTotalPrice(filteredProducts);
        });
    });
}

function init(products) {
    renderProducts(products);
    renderCategories(categories);
    renderSorts(sorts);
    renderTotalPrice(products);
    renderOtpNumbers();
    handleSort();
    handleFilterCategory();
}

// Init
init(products);

// Attach event listeners
filterBtns.forEach((btn) => {
    btn.onclick = (e) => {
        const filterList = btn.nextElementSibling;
        filterList.classList.toggle("active");
    };
});

// Filter category

otpBtn.onclick = renderOtpNumbers;
