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

import NewPopup from "./uiFunctions.js";
const menuBtn = document.getElementById("menu-btn");
const devMenuBtn = document.querySelector("#dev_menu_btn");
const menuBox = document.querySelector("#menu");
devMenuBtn.addEventListener("click", ManageMenu);
menuBtn.addEventListener("click", ManageMenu);

function ManageMenu(event) {
  let isOpening = event.target.className == "off";
  let html = "";
  if (isOpening) {
    event.target.className = "on";
    if (event.target.id == "menu-btn") {
      
      html = `<div class="menu-nav">
        <button id="menu-btn-dashboard" class="on">Tableau de bord</button>
        <button id="menu-btn-inventory" class="off">Inventaire</button>
        <button id="menu-btn-locations" class="off">Points d'intérêts</button>
      </div>
      <div class="menu-content">
        <h3>Tableau de bord</h3>
        <div><b>⌕ Location</b></div>
      </div>
      `;
      menuBox.innerHTML = html;
      menuBox.style.display = "flex";
      document.getElementById("menu-btn-dashboard").addEventListener("click", ManageSubMenu);
      document.getElementById("menu-btn-inventory").addEventListener("click", ManageSubMenu);
      document.getElementById("menu-btn-locations").addEventListener("click", ManageSubMenu);
    }
    else {
      // dev menu
        html += `
      <div class="menu-content">
        <button id="dev-btn-showAll">montrer toutes les poi</button>
      </div>
      `;
      menuBox.innerHTML = html;
      document.getElementById("dev-btn-showAll").addEventListener("click", e => {
        
      });
    }
  }
  else {
    event.target.className = "off";
    menuBox.style.display = "none";
  }


}
function ManageSubMenu(event) {
  let isOpening = event.target.className == "off";
  let html = "";
  if (isOpening) {
    console.log(event.target.id);
    
    switch (event.target.id) {
      case "menu-btn-dashboard":
        html = `<div class="menu-nav">
          <button id="menu-btn-dashboard" class="on">Tableau de bord</button>
          <button id="menu-btn-inventory" class="off">Inventaire</button>
          <button id="menu-btn-locations" class="off">Points d'intérêts</button>
        </div>
        <div class="menu-content">
          <h3>Tableau de bord</h3>
          <div><b>⌕ Location</b></div>
        </div>
        `;
        menuBox.innerHTML = html;
        break;
      case "menu-btn-inventory":
          html = `<div class="menu-nav">
          <button id="menu-btn-dashboard" class="off">Tableau de bord</button>
          <button id="menu-btn-inventory" class="on">Inventaire</button>
          <button id="menu-btn-locations" class="off">Points d'intérêts</button>
        </div>
        <div class="menu-content">
          <h3>Inventaire</h3>
          <h4>Capacité: 47/75</h4>
          <div><b>2x ⬡ Pierre</b></div>
          <div><b>45x ⬡ Bois</b></div>
        </div>
        `;
        menuBox.innerHTML = html;
        break;
      case "menu-btn-locations":
          html = `<div class="menu-nav">
          <button id="menu-btn-dashboard" class="off">Tableau de bord</button>
          <button id="menu-btn-inventory" class="off">Inventaire</button>
          <button id="menu-btn-locations" class="on">Points d'intérêts</button>
        </div>
        <div class="menu-content">
          <h3>Points de vente</h3>
          <div><b>Manor | 46.20740389118474, 6.14242009988864</b></div>
        </div>
        `;
        menuBox.innerHTML = html;
        break;
      default:
        break;
    }
    document.getElementById("menu-btn-dashboard").addEventListener("click", ManageSubMenu);
    document.getElementById("menu-btn-inventory").addEventListener("click", ManageSubMenu);
    document.getElementById("menu-btn-locations").addEventListener("click", ManageSubMenu);
  }
  else {

  }


}
mapboxgl.accessToken = "pk.eyJ1IjoiYW1hcnVkZXYiLCJhIjoiY201djB3NDU4MDJ1bDJpczZ5YjhvNGo1NiJ9.FSN_HpllufFUxEbTGbQpMA";
let pos = {

};
const currentPos = {
  long: null,
  lat: null,
}
let userAcceptedTrackLocation = false; // definit si le joueur a accepté le tracking de la localisation
const global_box = document.querySelector(".global-box");

const map = new mapboxgl.Map({
  container: "map",
  zoom: 12.2,
  pitch: 80,
  bearing: 100,
  center: [6.100971, 46.224546],
  style: "mapbox://styles/amarudev/cm7t6xc99008j01r14ht5g9qx", 
  config: {
    // Initial configuration for the Mapbox Standard style set above. By default, its ID is `basemap`.
    basemap: {
      // Here, we're disabling all of the 3D layers such as landmarks, trees, and 3D extrusions.
      show3dObjects: false,
    },
  },
});

const geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [6.129, 46.19406]
        },
        properties: {
          title: 'Mapbox',
          description: 'Washington, D.C.'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [ 6.159821, 46.190971]
        },
        properties: {
          title: 'Mapbox',
          description: 'San Francisco, California'
        }
      }
    ]
  };

