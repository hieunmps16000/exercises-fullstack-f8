const salesReport = {
    branch: "Hà Nội",
    revenue: 500,
    subBranches: [
        {
            branch: "Cầu Giấy",
            revenue: 200,
            subBranches: [{ branch: "Cầu Giấy 1", revenue: 50, subBranches: [] }],
        },
        {
            branch: "Đống Đa",
            revenue: 150,
            subBranches: [],
        },
    ],
};

function calculateTotalRevenue(report) {
    let total = report.revenue;
    if (report.subBranches && report.subBranches.length > 0) {
        for (const subBranch of report.subBranches) {
            total += calculateTotalRevenue(subBranch);
        }
    }
    return total;
}
console.log(calculateTotalRevenue(salesReport)); // 900
console.log(
    calculateTotalRevenue({
        branch: "Hải Phòng",
        revenue: 100,
        subBranches: [],
    }),
); // 100
