const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
const salary = parseFloat(localStorage.getItem("salary")) || 0;

const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
const yearlySavings = salary - totalExpenses;

document.getElementById("yearlyEarnings").textContent = `₱${salary.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`;
document.getElementById("yearlyExpenses").textContent = `₱${totalExpenses.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`;
document.getElementById("yearlySavings").textContent = `₱${yearlySavings.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`;

// Pie Chart
const categoryTotals = {};
expenses.forEach((e) => {
  categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
});

const ctx = document.getElementById("summaryChart").getContext("2d");
new Chart(ctx, {
  type: 'pie',
  data: {
    labels: Object.keys(categoryTotals),
    datasets: [{
      label: 'Expenses',
      data: Object.values(categoryTotals),
      backgroundColor: ['#ff9999','#66b3ff','#99ff99','#ffcc99','#c2c2f0','#ffb3e6']
    }]
  }
});
