import './style.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { Circle, Fill, Stroke, Style } from 'ol/style';

const locations = [
    { city: 'Fresno', coords: [-119.789064, 36.741618], count: 1 },
    { city: 'San Francisco', coords: [-122.420908, 37.777804], count: 2 },
    { city: 'Gardnerville, Nevada', coords: [-119.731994, 38.937779], count: 1 },
    { city: 'Los Angeles', coords: [-118.380612, 34.059486], count: 1 },
    { city: 'Folsom', coords: [-121.147826, 38.674677], count: 1 },

    // Test coordinates
    //{ city: 'Salt Lake City', coords: [-111.884766, 40.749435], count: 3 },
    //{ city: 'New York', coords: [-73.999786, 40.719038], count: 1 }
];

const calPolyCoords = [-120.663523, 35.303634]

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
        center: calPolyCoords,
        zoom: 16,
        projection: 'EPSG:4326'
    })
});
