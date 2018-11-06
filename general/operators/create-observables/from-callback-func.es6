import Rx from 'rx';
import fs from 'fs';

let readdir = Rx.Observable.fromNodeCallback(fs.readdir);

let source = readdir('/Users/tran_khanh');

var subcription = source.subscibe(
function (res) {
    console.log('List of directories: ' + res);
},
function (err) {
    console.log('Error: ' + err);
},
function () {
    console.log('Done!');
});
