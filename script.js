// Wait for the DOM to load before executing the script
window.onload = function() {
  // Get the current month dynamically
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentMonth = monthNames[new Date().getMonth()]; // Get current month as a string

  // Line Chart - Monthly Spending Trend
  var ctxLine = document.getElementById('lineChart').getContext('2d');
  var lineChart = new Chart(ctxLine, {
    type: 'line', // Line chart type
    data: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], // X-axis labels (weeks in a month)
      datasets: [{
        label: 'Monthly Spending ($)',
        data: [150, 200, 250, 300], // Example data for spending per week
        backgroundColor: 'rgba(161, 217, 179, 0.2)', // Light pastel emerald
        borderColor: 'rgba(161, 217, 179, 1)', // Pastel emerald border color
        borderWidth: 2,
        tension: 0.4, // Smooth lines
        fill: true
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: `Spending Trend for ${currentMonth}`, // Dynamic title
          font: {
            size: 18
          }
        },
        legend: {
          display: false // Hide legend (since there's only one dataset)
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

  // Pie Chart - Expense Breakdown by Category
  var ctxPie = document.getElementById('pieChart').getContext('2d');
  var pieChart = new Chart(ctxPie, {
    type: 'pie', // Pie chart type
    data: {
      labels: ['Food', 'Transport', 'Entertainment', 'Misc'], // Categories
      datasets: [{
        data: [300, 150, 100, 50], // Example data for each category
        backgroundColor: [
          'rgba(161, 217, 179, 0.8)', // Pastel emerald for food
          'rgba(189, 154, 126, 0.8)', // Clay brown for transport
          'rgba(236, 156, 145, 0.8)', // Light red for entertainment
          'rgba(212, 180, 120, 0.8)' // Soft yellow for misc
        ],
        borderColor: '#fff', // White border for each segment
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: `Expense Breakdown for ${currentMonth}`, // Dynamic title
          font: {
            size: 18
          }
        },
        legend: {
          position: 'top' // Position legend at the top
        }
      }
    }
  });
};
