// A Subject is a type that implements both Observer and Observable types. As
// an Observer.
const Rx;
let subject = new Rx.Subject();

let source = Rx.Observable.interval(300)
    .map(v => 'Interval message #' + v)
    .take(5);

source.subscribe(subject);

let subscription = subject.subscribe(
    function next(x) {
        console.log('onNext: ' + x);
    },
    function error(e) {
        console.log('onError: ' + e.message);
    },
    function complete() {
        console.log('onCompleted');
    }
)

s = subject;
s.next('Our mes #1');
s.next('Our mes #2');

setTimeout(() => {
    s.complete();
}, 1000)


// Output:
// ❮ onNext: Our message #1
// onNext: Our message #2
// onNext: Interval message #0
// onNext: Interval message #1
// onNext: Interval message #2

// Subject.subscribeTo(source)
source.subscribe(subject)
subject.subscribe(new Observer)
//subject behaves as an Observable