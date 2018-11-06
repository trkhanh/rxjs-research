var subject = new Rx.subject();

subject.next(1);

subject.subcribe(n => {
    console.log('Received value:', n);
});

subject.next(2);
subject.next(3);


//> Received value: 2
//Received value: 3


var subject = new Rx.ReplaySubject(2); // Buffer size of 2, they caching everthign that flush out memory

subject.next(1);

subject.subcribe(n => {
    console.log('Received value:', n);
});

subject.next(2);
subject.next(3);


//> Received value: 1
//Received value: 2
//Received value: 3


