const deviceData = {};

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

async function loadDevices() {
    const status = document.getElementById('data-status');
    try {
        let response;
        try {
            response = await fetch('https://raw.githubusercontent.com/amirshnll/custom-device-emulation-chrome/refs/heads/main/device.json', {signal: AbortSignal.timeout(4000)});
            if (!response.ok) throw Error('Remote data unavailable');
            Object.assign(deviceData, await response.json());
            status.textContent = 'Loaded current GitHub dataset.';
        } catch {
            response = await fetch('device.json');
            if (!response.ok) throw Error('Bundled data unavailable');
            Object.assign(deviceData, await response.json());
            status.textContent = 'Offline snapshot · bundled with version 1.5.0';
        }
        displayDevices(categorySelect.value, searchInput.value);
    } catch { status.textContent = 'Could not load device data. Reopen the extension to retry.'; }
}
loadDevices();
