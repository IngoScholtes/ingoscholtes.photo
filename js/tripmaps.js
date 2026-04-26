
// Shows a map centered at the given location and zoom, and adds a kml path
function showMap(lat, lng, zoom, kml, divid) {

	var topoLayer = new ol.layer.Tile({
		opacity: 0.5,
		source: new ol.source.XYZ({
			url: 'https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png',
			attributions: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
			maxZoom: 17
		})
	});

	var map = new ol.Map({
		layers: [ topoLayer ],
		target: divid,
		view: new ol.View({
			center: [0, 0],
			zoom: 1
		})
	});

	document.getElementById(divid).style.backgroundColor = '#888888';

	kmlSource = new ol.source.Vector({
		url: kml,
		format: new ol.format.KML()
	});

	lkml = new ol.layer.Vector({
		source: kmlSource
	});

	lkml.once("change", function(e) {
			var extent = kmlSource.getExtent();
			map.getView().fit(extent);
   }
  );

	map.addLayer(lkml);
}
