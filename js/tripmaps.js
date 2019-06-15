import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
import KML from 'ol/format/KML.js';
import VectorSource from 'ol/source/Vector.js';
import ZoomToExtent from 'ol/control/ZoomToExtent';

// Shows a map centered at the given location and zoom, and adds a kml path
function showMap(lat, lng, zoom, kml, divid) {
	
	var map = new Map({
		layers: [
			new TileLayer({
				source: new OSM()
			})
		],
		target: divid,
		view: new View({
			center: [0, 0],
			zoom: 2
		})
	});

	lkml = new VectorLayer({
		source: new VectorSource({
			url: kml,
			format: new KML()
		})
	});

	// lkml.events.register("loadend", lkml,
	// function() {
	//    if (this.visibility) {
	// 	var dataExtent = lkml.getDataExtent();
	// 	map.zoomToExtent(dataExtent);
	//    }
  //  }
  // );

	map.addLayer(lkml);
	
}