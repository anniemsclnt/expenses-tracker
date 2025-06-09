document.getElementById('signup-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  if (!username || !password) {
    alert('Please fill in all fields.');
    return;
  }

  // Save to localStorage
  const users = JSON.parse(localStorage.getItem('users')) || {};
  if (users[username]) {
    alert('Username already exists.');
  } else {
    users[username] = { password };
    localStorage.setItem('users', JSON.stringify(users));
    alert('Account created! You can now log in.');
    window.location.href = 'login.html';
  }
});
