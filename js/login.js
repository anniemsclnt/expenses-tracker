document.getElementById("login-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const matchedUser = users.find(user => user.username === username && user.password === password);

  if (matchedUser) {
    localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
    window.location.href = "dashboard.html"; // or whatever page
  } else {
    alert("Incorrect username or password.");
  }
});
