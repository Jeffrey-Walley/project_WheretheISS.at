// module 01 ep04 working with Data and APIs in Javascript
// using sites: https://wheretheiss.at/w/developer
//             https://www.openstreetmap.org/#map=3/38.01/-95.84  

// module 01 ep05 Mapping Geolocations with Leaflet.

// moudule 01 ep06 refreshing Data with setInterval() -- updated the project to refresh page
// ep06 centered map to start on issIcon
// Make the Map and Tiles

const mymap = L.map('issMap').setView([0, 0], 1);
const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);


// Make marker with custom icon
const issIcon = L.icon({
    iconUrl: '../resource/images/iss200.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16],
    popupAnchor: [-3, -76],
});
const marker = L.marker([0, 0], { icon: issIcon }).addTo(mymap);


// get the data from the API URL 
const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';

async function getISS() {
    const response = await fetch(api_url);
    const data = await response.json();
    const { latitude, longitude, altitude, velocity, visibility } = data;

    marker.setLatLng([latitude, longitude]); // sets the marker location
    mymap.setView([latitude, longitude], 2);

    document.getElementById('lat').textContent = latitude.toFixed(2);
    document.getElementById('lon').textContent = longitude.toFixed(2);
    document.getElementById('alt').textContent = altitude.toFixed(2);
    document.getElementById('vel').textContent = velocity.toFixed(2);
    document.getElementById('vis').textContent = visibility;
    console.log(latitude, longitude, altitude, velocity, visibility);
}

getISS();

setInterval(getISS, 5000); // set interval