// add markers to map
for (const feature of geojson.features) {
  
    // code from step 7-1 will go here
  
    // make a marker for each feature and add to the map
    new mapboxgl.Marker().setLngLat(feature.geometry.coordinates).addTo(map);  // Replace this line with code from step 7-2
  
     //code from step 8 will go here
}

// Create location permission popup
function createLocationPermissionPopup() {
  const popup = document.createElement("div")
  global_box.className = "blurBackground";
  popup.className = "location-permission-popup"
  popup.innerHTML = `
        <div class="popup-content">
            <h3>Autorisation de localisation</h3>
            <p>PocketScavengers a besoin de votre position pour fonctionner correctement.</p>
            <div class="popup-buttons">
                <button id="allow-location">Autoriser</button>
                <button id="deny-location">Refuser</button>
            </div>
        </div>
    `
  
  // Ajoute des style pour le popup
  const style = document.createElement("style")
  style.textContent += `


        .location-permission-popup {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 999;
            

        }
        .popup-content {
            background-color: rgb(13, 17, 15);
            color: white;
            padding: 20px;
            border-radius: 10px;
            max-width: 80%;
            text-align: center;
            
        }
        .popup-buttons {
            display: flex;
            justify-content: center;
            flex-direction: column;
            gap: 10px;
            margin-top: 20px;
        }
        .popup-buttons button {
            padding: 10px 20px;
            border: none;
            border-radius: 10px;
            cursor: pointer;
        }
        #allow-location {
            background-color:rgb(76, 175, 129);
            color: white;
        }
        #deny-location {
            background-color:rgb(13, 17, 15);
            color: white;
        }
    `

  document.head.appendChild(style)
  document.body.appendChild(popup)

  // Add event listeners
  document.getElementById("allow-location").addEventListener("click", () => {
    document.body.removeChild(popup)
    global_box.className = "global_box";
    userAcceptedTrackLocation = true;
    startLocationTracking();
  })

  document.getElementById("deny-location").addEventListener("click", () => {
    document.body.removeChild(popup)
    global_box.className = "global_box";
    geolocation_errorCallback()
    
  })
}

const GeolocateControl = new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true,
  },
  // When active the map will receive updates to the device's location as it changes.
  trackUserLocation: true,
  // Draw an arrow next to the location dot to indicate which direction the device is heading.
  showUserHeading: true,
})


// Function to update user position on map
function updateUserPositionOnMap(position) {
  pos = {
    lat: position.coords.latitude,
    long: position.coords.longitude,
  }

  UpdateCurrentGeolocation(pos)
  //console.log(`Location found at ${pos.lat} ; ${pos.long}`)



  // Center map on user position if it's the first location update
  if (!map.userLocationInitialized) {
    map.flyTo({
      center: [pos.long, pos.lat],
      zoom: 15,
      speed: 2,
    })
    map.userLocationInitialized = true
  }
}

// Start tracking user location
function startLocationTracking() {
  if ("geolocation" in navigator) {
    // Get initial position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        updateUserPositionOnMap(position)

        // Trigger the GeolocateControl to start tracking
        const geolocateButton = document.querySelector(".mapboxgl-ctrl-geolocate")
        if (geolocateButton) {
          geolocateButton.click()
        }
      },
      geolocation_errorCallback,
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    )

    // Set up continuous tracking
    locateIntervalId = navigator.geolocation.watchPosition(updateUserPositionOnMap, geolocation_errorCallback, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    })
  } else {
    // Browser doesn't support Geolocation
    alert("Votre appareil ne prend pas en charge la géolocalisation.")
  }
}

function UpdateCurrentGeolocation(pos) {
  currentPos.lat = pos.lat
  currentPos.long = pos.long
}

function geolocation_errorCallback(error) {
  let message = "Impossible d'accéder à votre position."

  if (error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        message = "Vous avez refusé l'accès à votre position."
        break
      case error.POSITION_UNAVAILABLE:
        message = "Votre position n'est pas disponible."
        break
      case error.TIMEOUT:
        message = "La demande de localisation a expiré."
        break
      case error.UNKNOWN_ERROR:
        message = "Une erreur inconnue s'est produite."
        break
    }
  }

  alert(message)

  console.error("Geolocation error:", error)
  
  window.location.href = "index.html";
}

function geolocation_successCallback(position) {
  updateUserPositionOnMap(position)
}

// Stop tracking location
function stopLocationTracking() {
  if (locateIntervalId) {
    navigator.geolocation.clearWatch(locateIntervalId)
    locateIntervalId = null
  }

  createLocationPermissionPopup();
}



const size = 200;

