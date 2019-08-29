//set up the variables
const places = getID('places');
const putMap = getID('map');
const menu = getID('menuShow');
const sideBar = getID('sideBar');

//set up the map
mapboxgl.accessToken = `pk.eyJ1Ijoib2lrZTI3IiwiYSI6ImNqenNwa3l5cDFvcDYzY281dXBldXl5azgifQ.-WYbnaEx4h2IruyBwpjaVA`;

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v9',
    center: [
        -87.623177, 41.881832
    ],
    zoom: 13.25
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
        }, {
            "type": "Feature",
            "properties": {
                "title": `The Art Institute`,
                "description": `https://www.artic.edu/`
            },
            "geometry": {
                "type": "Point",
                "coordinates": [-87.623889, 41.879444]
            }
        }, {
            "type": "Feature",
            "properties": {
                "title": `Buckingham Fountain`,
                "description": `https://en.wikipedia.org/wiki/Buckingham_Fountain`
            },
            "geometry": {
                "type": "Point",
                "coordinates": [-87.618944, 41.875792]
            }
        }, {
            "type": "Feature",
            "properties": {
                "title": `Museum of Contemporary Art`,
                "description": `https://mcachicago.org/Home`
            },
            "geometry": {
                "type": "Point",
                "coordinates": [-87.6212, 41.8972]
            }
        }, {
            "type": "Feature",
            "properties": {
                "title": `Water Tower`,
                "description": `https://en.wikipedia.org/wiki/Chicago_Water_Tower`
            },
            "geometry": {
                "type": "Point",
                "coordinates": [-87.624422, 41.897172]
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
            mark.id = marker.properties.title;
            new mapboxgl
                .Marker(mark)
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
            location.id = place.properties.title;
            location.textContent = place.properties.title;
            places.appendChild(location);
        })
}

showMarkers();
showTitles();
//filters the places get the ids
function getID(id) {
    return document.getElementById(id);
}
//filter the results

function checkMarker(e) {

    let markers = document.querySelectorAll(".marker");
    let places = document.querySelectorAll('.place');
    for (let i = 0; i < markers.length; i++) {
        if (markers[i].id.includes(e.value)) {
            markers[i].style.opacity = 1;
        } else {
            markers[i].style.opacity = 0;
        }
    }

    for (let j = 0; j < places.length; j++) {
        if (!places[j].id.includes(e.value)) {
            places[j].style.display = 'none';
        } else {
            places[j].style.display = 'block';
        }
    }
}

menu.onclick = function () {
    sideBar
        .classList
        .toggle('menuHide');
}
