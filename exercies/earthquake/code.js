var quakes = Rx.Observable.create(function (observer) {
    window.eqfeed_callback = function (response) {
        var quakes = response.features;
        quakes.forEach(function (quake) {
            observer.next(quake);
        });
    };
    loadJSONP(QUAKE_URL);
});


quakes.subscribe(function (quake) {
    let coords = quake.geometry.coordinates;
    let size = quake.properties.mag * 10000;
    L.circle([coords[1], coords[0]], size).addTo(map);
});


loadJSONP(QUAKE_URL).
