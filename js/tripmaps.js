
// Shows a map centered at the given location and zoom, and adds a kml path
function showMap(lat, lng, zoom, kml, divid) {
	
	var map = new ol.Map({
		layers: [
			new ol.layers.TileLayer({
				source: new ol.source.OSM()
			})
		],
		target: divid,
		view: new ol.View({
			center: [0, 0],
			zoom: 2
		})
	});

	lkml = new ol.VectorLayer({
		source: new ol.source.VectorSource({
			url: kml,
			format: new ol.format.KML()
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