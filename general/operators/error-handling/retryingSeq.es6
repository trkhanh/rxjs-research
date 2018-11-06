// This will try to retrieve the remote URL up to 5 times.
Rx.DOM.get('/products').retry(5)
    .subscribe(
        function (xhr) {
            console.log(xhr);
        },
        function (err) {
            console.error('ERROR: ', err);
        }
    );

    // First, if we don’t
    // pass any parameters, it will retry indefinitely until the sequence is finished
    // with no errors. This is dangerous for performance if the Observable keeps
    // producing errors. If we’re using synchronous Observables, it would have the
    // same effect as an infinite loop.


    // Second, retry will always retry the whole Observable sequence again, even if
    // some of the items didn’t error. This is important in case you’re causing any
    // side effects when processing items, since they will be reapplied with every
    // retry.