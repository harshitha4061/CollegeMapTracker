const socket = io();

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            socket.emit("user-location", { latitude, longitude }); 
        },
        (error) => {
            console.error(error); 
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        }
    );
}

const map = L.map("map").setView([17.391318, 78.319154], 20); 


L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "openstreetmap , Location-pin icons created by IconMarketPK - Flaticon",
}).addTo(map);

const blocks = [
    { id: 'Mechanical Workshop', name: 'Mechanical Workshop', lat: 17.391873, lng: 78.318788 },
    { id: 'Civil Engineering Labs', name: 'Civil Engineering Labs', lat: 17.391564, lng: 78.319957 },
    { id: 'Phy & Chem Labs', name: 'Phy and Chem Labs', lat: 17.391267, lng: 78.319968 },
    { id: 'Mech Engg Labs', name: 'Mech Engg Labs', lat: 17.391561, lng: 78.318718 },
    { id: 'Open Air Auditorium', name: 'Open Air Auditorium', lat: 17.391402, lng: 78.319399 },
    { id: 'IT & EEE Block', name: 'IT AND EEE Block', lat: 17.391243, lng: 78.318669},
    { id: 'Chemical Block', name: 'Chemical Block', lat: 17.390946, lng: 78.319909 },
    { id: 'Biotechnology Block', name: 'Biotechnology Block', lat: 17.390665, lng: 78.319817 },
    { id: 'Bus Bay', name: 'Bus Bay', lat: 17.392743, lng: 78.318956 },
    { id: 'R & E Block', name: 'R & E Block', lat: 17.392649, lng: 78.318401 },
    { id: 'Statue', name: 'Statue', lat: 17.39227, lng:78.319598 },
    { id: 'Mechanical Block', name: 'Mechanical Block', lat: 17.392163, lng: 78.318637 },
    { id: 'CSE Block', name: 'CSE Block', lat: 17.392112, lng: 78.318959 },
    { id: 'Civil Block', name: 'Civil Block', lat: 17.391779, lng: 78.320322 },
    { id: 'MCA Block', name: 'MCA Block', lat: 17.391902, lng: 78.319903 },
    { id: 'Principal Block', name: 'Principal Block', lat:17.392061, lng: 78.319506 },
    { id: 'ECE Block', name: 'ECE Block', lat:17.390897, lng: 78.318664 },
    { id: 'FootBall Court', name: 'FootBall Court', lat:17.38996, lng: 78.319313 },
    { id: 'Post Office', name: 'Post Office', lat:17.393419, lng: 78.319558}
];

const customIcon = L.icon({
    iconUrl: "/images/image1.png", 
    iconSize: [20, 20], 
    iconAnchor: [10, 10],
    popupAnchor: [0, -10] 
});

const customIcon1 = L.icon({
    iconUrl: "/images/image.png", 
    iconSize: [25, 25], 
    iconAnchor: [10, 10], 
});

const blockMarkers = {};

blocks.forEach(block => {
    blockMarkers[block.id] = L.marker([block.lat, block.lng],{ icon: customIcon })
        .addTo(map)
        .bindTooltip(block.name, { permanent: true, direction: "top", className: "block-label" }); 
});


let userMarker = {}; 
socket.on("recieved-location", (data) => {
    const { id, latitude, longitude } = data;

    // map.setView([latitude, longitude]);
    if (userMarker[id]) {
        userMarker[id].setLatLng([latitude, longitude]);
    } else {
        userMarker[id] = L.marker([latitude, longitude],{ icon: customIcon1 }).addTo(map);
    }
});
