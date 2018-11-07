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
Game.subscribe(renderScene);