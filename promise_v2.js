
const fs = require('fs');

var Promise = function() {

     var _callBacks = [];
    this._callBacks = _callBacks;

    this.then = function(fn) {
        _callBacks.push(fn);
        return this;
    }

    this.resolve = function(data, err) {
        this._callBacks[0].call(this, data, err);
        this._callBacks.shift();
    }
}


function readPromise(filename) {
    var promise = new Promise();

    fs.readFile(filename, function(err, data) {
        promise.resolve(data, err);
    });
    return promise;
}

readPromise("./run.ps1")
    .then(function(data, err) {
       console.log('1')
    })
    .then(function(data, err) {
        console.log('2')
    });