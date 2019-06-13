// Shows a map centered at the given location and zoom, and adds a kml path
function showMap(lat, lng, zoom, kml, divid) {
	
	var map = new OpenLayers.Map (divid, {
		controls:[
			new OpenLayers.Control.Navigation(),
			new OpenLayers.Control.PanZoomBar()],
		maxExtent: new OpenLayers.Bounds(-20037508.34,-20037508.34,20037508.34,20037508.34),
		maxResolution: 156543.0399,
		numZoomLevels: 19,
		units: 'm',
		projection: new OpenLayers.Projection("EPSG:900913"),
		displayProjection: new OpenLayers.Projection("EPSG:4326")
	} );

	var layerCycleMap = new OpenLayers.Layer.OSM.Mapnik("OpenCycleMap");
	map.addLayer(layerCycleMap);

	var lkml = new OpenLayers.Layer.Vector("Track", {
		strategies: [new OpenLayers.Strategy.Fixed()],
		protocol: new OpenLayers.Protocol.HTTP({
			url: kml,
			format: new OpenLayers.Format.KML()
		}),
		style: {strokeColor: "red", strokeWidth: 5, strokeOpacity: 0.75},
		projection: new OpenLayers.Projection("EPSG:4326")
	});
	map.addLayer(lkml);

	var dataExtent = lkml.getDataExtent();
	map.zoomToExtent(dataExtent);
}