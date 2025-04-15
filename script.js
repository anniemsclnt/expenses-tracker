const expenseForm = document.getElementById("expenseForm");
const categoryInput = document.getElementById("categoryInput");
const amountInput = document.getElementById("amountInput");
const salaryInput = document.getElementById("salaryInput");
const expenseList = document.getElementById("expenseList");

const salaryDisplay = document.getElementById("salaryDisplay");
const totalDisplay = document.getElementById("totalDisplay");
const moneyLeftDisplay = document.getElementById("moneyLeftDisplay");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let salary = parseFloat(localStorage.getItem("salary")) || 0;

function formatCurrency(value) {
  return `₱${value.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`;
}

function updateSummary() {
  const total = expenses.reduce((sum, item) => sum + item.amount, 0);
  const moneyLeft = salary - total;

  salaryDisplay.textContent = formatCurrency(salary);
  totalDisplay.textContent = formatCurrency(total);
  moneyLeftDisplay.textContent = formatCurrency(moneyLeft);
}

function renderExpenses() {
  expenseList.innerHTML = '';
  expenses.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.category}: ${formatCurrency(item.amount)}
      <button onclick="deleteExpense(${index})" style="margin-left: 10px; color: red;">🗑️ Delete</button>
    `;
    expenseList.appendChild(li);
  });
  updateSummary();
}
