/// <reference path="Entities/Game.ts" />
/// <reference path="Engine/Input.ts" />

import Entities = Bombardier.Entities;

class Main {
    updateTimerToken: number;
    game: Entities.Game;

    lastUpdate: number;

    private _fpsLastTime: number = 0;

    private _fps: number = 0;

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
            self.lastUpdate = Date.now();

            self.game.update(diff);
            self.game.draw(diff);
            self._fps++;

            var fpsDiff = Date.now() - self._fpsLastTime;
            if (fpsDiff > 1000) {
                document.getElementById('fpsLabel').textContent = self._fps.toString();
                self._fps = 0;
                self._fpsLastTime = Date.now();
            }

            requestAnimationFrame(updateAndDraw);
        }
        updateAndDraw();
    }
}

window.onload = () => {
    var main = new Main();
    main.start();
};
