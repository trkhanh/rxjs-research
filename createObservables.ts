var Rx;

var observable = Rx.Observable.create(function(observer) {
  observer.onNext("Simon");
  observer.onNext("Jen");
  observer.onNext("Sergi");
  observer.onCompleted(); // We are done
});
