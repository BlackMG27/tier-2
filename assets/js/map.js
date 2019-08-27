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

map.on('load', function () {
    map.addLayer({
        "id": 'places',
        "type": 'symbol',
        "source": {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": [
                    {
                        "type": "Feature",
                        "properties": {
                            "description": `<h2>The Field Museum</h2>`,
                            'marker-color': '#3bb2d0',
                            'marker-size': 'large',
                            'marker-symbol': 'rocket'
                        },

                        "geometry": {
                            "type": "Point",
                            "coordinates": [-87.61694, 41.86611]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "description": `<h2>Shedd Aquarium</h2>`,
                            'marker-color': '#3bb2d0',
                            'marker-size': 'large',
                            'marker-symbol': 'rocket'
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-87.613889, 41.867778]
                        }
                    }, {
                        "type": "Feature",
                        "properties": {
                            "description": `<h2>Adler Planetarium</h2>`,
                            'marker-color': '#3bb2d0',
                            'marker-size': 'large',
                            'marker-symbol': 'rocket'
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-87.606783, 41.866333]
                        }
                    }
                ]
            }
        }
    })

    const popup = new mapboxgl.Popup({closeButton: false, closeOnClick: false});

    map.on('mouseenter', 'places', function (e) {
        map
            .getCanvas()
            .style
            .cursor = 'pointer';
        const coordinates = e
            .features[0]
            .coordinates
            .slice();
        const description = e.features[0].properties.description;

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0]
                ? 360
                : -360;
        }

        popup
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);

    });
    map.on('mouseleave', 'places', function () {
        map
            .getCanvas()
            .style
            .cursor = '';
        popup.remove();
    });
});

//filters the places
filterText.addEventListener('keyup', function (e) {
    e.preventDefault()
    let text = filterText.value;
    console.log(text);
})

//get the ids
function getID(id) {
    return document.getElementById(id);
}