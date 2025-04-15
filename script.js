const expenseForm = document.getElementById("expenseForm");
const categoryInput = document.getElementById("category");
const amountInput = document.getElementById("amount");
const tableBody = document.querySelector("#expenseTable tbody");
const totalCell = document.getElementById("totalCell");

const salaryInput = document.getElementById("salaryInput");
const moneyLeftSpan = document.getElementById("moneyLeft");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let salary = parseFloat(localStorage.getItem("salary")) || 0;

salaryInput.value = salary || "";

function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function calculateTotal() {
  let total = expenses.reduce((sum, item) => sum + item.amount, 0);
  totalCell.textContent = `$${total.toFixed(2)}`;

  let moneyLeft = salary - total;
  moneyLeftSpan.textContent = moneyLeft.toFixed(2);

  // Change colors based on savings/overspending
  totalCell.className = "red";
  moneyLeftSpan.parentElement.className = moneyLeft >= 0 ? "green" : "red";
}

function renderTable() {
  tableBody.innerHTML = "";
  expenses.forEach((item, index) => {
    let row = document.createElement("tr");
    row.innerHTML = `<td>${item.category}</td><td>$${item.amount.toFixed(2)}</td>`;
    tableBody.appendChild(row);
  });
  calculateTotal();
}

expenseForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const category = categoryInput.value;
  const amount = parseFloat(amountInput.value);

  if (!category || isNaN(amount)) return;

  expenses.push({ category, amount });
  categoryInput.value = "";
  amountInput.value = "";

  saveExpenses();
  renderTable();
});

salaryInput.addEventListener("change", function () {
  salary = parseFloat(salaryInput.value) || 0;
  localStorage.setItem("salary", salary);
  calculateTotal();
});

renderTable();
