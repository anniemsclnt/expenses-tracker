const expenseForm = document.getElementById("expenseForm");
const categoryInput = document.getElementById("categoryInput");
const amountInput = document.getElementById("amountInput");
const salaryInput = document.getElementById("salaryInput");
const monthSelector = document.getElementById("monthSelector");
const expenseList = document.getElementById("expenseList");

const salaryDisplay = document.getElementById("salaryDisplay");
const totalDisplay = document.getElementById("totalDisplay");
const moneyLeftDisplay = document.getElementById("moneyLeftDisplay");

let data = JSON.parse(localStorage.getItem("monthlyData")) || {};

// Load selected month or default
let currentMonth = monthSelector.value;

// Format ₱
function formatCurrency(value) {
  return `₱${value.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`;
}

// Save data
function saveData() {
  localStorage.setItem("monthlyData", JSON.stringify(data));
}

// Render current month
function renderExpenses() {
  const thisMonth = data[currentMonth] || { salary: 0, expenses: [] };
  const expenses = thisMonth.expenses || [];
  const salary = thisMonth.salary || 0;

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

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const moneyLeft = salary - total;

  salaryDisplay.textContent = formatCurrency(salary);
  totalDisplay.textContent = formatCurrency(total);
  moneyLeftDisplay.textContent = formatCurrency(moneyLeft);
  moneyLeftDisplay.className = "highlight";
}

// Form submit
expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const category = categoryInput.value;
  const amount = parseFloat(amountInput.value);

  if (!category || isNaN(amount)) return;

  if (!data[currentMonth]) data[currentMonth] = { salary: 0, expenses: [] };
  const monthData = data[currentMonth];

  // Set salary if updated
  if (salaryInput.value) {
    monthData.salary = parseFloat(salaryInput.value);
    salaryInput.value = "";
  }

  // Add new expense
  monthData.expenses.push({ category, amount });

  // Save & reset form
  categoryInput.value = "";
  amountInput.value = "";
  saveData();
  renderExpenses();
});

// Delete
function deleteExpense(index) {
  data[currentMonth].expenses.splice(index, 1);
  saveData();
  renderExpenses();
}

// Edit
function editExpense(index) {
  const item = data[currentMonth].expenses[index];
  const span = document.getElementById(`expenseText-${index}`);

  span.innerHTML = `
    <input type="text" id="editCategory-${index}" value="${item.category}" style="width: 100px;">
    <input type="number" id="editAmount-${index}" value="${item.amount}" style="width: 80px;">
    <button onclick="saveEdit(${index})" style="color: green;">💾 Save</button>
  `;
}

// Save Edit
function saveEdit(index) {
  const newCategory = document.getElementById(`editCategory-${index}`).value;
  const newAmount = parseFloat(document.getElementById(`editAmount-${index}`).value);

  if (!newCategory || isNaN(newAmount)) {
    alert("Enter valid data.");
    return;
  }

  data[currentMonth].expenses[index] = { category: newCategory, amount: newAmount };
  saveData();
  renderExpenses();
}

// Change month event
monthSelector.addEventListener("change", () => {
  currentMonth = monthSelector.value;
  renderExpenses();
});

// Initial render
renderExpenses();
