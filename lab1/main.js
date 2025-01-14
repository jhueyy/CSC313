import './style.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { Circle, Fill, Stroke, Style, Text } from 'ol/style';

const locations = [
    { city: 'San Luis Obispo', coords: [-120.662139, 35.306449], count: 2 },
    { city: 'San Francisco', coords: [-122.420908, 37.777804], count: 1 },
    { city: 'Los Angeles', coords: [-118.380612, 34.059486], count: 3 },
    //{ city: 'Salt Lake City', coords: [-111.884766, 40.749435], count: 1 },
    //{ city: 'New York', coords: [-73.999786, 40.719038], count: 1 }
];

// Calculate the center coords for the map display
let totalX = 0, totalY = 0;
for (const loc of locations) {
    totalX += loc.coords[0];
    totalY += loc.coords[1];
}
const centerCoords = [totalX / locations.length, totalY / locations.length];


const vectorSource = new VectorSource();

locations.forEach(location => {
    const feature = new Feature({
        geometry: new Point(location.coords)
    });
    const count = location.count;
    const style = new Style({
        image: new Circle({
            radius: count * 5,
            fill: new Fill({ color: count >= 3 ? 'purple' : count === 2 ? 'orange' : 'yellow' }),
            stroke: new Stroke({ color: 'black', width: 1 })
        })
    });
    feature.setStyle(style);
    vectorSource.addFeature(feature);
});

const vectorLayer = new VectorLayer({
    source: vectorSource
});

const map = new Map({
    target: 'map',
    layers: [
        new TileLayer({
            source: new OSM()
        }),
        vectorLayer
    ],
    view: new View({
        center: centerCoords,
        zoom: 7,
        projection: 'EPSG:4326'
    })
});
