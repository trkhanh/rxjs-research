const __docBody = document.body;


__docBody.addEventListener('mousemove', (e) => {
    console.log(e.clientX, e.clientY)
});


var clicks = 0;

//State of system
function isSystemWorking(clicks) {
    return clicks > 1 ? true : false
}
isSystemWorking(clicks)

//something that developer do
__docBody.addEventListener('click', function registerClicks(e) {

    // let safeClicks= 0; innner of function that be more safer 

    //By default programmer will handle some thing as below. 
    if (click !== 0) {
        return null
    }

    if (clicks < 10) {
        if (e.clientX > window.innerWidth / 2) {
            console.log(e.clientX, e.clientY)
            clicks++; //Change click --> Click outside this function scope ==> Side effect 
        }
    } else {
        __docBody.removeEventListener('click', registerClicks);
    }
})


//RJX
var callLibOfRx;
var Rx = callLibOfRx;
// Create an Observable of click events and filter out the clicks that happen on the
// left side of the screen. Then print the coordinates of only the first 10 clicks to the
// console as they happen.

Rx.Observable.fromEvet(document, 'click')
    .filter((c) => c.clientX > window.innerWidth / 2)
    .take(10)
    .subcribe((c) => {
        console.log(c.clientX, c.clientX)
    })