// Create a pulsing dot icon
const pulsingDot = {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),

    // When the layer is added to the map,
    // get the rendering context for the map canvas.
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
        context.fillStyle = `rgba(69, 255, 239, ${1 - t})`;
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
        context.fillStyle = 'black';
        context.strokeStyle = 'aqua';
        context.lineWidth = 2 + 4 * (1 - t);
        context.fill();
        context.stroke();

        // Update this image's data with data from the canvas.
        this.data = context.getImageData(
            0,
            0,
            this.width,
            this.height,
        ).data;

        // Continuously repaint the map, resulting
        // in the smooth animation of the dot.
        map.triggerRepaint();

        // Return `true` to let the map know that the image was updated.
        return true;
    }
};

map.on("load", () => {
  // Ajoute geolocate control à la map
  map.addControl(GeolocateControl);

  createLocationPermissionPopup();
 

  map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });
  
  // Add your POIs as a source
  map.addSource('poi-source', {
      'type': 'geojson',
      'data': {
          'type': 'FeatureCollection',
          'features': [
              // Your POI points here
              {
                  'type': 'Feature',
                  'properties': {
                      'id': 'poi1',
                      'visible': false
                  },
                  'geometry': {
                      'type': 'Point', 
                      'coordinates': [6.15073765963906, 46.19406]
                  }
              },
              // Add more POIs as needed
          ]
      }
  });
  
  // Add a layer for the pulsing dots
  map.addLayer({
      'id': 'pulsing-poi-layer',
      'type': 'symbol',
      'source': 'poi-source',
      'layout': {
          'icon-image': 'pulsing-dot',
          'icon-allow-overlap': true,
          // Only show POIs marked as visible
          'visibility': 'visible'
      },
      'filter': ['==', 'visible', true]
  });

     // Add click event to the pulsing dot layer

});
map.on('click', 'pulsing-poi-layer', (e) => {
  // Get the properties of the clicked feature
  const features = map.queryRenderedFeatures(e.point, { 
    layers: ['pulsing-poi-layer'] 
  });
  
  if (!features.length) {
    return;
  }
  
  const feature = features[0];
  
  // récupère une random ressource
  //GetRandomRessource()
  let rnd = parseInt(Math.random() * 10);
  // Create a popup
  new mapboxgl.Popup()
    .setLngLat(feature.geometry.coordinates)
    .setHTML(`<div style="display: flex; justify-content: center; flex-direction: column;"><h3>Pulsing Dot Cliqué</h3> <h2 id="count" style="color: crimson;">${rnd}<h2>`)
    .addTo(map);
  
  // You can also perform other actions when the dot is clicked
  console.log('Pulsing dot clicked:', feature.properties);
  
  // Example: Call a custom function
  onDotClick(feature);
});

// Change cursor to pointer when hovering over the dot
map.on('mouseenter', 'pulsing-poi-layer', () => {
  map.getCanvas().style.cursor = 'pointer';
});

map.on('mouseleave', 'pulsing-poi-layer', () => {
  map.getCanvas().style.cursor = '';
});


// Custom function to handle dot click
function onDotClick(feature) {
  // RECOLTER LA RESSOURCE du pulsingDot
  //alert(`You clicked on ${feature.properties.title}`);
  
}

let poiData;
// Get user location
let id = navigator.geolocation.watchPosition(succesWatchPosition);

function succesWatchPosition(position) {
  
    try {
        // Get the current POI data
      poiData = map.getSource('poi-source')._data;
      
    } catch (error) {
  
    }
  
    if (poiData != undefined && userAcceptedTrackLocation) {
      // Check distance du pulsingDot de l'user
      poiData.features.forEach(poi => {
          
          const poiCoords = poi.geometry.coordinates;
          const distance = calculateDistance(pos, poiCoords);
          
          // Update visibility based on proximity 
          poi.properties.visible = distance < 15;
          if (distance < 15) {
            // Discovered new ressource
            
            NewPopup("ressource-found", poi);
          }
          
      });
    }
  
    try {
  
      // Update the source data
      map.getSource('poi-source').setData(poiData);
      
    } catch (error) {
      
    }
  
}


/**
 * Calcule la distance entre deux coordonnées
 * @param {object} coord1 
 * @param {object} coord2 
 */
function calculateDistance(coord1, coord2) {
 // Rayon de la terre en kilometres
 const R = 6371;

 let lat1 = coord1.lat;
 let lon1 = coord1.long;

 let lat2 = coord2[1];
 let lon2 = coord2[0];
 // Convertit degrees en radians
 const dLat = (lat2 - lat1) * Math.PI / 180;
 const dLon = (lon2 - lon1) * Math.PI / 180;
 
 // Convertit latitude en radians
 const lat1Rad = lat1 * Math.PI / 180;
 const lat2Rad = lat2 * Math.PI / 180;
 
 // Haversine formula => 
 // ( utilisée pour calculer la distance entre deux lat long, il faut d'abord recuperer les radians des lat)
 const a = 
   Math.sin(dLat / 2) * Math.sin(dLat / 2) +
   Math.cos(lat1Rad) * Math.cos(lat2Rad) * 
   Math.sin(dLon / 2) * Math.sin(dLon / 2);
 
 const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
 let distance = R * c; // distance en kilometres
 distance *= 1000; // Convertit km en metres

 return distance;
}

let locateIntervalId;

