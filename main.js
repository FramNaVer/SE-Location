let map; // ตัวแปรสำหรับเก็บแผนที่
let marker; // ตัวแปรสำหรับเก็บตำแหน่ง

function initMap(lat, lng) {
    const position = [lat, lng];

    if (!map) {
        map = L.map('map').setView(position, 15);

        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        
        marker = L.marker(position).addTo(map);
    } else {
        
        map.setView(position, 15);
        marker.setLatLng(position);
    }
}

function getLocation() {
    const output = document.getElementById("output");

    output.innerHTML = "<p>กำลังดึงข้อมูลตำแหน่ง...</p>";

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            output.innerHTML = `<p>พิกัดของคุณคือ: Latitude: ${latitude}, Longitude: ${longitude}</p>`;
            initMap(latitude, longitude);
        },
        () => {
            output.innerHTML = "<p>ไม่สามารถดึงตำแหน่งได้</p>";
        }
    );
}