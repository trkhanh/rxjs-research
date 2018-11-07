


function paintStars(stars) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    stars.forEach(function (star) {
        ctx.fillRect(star.x, star.y, star.size, star.size);
    });
}

var SPEED = 40;
var STAR_NUMBER = 250;

var StarStream = Rx.Observable.range(1, STAR_NUMBER)
    .map(function () {
        return {
            x: parseInt(Math.random() * canvas.width),
            y: parseInt(Math.random() * canvas.height),
            size: Math.random() * 3 + 1
        };
    })
    .toArray()
    .flatMap(startArray => {
        return Rx.Observable.interval(SPEED).map(() => {
            startArray.forEach(start => {
                if (start.y >= canvas.height) {
                    start.y = 0; //reset start to top of the screen
                }
                start.y += 3 // move start
            })
        })
    });