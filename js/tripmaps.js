/*
* SimpleGallery V1.0
* Copyright 2012-2018, Ingo Scholtes
* Free to use under the MIT license.
* http://www.opensource.org/licenses/mit-license.php
* 3/4/2019
*/

// uses Here.com JS 3.0

function switchMapType(map, platform) {
	"use strict";	
 	var ts = platform.getMapTileService({ type: 'satellite' });
  	var terrainMap = ts.createTileLayer(
		'maptile',
		'satellite.day',
		pixelRatio === 1 ? 256 : 512,
		'png8',
		{ppi: pixelRatio === 1 ? undefined : 320}
	);
  	map.setBaseLayer(terrainMap);
}

// Shows a map centered at the given location and zoom, and adds a kml path 
function showMap(lat, lng, zoom, kml, divid) {
	"use strict";
	
	var div = document.getElementById(divid);
	
	var platform = new H.service.Platform({
		app_id: 'WxZYu1p8L4ClnkebR416', 
		app_code: 'DNvkAh6zMfL88GCGrhNqWA',
		useHTTPS: true
	});
	
	var defaultLayers = platform.createDefaultLayers();	
	
	var map = new H.Map(div, defaultLayers.satellite.map);
		
	// Parse track data
	var reader = new H.data.kml.Reader(kml);

	reader.parse();

	reader.addEventListener('statechange', function () {
		// Wait till the KML document is fully loaded and parsed
		if (this.getState() === H.data.AbstractReader.State.READY) {
		  var parsedObjects = reader.getParsedObjects();
		  // Create a group from our objects to easily zoom to them
		  var container = new H.map.Group({objects: parsedObjects});
		  map.setViewBounds(parsedObjects[0].getBounds());
		  map.addObject(container)
		}
	});
	
	// MapEvents enables the event system
	// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
	var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
}