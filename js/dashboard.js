window.onload = function () {
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  // Group by month
  const monthlyTotals = Array(12).fill(0);
  const currentMonth = new Date().getMonth();
  const categoryTotals = {};

  expenses.forEach((expense) => {
    const date = new Date(expense.date);
    const month = date.getMonth();
    monthlyTotals[month] += expense.amount;

    if (month === currentMonth) {
      categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
    }
  });

  const ctxYearly = document.getElementById("yearlyChart").getContext("2d");
  new Chart(ctxYearly, {
    type: "line",
    data: {
      labels: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ],
      datasets: [{
        label: "Yearly Spending (₱)",
        data: monthlyTotals,
        borderColor: "#4a6d47",
        backgroundColor: "rgba(161, 217, 179, 0.2)",
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true
    }
  });

  const ctxPie = document.getElementById("monthlyPieChart").getContext("2d");
  new Chart(ctxPie, {
    type: "pie",
    data: {
      labels: Object.keys(categoryTotals),
      datasets: [{
        data: Object.values(categoryTotals),
        backgroundColor: ['#a1d9b3', '#bd9a7e', '#ec9c91', '#d4b478']
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: `Spending Breakdown - This Month`
        }
      }
    }
  });
};

// Excel Download Function
function downloadExcel() {
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  let csv = "Date,Name,Amount,Category\n";
  expenses.forEach(e => {
    csv += `${e.date},${e.name},${e.amount},${e.category}\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "Expense_Summary.csv";
  link.click();
}
