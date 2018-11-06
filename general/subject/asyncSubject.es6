// AsyncSubject emits the last value of a sequence only if the sequence completes

var delayedRange = Rx.Observable.range(0, 5).delay(1000);
var subject = new Rx.AsyncSubject();
delayedRange.subscribe(subject);
subject.subscribe(
    function onNext(item) {
        console.log('Value:', item);
    },
    function onError(err) {
        console.log('Error:', err);
    },
    function onCompleted() {
        console.log('Completed.');
    }
);

// Value: 4
// Completed

//EX2

function getProducts(url) {
    var subject;
    return Rx.Observable.create(function (observer) {
        if (!subject) {
            subject = new Rx.AsyncSubject();
            Rx.DOM.get(url).subscribe(subject);
        }
        return subject.subscribe(observer);
    });
}
var products = getProducts('/products');
// Will trigger request and receive the response when read

products.subscribe(
    function onNext(result) {
        console.log('Result 1:', result.response);
    },
    function onError(error) {
        console.log('ERROR', error);
    }
);
// Will receive the result immediately because it's cached

setTimeout(function () {
    products.subscribe(
        function onNext(result) {
            console.log('Result 2:', result.response);
        },
        function onError(error) {
            console.log('ERROR', error);
        }
    );
}, 5000);