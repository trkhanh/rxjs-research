// var evenTicks = 0;

function updateDistance(acc, i) {
    if (i % 2 === 0) {
        console.log(i)
        acc += 1;
    }
    return acc;
}
var ticksObservable = Rx.Observable
    .interval(1000)
    .scan(updateDistance, 0)


ticksObservable.subscribe(function () {
    console.log('Subscriber 1 - evenTicks: ' + evenTicks + ' so far');
});

ticksObservable.subscribe(function () {
    console.log('Subscriber 2 - evenTicks: ' + evenTicks + ' so far');
});