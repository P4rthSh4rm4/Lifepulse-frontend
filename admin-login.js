async function login() {
    const password = document.getElementById('password').value;
  
    try {
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
  
      const result = await response.json();
  
      if (result.success) {
        localStorage.setItem('adminToken', result.token);
        window.location.href = 'admin.html';
      } else {
        document.getElementById('loginStatus').innerText = '❌ Wrong Password!';
      }
  
    } catch (error) {
      console.error('Login error:', error);
      document.getElementById('loginStatus').innerText = '❌ Error logging in.';
    }
  }
  