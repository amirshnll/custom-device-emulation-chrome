const deviceData = {};

// Load JSON from the URL
fetch('https://raw.githubusercontent.com/amirshnll/custom-device-emulation-chrome/refs/heads/main/device.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        Object.assign(deviceData, data);
        displayDevices("desktop", "");
    })
    .catch(error => {
        resultsDiv.innerHTML = "<div>Failed to load devices. Please try again later.</div>";
    });

const categorySelect = document.getElementById("category");
const searchInput = document.getElementById("search");
const resultsDiv = document.getElementById("results");

// Set the current year dynamically in the footer
document.getElementById("year").textContent = new Date().getFullYear();

categorySelect.addEventListener("change", () => {
    displayDevices(categorySelect.value, searchInput.value);
});

searchInput.addEventListener("input", () => {
    displayDevices(categorySelect.value, searchInput.value);
});

function displayDevices(category, search) {
    resultsDiv.innerHTML = ""; // Clear results
    const devices = deviceData[category] || [];
    const filteredDevices = devices.filter(device =>
        device.device.toLowerCase().includes(search.toLowerCase())
    );

    if (filteredDevices.length === 0) {
        resultsDiv.innerHTML = "<div>No devices found.</div>";
        return;
    }

    filteredDevices.forEach(device => {
        const div = document.createElement("div");
        div.textContent = `${device.device} - ${device.width}x${device.height} - DPR: ${device.dpr}`;
        resultsDiv.appendChild(div);
    });
}
