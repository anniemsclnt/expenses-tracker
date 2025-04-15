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
      <span id="expenseText-${index}">
        ${item.category}: ${formatCurrency(item.amount)}
      </span>
      <button onclick="editExpense(${index})" style="margin-left: 10px;">✏️ Edit</button>
      <button onclick="deleteExpense(${index})" style="color: red;">🗑️ Delete</button>
    `;

    expenseList.appendChild(li);
  });
  updateSummary();
}

function deleteExpense(index) {
  expenses.splice(index, 1); // remove 1 item at the given index
  localStorage.setItem("expenses", JSON.stringify(expenses)); // update storage
  renderExpenses(); // re-render list
}
function editExpense(index) {
  const item = expenses[index];
  const span = document.getElementById(`expenseText-${index}`);

  // Replace the span with editable inputs
  span.innerHTML = `
    <input type="text" id="editCategory-${index}" value="${item.category}" style="width: 100px;">
    <input type="number" id="editAmount-${index}" value="${item.amount}" style="width: 80px;">
    <button onclick="saveEdit(${index})" style="color: green;">💾 Save</button>
  `;
}
function saveEdit(index) {
  const newCategory = document.getElementById(`editCategory-${index}`).value;
  const newAmount = parseFloat(document.getElementById(`editAmount-${index}`).value);

  if (!newCategory || isNaN(newAmount)) return alert("Please enter valid data");

  expenses[index] = { category: newCategory, amount: newAmount };
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses();
}

