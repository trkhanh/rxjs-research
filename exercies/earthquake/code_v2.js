var quakes = Rx.Observable.create(function (observer) {
    window.eqfeed_callback = function (response) {
        observer.next(response);
        observer.complete();
    };
    loadJSONP(QUAKE_URL);
}).pipe(
    Rx.operators.flatMap(function transform(dataset) {
        return Rx.from(dataset.features);
    }));

quakes.subscribe(function (quake) {
    let coords = quake.geometry.coordinates;
    let size = quake.properties.mag * 10000;
    L.circle([coords[1], coords[0]], size).addTo(map);
});