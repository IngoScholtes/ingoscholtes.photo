/*
* SimpleGallery V1.0
* Copyright 2012-2018, Ingo Scholtes
* Free to use under the MIT license.
* http://www.opensource.org/licenses/mit-license.php
* 3/4/2019
*/


// Shows a map centered at the given location and zoom, and adds a kml path 
function showMap(lat, lng, zoom, kml, divid) {
	
	var map = new OpenLayers.Map (divid, {
		controls:[
			new OpenLayers.Control.Navigation(),
			new OpenLayers.Control.PanZoomBar(),
			new OpenLayers.Control.LayerSwitcher(),
			new OpenLayers.Control.Attribution()],
		maxExtent: new OpenLayers.Bounds(-20037508.34,-20037508.34,20037508.34,20037508.34),
		maxResolution: 156543.0399,
		numZoomLevels: 19,
		units: 'm',
		projection: new OpenLayers.Projection("EPSG:900913"),
		displayProjection: new OpenLayers.Projection("EPSG:4326")
	} );

	// Define the map layer
	// Here we use a predefined layer that will be kept up to date with URL changes
	layerMapnik = new OpenLayers.Layer.OSM.Mapnik("Mapnik");
	map.addLayer(layerMapnik);
	layerCycleMap = new OpenLayers.Layer.OSM.CycleMap("CycleMap");
	map.addLayer(layerCycleMap);
	layerMarkers = new OpenLayers.Layer.Markers("Markers");
	map.addLayer(layerMarkers);

	// Add the Layer with the GPX Track
	var lgpx = new OpenLayers.Layer.Vector("Lakeside cycle ride", {
		strategies: [new OpenLayers.Strategy.Fixed()],
		protocol: new OpenLayers.Protocol.HTTP({
			url: kml,
			format: new OpenLayers.Format.KML()
		}),
		style: {strokeColor: "red", strokeWidth: 5, strokeOpacity: 0.5},
		projection: new OpenLayers.Projection("EPSG:4326")
	});
	map.addLayer(lgpx);

	// Add a Layer with Marker
	var size = new OpenLayers.Size(21, 25);
	var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
	var icon = new OpenLayers.Icon('https://www.openstreetmap.org/openlayers/img/marker.png',size,offset);
	layerMarkers.addMarker(new OpenLayers.Marker(lonLat,icon));

	var lonLat = new OpenLayers.LonLat(lng, lat).transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject());
	map.setCenter(lonLat, zoom);	
}