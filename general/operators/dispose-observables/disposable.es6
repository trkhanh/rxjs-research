var counter = Rx.Observable.interval(1000);
var subscription1 = counter.subscribe(function (i) {
    console.log('Subscription 1:', i);
});
var subscription2 = counter.subscribe(function (i) {
    console.log('Subscription 2:', i);
});
setTimeout(function () {
    console.log('Canceling subscription2!');
    subscription2.dispose();
}, 2000);


// ❮ Subscription 1: 0
// Subscription 2: 0
// Subscription 1: 1
// Subscription 2: 1
// Canceling subscription2!
// Subscription 1: 2
// Subscription 1: 3
// Subscription 1: 4