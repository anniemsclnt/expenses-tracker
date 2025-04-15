const form = document.getElementById("expenseForm");
const categoryInput = document.getElementById("category");
const amountInput = document.getElementById("amount");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const category = categoryInput.value;
  const amount = parseFloat(amountInput.value);

  expenses.push({ category, amount });
  localStorage.setItem("expenses", JSON.stringify(expenses));
  categoryInput.value = "";
  amountInput.value = "";

  updateChart();
});

function updateChart() {
  const totals = {};
  expenses.forEach(exp => {
    totals[exp.category] = (totals[exp.category] || 0) + exp.amount;
  });

  const labels = Object.keys(totals);
  const data = Object.values(totals);

  const ctx = document.getElementById("expenseChart").getContext("2d");
  if (window.expenseChart) window.expenseChart.destroy(); // prevent double chart
  window.expenseChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        label: 'Expenses',
        data: data,
        backgroundColor: [
          '#ff9999','#66b3ff','#99ff99','#ffcc99',
          '#c2c2f0', '#ffb3e6', '#c2d6d6'
        ]
      }]
    }
  });
}

// Show the chart on load
updateChart();

