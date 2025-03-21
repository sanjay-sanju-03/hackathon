let map;
let markers = [];

function initMap() {
    // Initialize the map centered on Kasaragod
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 12.4996, lng: 74.9893 }, // Kasaragod coordinates
        zoom: 13,
    });
}

function showOnMap(lat, lng, title) {
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    markers = [];

    // Create new marker
    const position = { lat: parseFloat(lat), lng: parseFloat(lng) };
    const marker = new google.maps.Marker({
        position: position,
        map: map,
        title: title
    });

    // Add info window
    const infoWindow = new google.maps.InfoWindow({
        content: `<div style="padding: 10px;"><h3>${title}</h3></div>`
    });

    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });

    // Add marker to markers array
    markers.push(marker);

    // Center map on marker
    map.setCenter(position);
    map.setZoom(15);
}

// Initialize map when the page loads
window.onload = function() {
    initMap();
}; 