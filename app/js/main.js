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
import Item from "./class/Item.js";
import GameSave from "./class/GameSave.js";

const menuBtn = document.getElementById("menu-btn");
const menuBox = document.querySelector("#menu");
menuBtn.addEventListener("click", ManageMenu);
let poiData;

let gameSave = new GameSave();
let watchId;
mapboxgl.accessToken = "pk.eyJ1IjoiYW1hcnVkZXYiLCJhIjoiY201djB3NDU4MDJ1bDJpczZ5YjhvNGo1NiJ9.FSN_HpllufFUxEbTGbQpMA";
let pos = {

};
const currentPos = {
  long: null,
  lat: null,
}
const GeolocateControl = new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true,
  },
  // When active the map will receive updates to the device's location as it changes.
  trackUserLocation: true,
  // Draw an arrow next to the location dot to indicate which direction the device is heading.
  showUserHeading: true,
});
let lastPos = {
  lat: 0,
  long: 0
};
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
        coordinates: [6.159821, 46.190971]
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

  new mapboxgl.Marker().setLngLat(feature.geometry.coordinates).addTo(map);

}

// Event called on load of the map
map.on("load", () => {
  // Ajoute geolocate control à la map
  map.addControl(GeolocateControl);

  if (localStorage.getItem("userAcceptedTrackLocation") == "true") {
    let dateNow = new Date();
    if (Date.parse(localStorage.getItem("TrackLocationDateEnd")) > Date.parse(dateNow.getDay())) {
      // si le temps entre 1970 et aujourd'hui est plus long que le temps entre 19170 et la date de fin de l'acceptation du track de la location du user
      global_box.className = "global_box";
      console.info("starting location tracking...");
      userAcceptedTrackLocation = true;
      startLocationTracking();
    }
    else {
      localStorage.setItem("userAcceptedTrackLocation", false);
      localStorage.removeItem("TrackLocationDateEnd");
      console.info("starting location permission popup with TrackLocationDateEnd removed ...");
      createLocationPermissionPopup();
    }
  }
  else {
    console.info("starting location permission popup...");
    createLocationPermissionPopup();
  }


  map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });

  // Add your POIs as a source
  map.addSource('poi-source', {
    'type': 'geojson',
    'data': {
      'type': 'FeatureCollection',
      'features': [
        // Your POI points here
        // train  46.204015, 6.136018 usine nightclub 46.2014954, 6.1232619 junction riverfront 46.2188511, 6.1132958 balexert 46.2304327, 6.1088849 airport
        {
          'type': 'Feature',
          'properties': { 
            'id': 'poi_history-and-art-museum',
            'visible': false
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [6.151609449799484, 46.1993399999998]
          }
        },
        {
          'type': 'Feature',
          'properties': { 
            'id': 'poi_rive-rondabout',
            'visible': false
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [6.153409449799496, 46.201619999999714]
          }
        },
        {
          'type': 'Feature',
          'properties': { 
            'id': 'poi_saint-pierre-cathedral',
            'visible': false
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [6.1487432, 46.2010851]
          }
        },
        {
          'type': 'Feature',
          'properties': { 
            'id': 'poi_water-jet',
            'visible': false
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [6.156029449799513, 46.207419999999495]
          }
        },
        {
          'type': 'Feature',
          'properties': { 
            'id': 'poi_motive-power-building',
            'visible': false
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [6.1365861, 46.2046062]
          }
        },
        {
          'type': 'Feature',
          'properties': { 
            'id': 'poi_usine-nightclub',
            'visible': false
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [6.136018, 46.204015]
          }
        },
        {
          'type': 'Feature',
          'properties': { 
            'id': 'poi_balexert-mall',
            'visible': false
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [6.1132958, 46.2188511], 
          }
        },
        {
          'type': 'Feature',
          'properties': { 
            'id': 'poi_jonction-riverfront',
            'visible': false
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [6.1232619, 46.2014954]
          }
        },
        {
          'type': 'Feature',
          'properties': { 
            'id': 'poi_reformers-wall',
            'visible': false
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [6.1459101, 46.2002435]
          }
        },
        {
          'type': 'Feature',
          'properties': { 
            'id': 'poi_cornavin-train-station',
            'visible': false
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [6.1430596, 46.2106357]
          }
        },
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
// Event called when the pulsing-poi-layer a été cliqué (minage de ressource)
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
  let count = parseInt(Math.random() * 10 ) + 1;

  let type = null;
  let valid = parseInt(Math.random() * 100 );
  let validHtml = "";
  if (valid > 40) {
    validHtml = `<h1 style="color: lime;">Ressource gagnée !<h1>`;
    type = parseInt(Math.random() * 4 ) + 1;
    
  } else {
    validHtml = `<h1 style="color: crimson;">Ressource perdue !<h1>`;
  }
  // Create a popup
  new mapboxgl.Popup()
    .setLngLat(feature.geometry.coordinates)
    .setHTML(`<div style="display: flex; justify-content: center; flex-direction: column;">`+validHtml+`<h3>Pulsing Dot Cliqué</h3> <h2 id="count" style="color: crimson;">${rnd}</h2>x`)
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
        <div><b>⌕ Location </b><span id="menu-dashboard-location"></span</div>
        <div><button id="menu-btn-logout-quit" class="off">Quitter PocketScavengers</button></div>
      </div>
      `;
      menuBox.innerHTML = html;
      menuBox.style.display = "flex";
      document.getElementById("menu-btn-dashboard").addEventListener("click", ManageSubMenu);
      document.getElementById("menu-btn-inventory").addEventListener("click", ManageSubMenu);
      document.getElementById("menu-btn-locations").addEventListener("click", ManageSubMenu);
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
          <div><b>⌕ Location : </b>${currentPos.lat} ${currentPos.long}</div>
          <div><button id="menu-btn-import-gameSave" class="off">Télécharger sauvegarde</button></div>
          <div><button id="menu-btn-import-gameSave" class="off">Importer sauvegarde.json</button></div>
          <div><button id="menu-btn-quit" class="off">Quitter PocketScavengers</button></div>
          <div
        </div>
        `;
        menuBox.innerHTML = html;
        document.getElementById("menu-btn-import-gameSave").addEventListener("click", ImportGameSave);
        document.getElementById("menu-btn-quit").addEventListener("click", QuitGame);
        break;
      case "menu-btn-inventory":
        html = `<div class="menu-nav">
          <button id="menu-btn-dashboard" class="off">Tableau de bord</button>
          <button id="menu-btn-inventory" class="on">Inventaire</button>
          <button id="menu-btn-locations" class="off">Points d'intérêts</button>
        </div>
        <div class="menu-content">
          `+gameSave.GetInventory()+`
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
        `+gameSave.GetVisitedPois()+`
          
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

  setTimeout(() => {
    // Add event listeners
    document.querySelector("#allow-location").addEventListener("click", () => {
      
      document.body.removeChild(popup)
      global_box.className = "global_box";
      userAcceptedTrackLocation = true;
      localStorage.setItem("userAcceptedTrackLocation", true);
      localStorage.setItem("TrackLocationDateEnd", new Date());
      startLocationTracking();

      Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      }
      var date = new Date();
      console.log("new date", date.addDays(5));
    })

    document.querySelector("#deny-location").addEventListener("click", () => {
      document.body.removeChild(popup);
      global_box.className = "global_box";
      geolocation_errorCallback();

    })
  }, 1000);


}


function succesWatchPosition() {

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

      poi.properties.visible = distance < 30;
      if (poi.properties.visible) {
        gameSave.visitedPois.push([poi.properties.id, poiCoords]);
      }

    });
  }

  try {

    // Update the source data
    map.getSource('poi-source').setData(poiData);

  } catch (error) {

  }

}

// Function to update user position on map
function updateUserPositionOnMap(position) {
  pos = {
    lat: position.coords.latitude,
    long: position.coords.longitude,
  }
  if (lastPos.lat != pos.lat || lastPos.long != pos.long) {
    lastPos.lat = pos.lat;
    lastPos.long = pos.long;
    console.log(pos);
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
function ExportGameSave(gameSaveInstance) {
    const dataStr = JSON.stringify(gameSaveInstance, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "sauvegarde.json";
    a.click();

    URL.revokeObjectURL(url);
}


function ImportGameSave(callback) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";

    input.onchange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const text = await file.text();
        const data = JSON.parse(text);

        const importedGameSave = new GameSave();
        importedGameSave.SetGameSave(data.inventory, data.visitedPois, data.inventoryCapacity);

        callback(importedGameSave);
    };

    input.click();
    input.remove();
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

// function geolocation_successCallback(position) {
//   updateUserPositionOnMap(position)
// }

// // Stop tracking location
// function stopLocationTracking() {
//   if (locateIntervalId) {
//     navigator.geolocation.clearWatch(locateIntervalId)
//     locateIntervalId = null
//   }

//   createLocationPermissionPopup();
// }



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

  map.addImage('pulsing-dot-RESSOURCE', pulsingDot, { pixelRatio: 2 });
  map.addImage('pulsing-dot-LANDMARK=waterJet ', pulsingDot, { pixelRatio: 2 });


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
  let name = "ressource"; // doit pouvoir recuperer le nom sur le pulsing-poi

  // en cas de non type donné par la localisation (exemple au bord du lac ou du rhone ça serait type "aquatic" et faudra le definir des que le poi sera placer aléatoirement)
  let rndType = parseInt(Math.random() * 3);
  switch (rndType) {
    case 1:
      
      break;
  
    default:
      break;
  }
  let item = new Item();
  

  // Create a popup
  new mapboxgl.Popup()
    .setLngLat(feature.geometry.coordinates)
    .setHTML(`<div style="display: flex; justify-content: center; flex-direction: column;"><h3 style="background: ${item.backgroundGradient}">Pulsing Dot Cliqué</h3> <h2 id="count" style="color: crimson;">${rnd}<h2>`)
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



function waitForSourceAndStartWatching(map, sourceId) {
  const interval = setInterval(() => {
    if (map.isStyleLoaded()) {
      const source = map.getSource(sourceId);
      if (source) {
        clearInterval(interval);
        console.log(`[INFO] Source "${sourceId}" trouvée. Initialisation de la géolocalisation.`);
        startWatching();
      }
    }
  }, 250); // Vérifie toutes les 250ms
}

function startWatching() {
    // Ce code ne s'exécute que lorsque la carte est chargée ET que 'poi-source' est disponible
    // navigator.geolocation.watchPosition(onSuccess, onError, {
    //   enableHighAccuracy: true,
    //   maximumAge: 10000,
    //   timeout: 20000,
    // });
    watchId = navigator.geolocation.watchPosition(succesWatchPosition, (error) => {
      console.log("code: ", error.code);
    }, (error) => {
      console.log("code: ", error.code);
    });
}

waitForSourceAndStartWatching(map, 'poi-source', startWatching);




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

