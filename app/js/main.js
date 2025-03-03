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


mapboxgl.accessToken = "pk.eyJ1IjoiYW1hcnVkZXYiLCJhIjoiY201djB3NDU4MDJ1bDJpczZ5YjhvNGo1NiJ9.FSN_HpllufFUxEbTGbQpMA";

const currentPos = {
  long: null,
  lat: null,
}

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
          coordinates: [6.159, 46.19406]
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
  const pos = {
    lat: position.coords.latitude,
    long: position.coords.longitude,
  }

  UpdateCurrentGeolocation(pos)
  console.log(`Location found at ${pos.lat} ; ${pos.long}`)



  // Center map on user position if it's the first location update
  if (!map.userLocationInitialized) {
    map.flyTo({
      center: [pos.long, pos.lat],
      zoom: 15,
      speed: 1.5,
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

function OpenMenu() {
}
document.getElementById("menu").addEventListener("click", OpenMenu)

map.on("load", () => {
  // Ajoute geolocate control à la map
  map.addControl(GeolocateControl);

  createLocationPermissionPopup();
 
});

let locateIntervalId;

