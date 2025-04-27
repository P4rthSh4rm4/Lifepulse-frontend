async function sendSOS() {
    const problem = document.getElementById('problem').value || 'Unknown problem';
  
    if (!navigator.geolocation) {
      alert('Geolocation not supported!');
      return;
    }
  
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
  
      try {
        const response = await fetch('http://localhost:5000/api/sos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            problem,
            location: { latitude, longitude }
          })
        });
  
        const result = await response.json();
        document.getElementById('status').innerText = '✅ SOS Sent Successfully!';
        console.log('SOS Sent:', result);
  
      } catch (error) {
        console.error('Error sending SOS:', error);
        document.getElementById('status').innerText = '❌ Failed to send SOS!';
      }
  
    }, (error) => {
      console.error('Error getting location:', error);
      document.getElementById('status').innerText = '❌ Location access denied!';
    });
  }
  