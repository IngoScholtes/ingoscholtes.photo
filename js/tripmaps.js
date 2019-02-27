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
	div.style.width = '800px';
	
	var platform = new H.service.Platform({
		app_id: 'WxZYu1p8L4ClnkebR416', 
		app_code: 'DNvkAh6zMfL88GCGrhNqWA',
		useHTTPS: true
	});
	
	var defaultLayers = platform.createDefaultLayers();	
	
	var map = new H.Map(div, defaultLayers.satellite.map);
	  //{
	  	//center: {lat:lat, lng:lng},
	  	//zoom: zoom
	  //});
	
		
	// Parse track data
	var reader = new H.data.kml.Reader(kml);	

	reader.addEventListener('statechange', function () {
		// Wait till the KML document is fully loaded and parsed
		if (this.getState() === H.data.AbstractReader.State.READY) {
		  var parsedObjects = reader.getParsedObjects();
		  // Create a group from our objects to easily zoom to them
		  var container = new H.map.Group({objects: parsedObjects});
	
		  // First loaded object is a group of objects describing terminals.
		  // So let's zoom to them by default
		  map.setViewBounds(parsedObjects[0].getBounds());
		  map.addObject(container)
		}
	});
	reader.parse();
	
	
	// map.addLayer(layer);
	// rect = H.geo.Rect.coverLatLngAlts(coords)
	// map.setViewBounds(rect);
	
	// MapEvents enables the event system
	// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
	var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));


	
	// Create the default UI components
	//var ui = H.ui.UI.createDefault(map, defaultLayers);

	// Remove map settings as unnecessary
	//	ui.removeControl('mapsettings');
	
	// Now use the map as required...
	//switchMapType(map, platform);
	
//	layer.getProvider().addEventListener('tap', function(ev) {
//		console.log(ev.target.getData());
//	});		  
}