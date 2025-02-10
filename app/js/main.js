"use strict";
/**
 * @name PocketScavengers
 * @file main.js
 * @description script js qui rejoint toutes les intégrations, fonctions et instances de classes  
 * @author Santiago SPRG
 * @version 27.01.2025 Ver 1.
*/
// ACCESS TOKEN OPTENU SUR
// https://account.mapbox.com

/** Légende de geolocalisations
 *  Nom | latitude | longitude | description
 * SPAWN  46.19406  6.159 
 * Trip1  46.190971, 6.159821   traversée du parc Bertrand
 * // RAPPEL: dans l'utilisation de Mapbox GL JS il inverse les deux
 * exemple: ligne 28 (long lat)
 */ 


// import MapboxManager from "./mapboxManager.js"; a terme c'est le resultat que je veut

mapboxgl.accessToken = 'pk.eyJ1IjoiYW1hcnVkZXYiLCJhIjoiY201djB3NDU4MDJ1bDJpczZ5YjhvNGo1NiJ9.FSN_HpllufFUxEbTGbQpMA';
let currentPos = {
    long: null,
    lat: null,
}

const map = new mapboxgl.Map({
    container: 'map',
    zoom: 12.2,
    pitch: 80,
    bearing: 100,
    center: [6.100971, 46.224546],  
    style: 'mapbox://styles/amarudev/cm5v18a2l00ov01pldzcw5nr4', // Use the Mapbox Standard style
    config: {
        // Initial configuration for the Mapbox Standard style set above. By default, its ID is `basemap`.
        basemap: {
            // Here, we're disabling all of the 3D layers such as landmarks, trees, and 3D extrusions.
            show3dObjects: false
        }
    }
});


const size = 200;

// This implements `StyleImageInterface`
// to draw a pulsing dot icon on the map.
const pulsingDot = {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),

    // Quand ce calque est ajouté a la carte,
    // il récupère le context pour le canvas de l'integration de la carte
    onAdd: function () {
        const canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext('2d');
    },

    // Call once before every frame where the icon will be used.
    render: function () {
        const duration = 1000;
        const t = (performance.now() % duration) / duration;

        const radius = (size / 2) * 0.3;
        const outerRadius = (size / 2) * 0.7 * t + radius;
        const context = this.context;

        // Draw the outer circle.
        context.clearRect(0, 0, this.width, this.height);
        context.beginPath();
        context.arc(
            this.width / 2,
            this.height / 2,
            outerRadius,
            0,
            Math.PI * 2
        );
        context.fillStyle = `rgba(255, 200, 200, ${1 - t})`;
        context.fill();

        // Draw the inner circle.
        context.beginPath();
        context.arc(
            this.width / 2,
            this.height / 2,
            radius,
            0,
            Math.PI * 2
        );
        context.fillStyle = 'rgba(255, 100, 100, 1)';
        context.strokeStyle = 'white';
        context.lineWidth = 2 + 4 * (1 - t);
        context.fill();
        context.stroke();

        // Update this image's data with data from the canvas.
        this.data = context.getImageData(
            0,
            0,
            this.width,
            this.height
        ).data;

        // Continuously repaint the map, resulting
        // in the smooth animation of the dot.
        map.triggerRepaint();

        // Return `true` to let the map know that the image was updated.
        return true;
    }
};

const GeolocateControl = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    // When active the map will receive updates to the device's location as it changes.
    trackUserLocation: true,
    // Draw an arrow next to the location dot to indicate which direction the device is heading.
    showUserHeading: true
})

map.on('load', () => {
    map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });

    map.addSource('dot-point', {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [0, 0] // icon position [lng, lat]
                    }
                }
            ]
        }
    });
    map.addLayer({
        'id': 'layer-with-pulsing-dot',
        'type': 'symbol',
        'source': 'dot-point',
        'layout': {
            'icon-image': 'pulsing-dot'
        }
    });
    // Add geolocate control to the map.
    map.addControl(GeolocateControl);
});

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          long: position.coords.longitude,
        };

        UpdateCurrentGeolocation(pos);
        console.log(`Location found at ${pos.lat} ; ${pos.long}`);
      },

    );
  } else {
    // Browser doesn't support Geolocation => il faut feedback l'info que l'utilisateur doit autoriser la localistation exacte
    alert("Votre appareil a refusé PocketScavengers à accèder a votre position.")
    
}

function UpdateCurrentGeolocation(pos) {
    currentPos.lat = pos.lat;
    currentPos.long = pos.long;
}


function geolocation_errorCallback() {
    
}
function geolocation_successCallback() {
    
}
function geolocation_locate() {
    
}

let locateIntervalId;
if ("geolocation" in navigator) {
    
}
else {
    // Browser doesn't support Geolocation => il faut feedback l'info que l'utilisateur doit autoriser la localistation exacte
    alert("Votre appareil a refusé PocketScavengers à accèder a votre position.")
    
}


const mapbox_geolocateBtn = document.querySelector(".mapboxgl-ctrl-geolocate");
console.log(mapbox_geolocateBtn);

// mapbox_geolocateBtn.click();
// mapbox_geolocateBtn.style.display = "none";

// navigator.geolocation.getCurrentPosition(GEOLOC_successCallback, GEOLOC_errorCallback, {timeout})

