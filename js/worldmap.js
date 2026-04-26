(function () {
function markerStyle(country, type, highlighted) {
        var isTrek = (type === 'trek');
        var baseColor = isTrek ? '#2b6cb0' : '#d0530f';
        var hlColor   = isTrek ? '#4299e1' : '#e16420';
        return new ol.style.Style({
            image: new ol.style.Circle({
                radius: highlighted ? 12 : (isTrek ? 10 : 8),
                fill:   new ol.style.Fill({ color: highlighted ? hlColor : baseColor }),
                stroke: new ol.style.Stroke({ color: '#fff', width: 2 })
            })
        });
    }

    var vectorSource = new ol.source.Vector();

    var topoLayer = new ol.layer.Tile({
        opacity: 0.5,
        source: new ol.source.XYZ({
            url: 'https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png',
            attributions: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
            maxZoom: 17
        })
    });

    var map = new ol.Map({
        target: 'worldmap',
        layers: [
            topoLayer,
            new ol.layer.Vector({ source: vectorSource })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([10, 30]),
            zoom: 2
        })
    });

    var popupEl = document.getElementById('map-popup');
    var overlay = new ol.Overlay({
        element: popupEl,
        positioning: 'bottom-center',
        stopEvent: false,
        offset: [0, -16]
    });
    map.addOverlay(overlay);

    var highlighted = null;

    fetch('outdoors/hike_db.json')
        .then(function (r) { return r.json(); })
        .then(function (db) {
            var features = [];
            Object.keys(db).forEach(function (id) {
                var h = db[id];
                if (!h.map_latitude || !h.map_longitude) return;
                var f = new ol.Feature({
                    geometry: new ol.geom.Point(
                        ol.proj.fromLonLat([h.map_longitude, h.map_latitude])
                    ),
                    hikeId:     id,
                    title:      h.title,
                    region:     h.region,
                    country:    h.country,
                    type:       h.type || 'hike',
                    link:       h.link || null,
                    coverimage: h.coverimage ? ('outdoors/' + id + '/' + h.coverimage) : null
                });
                f.setStyle(markerStyle(h.country, h.type, false));
                features.push(f);
            });
            vectorSource.addFeatures(features);
        })
        .catch(function () {
            console.error('Could not load hike_db.json');
        });

    map.on('click', function (evt) {
        var feature = map.forEachFeatureAtPixel(evt.pixel, function (f) { return f; });
        if (feature && feature.get('hikeId')) {
            var href = feature.get('link') || ('outdoors/tour.html?id=' + feature.get('hikeId'));
            window.location.href = href;
        }
    });

    map.on('pointermove', function (evt) {
        var feature = map.forEachFeatureAtPixel(evt.pixel, function (f) { return f; });

        if (highlighted && highlighted !== feature) {
            highlighted.setStyle(markerStyle(highlighted.get('country'), highlighted.get('type'), false));
            highlighted = null;
        }

        if (feature && feature !== highlighted) {
            feature.setStyle(markerStyle(feature.get('country'), feature.get('type'), true));
            highlighted = feature;
        }

        if (feature) {
            overlay.setPosition(feature.getGeometry().getCoordinates());
            var label = feature.get('type') === 'trek' ? ' <em style="color:#2b6cb0">(multi-day)</em>' : '';
            var img = feature.get('coverimage')
                ? '<img src="' + feature.get('coverimage') + '" loading="lazy">'
                : '';
            popupEl.innerHTML = img +
                '<div class="map-popup-text">' +
                '<strong>' + feature.get('title') + '</strong>' + label +
                '<br><span>' + feature.get('region') + ', ' + feature.get('country') + '</span>' +
                '</div>';
            map.getTargetElement().style.cursor = 'pointer';
        } else {
            overlay.setPosition(undefined);
            map.getTargetElement().style.cursor = '';
        }
    });
}());
