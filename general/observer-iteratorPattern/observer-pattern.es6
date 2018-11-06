class Subject {
    constructor() {
        this.observers = [];
    }

    subscribe(p) {
        let arrayOfObserver=[];
        arrayOfObserver=p;
        arrayOfObserver.forEach(o => {
            this.observers.push(o);
        })
    };

    unSubscribe(observer) {
        this.observers = this.observers.filter((o) => observer !== o);
    };

    notifyObserver(events) {

        this.observers.forEach(observerExecutingWith => {
            console.log(typeof observerExecutingWith)
            observerExecutingWith.update(events);
        });
    };
}


class Observer {
    constructor(_name) {
        this.name = _name;
    }
    update(events) {
        console.log(`I'm ${this.name} and subject already do ${events}`);
    }
}


let observable = new Subject();
let observerA = new Observer("A");
let observerB = new Observer("B");
observable.subscribe([observerA,observerB]);
observable.notifyObserver(['click', 'move', 'click', 'click']);