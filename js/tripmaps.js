
// Shows a map centered at the given location and zoom, and adds a kml path
function showMap(lat, lng, zoom, kml, divid) {
	
	var map = new ol.Map({
		layers: [
			new ol.layer.Tile({
				source: new ol.source.OSM()
			})
		],
		target: divid,
		view: new ol.View({
			center: [0, 0],
			zoom: 2
		})
	});

	kmlSource = new ol.source.Vector({
		url: kml,
		format: new ol.format.KML()
	});

	lkml = new ol.layer.Vector({
		source: kmlSource
	});

	lkml.once("change", function(e) {
	   if (lkml.getState() === 'ready') {	
			map.getView().fit(kmlSource.getExtent());
	   }
   }
  );

	map.addLayer(lkml);
}