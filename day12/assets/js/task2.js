const products = [
    { id: 1, name: "iPhone 15", price: 22000000, category: "Điện thoại" },
    {
        id: 2,
        name: "Samsung Galaxy S24",
        price: 20000000,
        category: "Điện thoại",
    },
    { id: 3, name: "MacBook Air M2", price: 26000000, category: "Laptop" },
    { id: 4, name: "Dell XPS 13", price: 30000000, category: "Laptop" },
    { id: 5, name: "AirPods Pro", price: 6000000, category: "Phụ kiện" },
    { id: 6, name: "Apple Watch", price: 9000000, category: "Phụ kiện" },
];

function getFilteredProducts(productList, category) {
    return productList.filter((product) => product.category.toLowerCase() === category.toLowerCase());
}

// const filteredProducts = getFilteredProducts(products, "Điện thoại");
// const filteredProducts = getFilteredProducts(products, "laptop");
const filteredProducts = getFilteredProducts(products, "phụ kiện");
// console.log(filteredProducts);

function getSortedProducts(productList, sortType = "default") {
    let output = [];
    switch (sortType) {
        case "default":
            output = [...productList];
            break;
        case "asc":
            output = [...productList].sort((a, b) => a.price - b.price);
            break;
        case "desc":
            output = [...productList].sort((a, b) => b.price - a.price);
            break;
    }
    return output;
}
console.log("================= getSortedProducts =================");
console.log(getSortedProducts(products, "desc"));

function calculateTotal(products) {
    return products.reduce((total, product) => (total += product.price), 0);
}

console.log("================= Total price =================");
const cart = [{ price: 1 }, { price: 2 }, { price: 3 }]; // 6
console.log(calculateTotal(products).toLocaleString("vi-VN"));

function getProductDescriptions(products) {
    return products.map((product) => {
        return `${product.name} - ${product.category} - ${product.price}`;
    });
}

console.log("================= Description =================");
console.log(getProductDescriptions(products));
