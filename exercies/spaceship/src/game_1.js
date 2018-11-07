var Game = Rx.Observable
    .combineLatest(
        StarStream, SpaceShip, Enemies,
        function (stars, spaceship, enemies) {
            return {
                stars: stars,
                spaceship: spaceship,
                enemies: enemies
            };
        });

function renderScene(actors) {
    paintStars(actors.stars);
    paintSpaceShip(actors.spaceship.x, actors.spaceship.y);
}

Game.subscribe(renderScene);