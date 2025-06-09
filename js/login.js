document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  const users = JSON.parse(localStorage.getItem('users')) || {};
  if (users[username] && users[username].password === password) {
    localStorage.setItem('currentUser', username);
    alert('Login successful!');
    window.location.href = 'dashboard.html'; // Change to your logged-in home
  } else {
    alert('Invalid username or password.');
  }
});
