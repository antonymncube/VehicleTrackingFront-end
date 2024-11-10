let map;
let vehicleMarkers = [];

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

    updateVehicleList();
    updateVehicleMarkers();
    setInterval(refreshVehicleLocations, 3000);  // Refresh every 3 seconds
}

// Update the vehicle list UI
function updateVehicleList() {
    const vehicleContainer = document.getElementById('vehicleContainer');
    vehicleContainer.innerHTML = "";

    vehicles.forEach(vehicle => {
        const vehicleItem = document.createElement('a');
        vehicleItem.className = 'list-group-item list-group-item-action';
        vehicleItem.innerHTML = `
            <h6 class="mb-1 fw-bold">${vehicle.name}</h6>
            <p class="mb-1">Latitude: ${vehicle.lat}, Longitude: ${vehicle.lng}</p>
            <small>Timestamp: ${vehicle.timestamp}</small>
        `;
        vehicleItem.onclick = () => zoomToVehicleLocation(vehicle);
        vehicleContainer.appendChild(vehicleItem);
    });
}

// Update markers for vehicles on the map
function updateVehicleMarkers() {
    // Clear existing markers
    vehicleMarkers.forEach(marker => marker.setMap(null));
    vehicleMarkers = [];

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
    vehicles.forEach((vehicle, index) => {
        vehicle.lat += (Math.random() - 0.5) * 0.01;
        vehicle.lng += (Math.random() - 0.5) * 0.01;
        vehicle.timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    });

    updateVehicleList();  // Refresh the list with updated data
    updateVehicleMarkers();  // Update the map with new vehicle positions
}

// Zoom the map to the selected vehicle's location
function zoomToVehicleLocation(vehicle) {
    map.setCenter({ lat: vehicle.lat, lng: vehicle.lng });
    map.setZoom(15);
}

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".btn-open");
const closeModalBtn = document.querySelector(".btn-close");

// close modal function
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// close the modal when the close button and overlay is clicked
closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// close modal when the Esc key is pressed
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// open modal function
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
// open modal event
openModalBtn.addEventListener("click", openModal);