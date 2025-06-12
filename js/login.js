document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(user => user.email === email && user.password === password);

  if (!user) {
    alert("Invalid email or password.");
    return;
  }

  localStorage.setItem("loggedInUser", JSON.stringify(user));
  alert("Login successful!");
  window.location.href = "dashboard.html";
});
