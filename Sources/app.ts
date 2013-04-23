/// <reference path="Entities/Game.ts" />
/// <reference path="Engine/Input.ts" />

import Entities = Bombardier.Entities;

class Greeter {
    element: HTMLElement;
    span: HTMLElement;
    drawTimerToken: number;
    updateTimerToken: number;
    game: Entities.Game;

    lastDraw: number;
    lastUpdate: number;

    constructor(element: HTMLElement) {
        document.onkeyup = Bombardier.Engine.Input.OnKeyUp;
        document.onkeydown = Bombardier.Engine.Input.OnKeyDown;

        var canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("mainCanvas");

        this.game = Entities.Game.instance;
        this.game.loadContent();

        this.game.start();
    }

    start() {
        //this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);

        var self = this;

        this.drawTimerToken = setInterval(() => {
            if (self.lastDraw == undefined) {
                self.lastDraw = Date.now();
            }

            var diff = Date.now() - self.lastDraw;

            self.game.draw(diff);

            this.lastDraw = Date.now();
        }, 1000 / 30);

        this.updateTimerToken = setInterval(() => {
            if (self.lastUpdate == undefined) {
                self.lastUpdate = Date.now();
            }

            var diff = Date.now() - self.lastUpdate;

            self.game.update(diff);

            this.lastUpdate = Date.now();
        }, 1000 / 30);
    }

    stop() {
        clearTimeout(this.drawTimerToken);
        clearTimeout(this.updateTimerToken);
    }

}

window.onload = () => {
    var el = document.getElementById('content');
    var greeter = new Greeter(el);
    greeter.start();
};