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

        function updateAndDraw() {
            if (self.lastUpdate == undefined) {
                self.lastUpdate = Date.now();
            }

            var diff = Date.now() - self.lastUpdate;

            self.game.update(diff);
            self.game.draw(diff);

            requestAnimationFrame(updateAndDraw);
        }
        updateAndDraw();
    }
}

window.onload = () => {
    var main = new Main();
    main.start();
};
