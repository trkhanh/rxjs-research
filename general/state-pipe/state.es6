// var evenTicks = 0;

function updateDistance(acc, i) {
    if (i % 2 === 0) {
        console.log(i)
        acc += 1;
    }
    return acc;
}


// scan<T, R>(accumulator: (acc: R, value: T, index: number) 
// => R, seed?: T | R): OperatorFunction<T, R>
var ticksObservable = Rx.Observable
    .interval(1000)
    .scan(updateDistance, 0)


ticksObservable.subscribe(function () {
    console.log('Subscriber 1 - evenTicks: ' + evenTicks + ' so far');
});

ticksObservable.subscribe(function () {
    console.log('Subscriber 2 - evenTicks: ' + evenTicks + ' so far');
});