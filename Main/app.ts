/// <reference path="Entities/Game.ts" />
/// <reference path="Engine/Input.ts" />

import Entities = Bombardier.Entities;

class Main {
    updateTimerToken: number;
    game: Entities.Game;

    lastUpdate: number;

    constructor() {
        document.onkeyup = Bombardier.Engine.Input.OnKeyUp;
        document.onkeydown = Bombardier.Engine.Input.OnKeyDown;

        this.game = Entities.Game.instance;
        this.game.loadContent();

        this.game.start();
    }

    start() {
        var self = this;

        this.updateTimerToken = setInterval(() => {
            if (self.lastUpdate == undefined) {
                self.lastUpdate = Date.now();
            }

            var diff = Date.now() - self.lastUpdate;

            self.game.update(diff);

            this.lastUpdate = Date.now();
        }, 1000 / 60);

        function draw() {
            self.game.draw(0);

            requestAnimationFrame(draw);
        }
        draw();
    }

    stop() {
        clearTimeout(this.updateTimerToken);
    }

}

window.onload = () => {
    var main = new Main();
    main.start();
};
