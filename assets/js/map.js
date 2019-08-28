//set up the variables
const places = getID('places');
const putMap = getID('map');
const menu = getID('menuShow');
const filterText = getID('filter-text');

//set up the map
mapboxgl.accessToken = `pk.eyJ1Ijoib2lrZTI3IiwiYSI6ImNqenNwa3l5cDFvcDYzY281dXBldXl5azgifQ.-WYbnaEx4h2IruyBwpjaVA`;

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v9',
    center: [
        -87.623177, 41.881832
    ],
    zoom: 13.5
});

const geojson = {
    type: 'FeatureCollection',
    "features": [
        {
            "type": "Feature",
            "properties": {
                "title": `The Field Museum`,
                "description": `https://https://www.fieldmuseum.org/`
            },

            "geometry": {
                "type": "Point",
                "coordinates": [-87.61694, 41.86611]
            }
        }, {
            "type": "Feature",
            "properties": {
                "title": `Shedd Aquarium`,
                "description": `https://www.sheddaquarium.org/`
            },
            "geometry": {
                "type": "Point",
                "coordinates": [-87.613889, 41.867778]
            }
        }, {
            "type": "Feature",
            "properties": {
                "title": `Adler Planetarium`,
                "description": `https://www.adlerplanetarium.org/`
            },
            "geometry": {
                "type": "Point",
                "coordinates": [-87.606783, 41.866333]
            }
        }
    ]
};

function showMarkers() {
    geojson
        .features
        .forEach((marker) => {
            const mark = document.createElement('div');
            mark.className = 'marker';

            new mapboxgl
                .Marker(marker)
                .setLngLat(marker.geometry.coordinates)
                .setPopup(new mapboxgl.Popup({offset: 25})
                // add popups
                    .setHTML(` <h2>${marker.properties.title}</h2> <a href='${marker.properties.description}'>Learn More</a>`))
                .addTo(map);
        });
}

//gets features to show
function showTitles() {
    geojson
        .features
        .forEach((place) => {
            const location = document.createElement('h3');
            location.className = 'place';
            location.textContent = place.properties.title;
            places.appendChild(location)
        })
}

showMarkers();
showTitles();
//filters the places
filterText.addEventListener('keyup', () => {
    let text = filterText
        .value
        .toLowerCase();
    //check to see if the value is in the title

    removeMarkers(text)
})

//get the ids
function getID(id) {
    return document.getElementById(id);
}
//filter the results
function removeMarkers(text) {
    //make the number
    geojson
        .features
        .filter((marker) => checkMarker);
}

function checkMarker() {
    if (!marker.properties.title.includes(text)) {
        marker.remove();
    }
}
