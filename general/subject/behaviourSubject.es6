// Imagine we want to retrieve a remote file and print its contents on an HTML
// page, but we want placeholder text while we wait for the contents. We can
// use a BehaviorSubject for this:


let subject = new Rx.BehaviourSubject('Waiting for content');

subject.subcribe(
    function (result) {
        document.body.textContent = result.response || result;
    },
    function (err) {
        document.body.textContent = 'There was an error retrieving content';
    }
)

Rx.DOM.get('/remote/content').subscribe(subject);