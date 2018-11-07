//If the horse running is source of data then each 1000ms
// we will scan for new pace of horse and count agvPace
var avgOfHorse = Rx.Observable.interval(1000)
    .scan(function (prev, cur) {
        return {
            sum: prev.sum + cur,
            count: prev.count + 1
        };
    }, {
        sum: 0,
        count: 0
    })
    .map(function (o) {
        return o.sum / o.count;
    });


var subscription = avgOfHorse.subscribe(function (x) {
    console.log(x);
});