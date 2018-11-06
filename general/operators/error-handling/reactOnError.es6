function getJSON(arr) {
    return Rx.Observable.from(arr).map(function (str) {
        var parsedJSON = JSON.parse(str);
        return parsedJSON;
    });
}
var caught = getJSON(['{"1": 1, "2": 2}', '{"1: 1}']).catch(
    Rx.Observable.return({
        error: 'There was an error parsing JSON'
    })
);

caught.subscribe(
    function (json) {
        console.log('Parsed JSON: ', json);
    },
    // Because we catch errors now, `onError` will not be executed
    function (e) {
        console.log('ERROR', e.message);
    }
);

//< Parsed JSON: Object { 1: 1, 2: 2 }
//  Parsed JSON: Object { error: "There was an error parsing JSON" }