const userA_searches = ["áo thun", "quần jeans", "áo khoác", "áo thun", "giày cừu"];
const userB_searches = ["quần jeans", "mũ bảo hiểm", "giày cừu", "balo"];

function getUniqueTags(arr) {
    return [...new Set(arr)];
}
console.log(getUniqueTags(userA_searches)); // ["áo thun", "quần jeans", "áo khoác", "giày cừu"];

function getCommonTags(arr1, arr2) {
    return [...new Set(arr1.filter((item) => new Set(arr2).has(item)))];
}
console.log(getCommonTags(userA_searches, userB_searches));
console.log(getCommonTags(["áo thun", "áo thun", "balo"], ["áo thun"])); // ["áo thun"]
console.log(getCommonTags(["áo thun"], ["balo"])); // []
console.log(getUniqueTags([])); // []
