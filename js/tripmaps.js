// uses Here.com JS 3.0

function switchMapType(map, platform) {
	"use strict";	
 	var aerialMapTileService = platform.getMapTileService({
		type: 'aerial'
  	});
  	var terrainMap = aerialMapTileService.createTileLayer(
		'maptile',
		'terrain.day',
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
	
	// Parse track data
	var reader = new H.data.kml.Reader(kml);
	reader.parse();
	var layer = reader.getLayer();
	
	var platform = new H.service.Platform({
		app_id: 'WxZYu1p8L4ClnkebR416', 
		app_code: 'DNvkAh6zMfL88GCGrhNqWA',
		useHTTPS: true
	});
	
	var defaultLayers = platform.createDefaultLayers();	
	
	var map = new H.Map(div,
	  defaultLayers.terrain.map,{
	  center: {lat:lat, lng:lng},
	  zoom: zoom
	});
	
	map.addLayer(layer);
	
	
	// MapEvents enables the event system
	// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
	var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
	
	// Create the default UI components
	// var ui = H.ui.UI.createDefault(map, defaultLayers);

	// Remove map settings as unnecessary
	//	ui.removeControl('mapsettings');
	
	// Now use the map as required...
	//switchMapType(map, platform);
	
	// Add track to map
	
	
//	layer.getProvider().addEventListener('tap', function(ev) {
//		console.log(ev.target.getData());
//	});		  
}