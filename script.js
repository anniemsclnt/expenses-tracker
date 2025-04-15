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
  expenses.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = `${item.category}: ${formatCurrency(item.amount)}`;
    expenseList.appendChild(li);
  });
  updateSummary();
}

expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const category = categoryInput.value;
  const amount = parseFloat(amountInput.value);

  if (salaryInput.value) {
    salary = parseFloat(salaryInput.value);
    localStorage.setItem("salary", salary);
    salaryInput.value = "";
  }

  if (!category || isNaN(amount)) return;

  expenses.push({ category, amount });
  localStorage.setItem("expenses", JSON.stringify(expenses));

  categoryInput.value = "";
  amountInput.value = "";

  renderExpenses();
});

renderExpenses();
