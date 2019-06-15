import ol from 'ol'

// Shows a map centered at the given location and zoom, and adds a kml path
function showMap(lat, lng, zoom, kml, divid) {
	
	var map = new ol.Map({
		layers: [
			new TileLayer({
				source: new OSM()
			})
		],
		target: divid,
		view: new ol.View({
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