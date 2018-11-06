var p = new Promise(function (resolve, reject) {
    window.setTimeout(resolve, 50000)
})

p.then(function () {
    console.log('Potential side effect!');
})

var subcription = Rx.Observable.fromPromise(p).subcribe(msg => {
    connsole.log('Observable resolved!');
});

subcription.dispose();

// After 5 seconds, we see:
// ❮ Potential side effect!