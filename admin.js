// Check if adminToken exists
if (!localStorage.getItem('adminToken')) {
  window.location.href = 'admin-login.html'; // Force back to login
}

async function fetchSOSAlerts() {
    try {
      const response = await fetch('https://lifepulse-backend-3.onrender.com');
      const data = await response.json();
  
      const tableBody = document.querySelector('#sosTable tbody');
      tableBody.innerHTML = ''; // Clear old data
  
      data.forEach(alert => {
        const row = document.createElement('tr');
  
        const createdAt = new Date(alert.createdAt).toLocaleString();
        const problem = alert.problem;
        const latitude = alert.location.latitude;
        const longitude = alert.location.longitude;
  
        row.innerHTML = `
          <td>${createdAt}</td>
          <td>${problem}</td>
          <td>${latitude}</td>
          <td>${longitude}</td>
        `;
  
        tableBody.appendChild(row);
      });
  
    } catch (error) {
      console.error('Error fetching SOS alerts:', error);
    }
  }
  
  // Fetch alerts every 5 seconds
  setInterval(fetchSOSAlerts, 5000);
  
  // Fetch once immediately
  fetchSOSAlerts();
  let previousCount = 0;
const alertSound = new Audio('alert.mp3');

async function fetchSOSAlerts() {
  try {
    const response = await fetch('http://localhost:5000/api/sos');
    const data = await response.json();

    if (data.length > previousCount) {
      alertSound.play(); // Play sound if new alert comes
    }
    previousCount = data.length;

    const tableBody = document.querySelector('#sosTable tbody');
    tableBody.innerHTML = '';

    data.forEach(alert => {
      const row = document.createElement('tr');

      const createdAt = new Date(alert.createdAt).toLocaleString();
      const problem = alert.problem;
      const latitude = alert.location.latitude;
      const longitude = alert.location.longitude;

      row.innerHTML = `
        <td>${createdAt}</td>
        <td>${problem}</td>
        <td><a href="https://www.google.com/maps?q=${latitude},${longitude}" target="_blank">View Location 📍</a></td>
        <td><button onclick="resolveAlert('${alert._id}')">Mark as Resolved ✔️</button></td>
      `;

      tableBody.appendChild(row);
    });

  } catch (error) {
    console.error('Error fetching SOS alerts:', error);
  }
}

// Fetch alerts every 5 seconds
setInterval(fetchSOSAlerts, 5000);
fetchSOSAlerts();

// Mark alert as resolved (frontend version)
function resolveAlert(alertId) {
  const row = document.querySelector(`button[onclick="resolveAlert('${alertId}')"]`).closest('tr');
  row.remove();
  // If you want to update backend too, we can add DELETE request here 🔥
}
function logout() {
  localStorage.removeItem('adminToken');
  window.location.href = 'admin-login.html';
}
