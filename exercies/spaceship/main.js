let canvas = document.createElement('canvas');
let ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


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
    .flatMap(function (starArray) {
        return Rx.Observable.interval(SPEED).map(function () {
            starArray.forEach(function (star) {
                if (star.y >= canvas.height) {
                    star.y = 0; // Reset star to top of the screen
                }
                star.y += 3; // Move star
            });
            return starArray;
        });
    })


var HERO_Y = canvas.height - 30;
var mouseMove = Rx.Observable.fromEvent(canvas, 'mousemove');
var SpaceShip = mouseMove
    .map(function (event) {
        return {
            x: event.clientX,
            y: HERO_Y
        };
    })
    .startWith({
        x: canvas.width / 2,
        y: HERO_Y
    });

function drawTriangle(x, y, width, color, direction) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x - width, y);
    ctx.lineTo(x, direction === 'up' ? y - width : y + width);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x - width, y);
    ctx.fill();
}

function paintSpaceShip(x, y) {
    drawTriangle(x, y, 20, '#ff0000', 'up');
}


var ENEMY_FREQ = 1500;
var Enemies = Rx.Observable.interval(ENEMY_FREQ)
    .scan(function (enemyArray) {
        var enemy = {
            x: parseInt(Math.random() * canvas.width),
            y: -30,
        };
        enemyArray.push(enemy);
        return enemyArray;
    }, []);

// Helper function to get a random integer
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function paintEnemies(enemies) {
    enemies.forEach(function (enemy) {
        enemy.y += 5;
        enemy.x += getRandomInt(-15, 15);
        drawTriangle(enemy.x, enemy.y, 20, '#00ff00', 'down');

        if (!enemy.isDead) {
            drawTriangle(enemy.x, enemy.y, 20, '#00ff00', 'down');
        }

        enemy.shots.forEach(function (shot) {
            shot.y += SHOOTING_SPEED;
            drawTriangle(shot.x, shot.y, 5, '#00ffff', 'down')
        })
    });
}



const keyboards = {
    'SPACE': 32,
}

var playerFiring = Rx.Observable
    .merge(
        Rx.Observable.fromEvent(canvas, 'click'),
        Rx.Observable.fromEvent(canvas, 'keydown')
        .filter(() => {
            return event.keycode === keyboards.SPACE;
        })
        .sample(200)
        .timestamp()
    )

var HeroShots = Rx.Observable
    .combineLatest(
        playerFiring,
        SpaceShip,
        function (shotEvents, spaceShip) {
            return {
                timeStamp: shotEvents.timeStamp,
                x: spaceShip.x
            }
        })
    .distinctUntilChanged(shot => {
        return shot.timeStamp;
    })
    .scan((shotArray, shot) => {
        shotArray.push({
            x: shot.x,
            y: HERO_Y
        });
        return shotArray;
    }, [])

var SHOOTING_SPEED = 15;
var SCORE_INCREASE = 10;

function paintHeroShots(heroShots, enemies) {
    heroShots.forEach((shot, i) => {
        enemies.forEach(enemy => {
            if (!enemy.isDead && collision(shot, enemy)) {
                ScoreSubject.onNext(SCORE_INCREASE)
                enemy.isDead = true;
                shot.x = shot.y = -100;
                // break;
            }
        });

        shot.y -= SHOOTING_SPEED;
        drawTriangle(shot.x, shot.y, 5, '#ffff00', 'up')
    })
}


function isVisible(obj) {
    return obj.x > -40 && obj.x < canvas.width + 40 &&
        obj.y > -40 && obj.y < canvas.height + 40;
}
var ENEMY_FREQ = 1500;
var ENEMY_SHOOTING_FREQ = 750;
var Enemies = Rx.Observable.interval(ENEMY_FREQ)
    .scan(function (enemyArray) {
        var enemy = {
            x: parseInt(Math.random() * canvas.width),
            y: -30,
            shots: []
        };
        Rx.Observable.interval(ENEMY_SHOOTING_FREQ).subscribe(function () {
            if (!enemy.isDead) {
                enemy.shots.push({
                    x: enemy.x,
                    y: enemy.y
                })
            }
            enemy.shots = enemy.shots.filter(isVisible);
        });
        enemyArray.push(enemy);
        return enemyArray.filter(isVisible)
            .filter(enemy => {
                return !(enemy.isDead && enemy.shots.length === 0);
            })
    }, []);

function collision(target1, target2) {
    return (target1.x > target2.x - 20 && target1.x < target2.x + 20) &&
        (target1.y > target2.y - 20 && target1.y < target2.y + 20);
}

function gameOver(ship, enemies) {
    return enemies.some(function (enemy) {
        if (collision(ship, enemy)) {
            return true;
        }
        return enemy.shots.some(function (shot) {
            return collision(ship, shot);
        });
    });
}

function paintScore(score) {
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 26px sans-serif';
    ctx.fillText('Score: ' + score, 40, 43);
}

var ScoreSubject = new Rx.Subject();

var score = ScoreSubject
    // .scan(function (prev, cur) {
    //     return prev + cur;
    // }, 0)
// .concat(Rx.Observable.return(0));

function renderScene(actors) {
    paintStars(actors.stars);
    paintSpaceShip(actors.spaceship.x, actors.spaceship.y);
    paintEnemies(actors.enemies);
    paintHeroShots(actors.heroShots, actors.enemies);
    paintScore(actors.score);
}

var Game = Rx.Observable.combineLatest(
        [StarStream, SpaceShip, Enemies, HeroShots],
        function (stars, spaceship, enemies, heroShots) {
            return {
                stars: stars,
                spaceship: spaceship,
                enemies: enemies,
                heroShots: heroShots
            };
        })
    .sample(SPEED)
    .takeWhile(function (actors) {
        return gameOver(actors.spaceship, actors.enemies) === false;
    })
    .subscribe(renderScene);