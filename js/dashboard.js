window.onload = function () {
  const salary = parseFloat(localStorage.getItem("salary")) || 0;
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  // Totals
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const savings = salary - totalExpenses;

  document.getElementById("total-salary").textContent = `₱${salary.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`;
  document.getElementById("total-expenses").textContent = `₱${totalExpenses.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`;
  document.getElementById("total-savings").textContent = `₱${savings.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`;

  // Line Chart: Yearly expenses grouped by month
  const monthlyTotals = new Array(12).fill(0);
  expenses.forEach(exp => {
    const month = new Date(exp.date).getMonth();
    monthlyTotals[month] += exp.amount;
  });

  const ctxLine = document.getElementById("lineChart").getContext("2d");
  new Chart(ctxLine, {
    type: 'line',
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [{
        label: 'Monthly Spending (₱)',
        data: monthlyTotals,
        borderColor: '#6a994e',
        backgroundColor: 'rgba(106, 153, 78, 0.2)',
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Spending Trend in 2025"
        }
      }
    }
  });

  // Pie Chart: Category breakdown this month
  const currentMonth = new Date().getMonth();
  const categoryTotals = {};

  expenses.forEach(exp => {
    const expMonth = new Date(exp.date).getMonth();
    if (expMonth === currentMonth) {
      categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
    }
  });

  const ctxPie = document.getElementById("pieChart").getContext("2d");
  new Chart(ctxPie, {
    type: 'pie',
    data: {
      labels: Object.keys(categoryTotals),
      datasets: [{
        data: Object.values(categoryTotals),
        backgroundColor: [
          '#a98467', '#c2b280', '#a3b18a', '#e5989b', '#ffb5a7'
        ]
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "This Month’s Expenses by Category"
        }
      }
    }
  });
};
