let map;
let vehicleMarkers = [];  // Array to store vehicle markers

// Sample data representing vehicle locations
const vehicles = [
    { id: 1, name: "Car 1", lat: 37.7749, lng: -122.4194, timestamp: "2024-11-09 10:00:00" },
    { id: 2, name: "Car 2", lat: 37.7849, lng: -122.4094, timestamp: "2024-11-09 10:05:00" },
    { id: 3, name: "Car 3", lat: 37.7840, lng: -122.4200, timestamp: "2024-11-09 10:10:00" }
];

// Initialize Google Map
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 37.7749, lng: -122.4194 },
        zoom: 12
    });

    // Populate the vehicle list and add markers
    updateVehicleList();
    updateVehicleMarkers();

    // Refresh vehicle locations every 30 seconds
    setInterval(refreshVehicleLocations, 30000);
}

// Update the vehicle list UI
function updateVehicleList() {
    const vehicleList = document.getElementById('vehicle-list');
    vehicleList.innerHTML = "";  // Clear the list before updating

    vehicles.forEach(vehicle => {
        const li = document.createElement('li');
        li.textContent = `${vehicle.name} - Last Location: (${vehicle.lat}, ${vehicle.lng}) - ${vehicle.timestamp}`;
        li.onclick = () => zoomToVehicleLocation(vehicle);
        vehicleList.appendChild(li);
    });
}

// Update markers for vehicles on the map
function updateVehicleMarkers() {
    vehicles.forEach(vehicle => {
        const marker = new google.maps.Marker({
            position: { lat: vehicle.lat, lng: vehicle.lng },
            map: map,
            title: vehicle.name
        });

        vehicleMarkers.push(marker);
    });
}

// Refresh vehicle locations (simulate dynamic update or get from API)
function refreshVehicleLocations() {
    // Simulate new locations for vehicles
    vehicles.forEach((vehicle, index) => {
        vehicle.lat += (Math.random() - 0.5) * 0.01;  // Random movement for demo
        vehicle.lng += (Math.random() - 0.5) * 0.01;
        vehicle.timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');  // Update timestamp
    });

    updateVehicleList();  // Refresh the list with updated data
    updateVehicleMarkers();  // Update the map with new vehicle positions
}

// Zoom the map to the selected vehicle's location
function zoomToVehicleLocation(vehicle) {
    map.setCenter({ lat: vehicle.lat, lng: vehicle.lng });
    map.setZoom(15);
}

// Initialize the map
initMap();
