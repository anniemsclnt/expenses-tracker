window.onload = function () {
  // Load saved expenses from localStorage
  const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

  // Group expenses by week
  const weeklyTotals = [0, 0, 0, 0];
  const categoryTotals = {
    Food: 0,
    Transport: 0,
    Entertainment: 0,
    Miscellaneous: 0
  };

  expenses.forEach(expense => {
    const expenseDate = new Date(expense.date);
    const day = expenseDate.getDate();

    // Determine which week of the month
    let weekIndex = Math.floor((day - 1) / 7);
    if (weekIndex > 3) weekIndex = 3; // Limit to 4 weeks
    weeklyTotals[weekIndex] += expense.amount;

    // Group by category
    if (categoryTotals[expense.category] !== undefined) {
      categoryTotals[expense.category] += expense.amount;
    } else {
      categoryTotals.Miscellaneous += expense.amount;
    }
  });

  const monthNames = ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"];
  const currentMonth = monthNames[new Date().getMonth()];

  // Line Chart - Weekly Spending
  const ctxLine = document.getElementById('lineChart').getContext('2d');
  const lineChart = new Chart(ctxLine, {
    type: 'line',
    data: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [{
        label: 'Monthly Spending (₱)',
        data: weeklyTotals,
        backgroundColor: 'rgba(161, 217, 179, 0.2)',
        borderColor: 'rgba(161, 217, 179, 1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: `Spending Trend for ${currentMonth}`,
          font: {
            size: 18
          }
        },
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 50
          }
        }
      }
    }
  });

  // Pie Chart - Category Breakdown
  const ctxPie = document.getElementById('pieChart').getContext('2d');
  const pieChart = new Chart(ctxPie, {
    type: 'pie',
    data: {
      labels: Object.keys(categoryTotals),
      datasets: [{
        data: Object.values(categoryTotals),
        backgroundColor: [
          'rgba(161, 217, 179, 0.8)',
          'rgba(189, 154, 126, 0.8)',
          'rgba(236, 156, 145, 0.8)',
          'rgba(212, 180, 120, 0.8)'
        ],
        borderColor: '#fff',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: `Expense Breakdown for ${currentMonth}`,
          font: {
            size: 18
          }
        },
        legend: {
          position: 'top'
        }
      }
    }
  });
};
