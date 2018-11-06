var allMoves = Rx.Observable.fromEvent(document, 'mousemove')
allMoves.subscribe(function (e) {
    console.log(e.clientX, e.clientY);
})


var movesOnTheRight = allMoves.filter(function (e) {
    return e.clientX > window.innerWidth / 2;
})

var movesOnTheLeft = allMoves.filter(function (e) {
    return e.clientX < window.innerWidth / 2;
})

movesOnTheRight.subscribe(function (e) {
    console.log('Mouse is on the right:', e.clientX);
})

movesOnTheLeft.subscribe(function (e) {
    console.log('Mouse is on the left:', e.clientX);
});