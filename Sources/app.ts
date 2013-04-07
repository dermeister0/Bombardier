/// <reference path="Entities/Game.ts" />

import Entities = Bombardier.Entities;

class Greeter {
    element: HTMLElement;
    span: HTMLElement;
    timerToken: number;
    game: Entities.Game;

    constructor(element: HTMLElement) {
        var canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("mainCanvas");

        this.game = new Entities.Game(canvas);
        this.game.loadContent();
    }

    start() {
        //this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);
        this.timerToken = setInterval(() => this.game.draw(), 1000 / 30);
    }

    stop() {
        clearTimeout(this.timerToken);
    }

}

window.onload = () => {
    var el = document.getElementById('content');
    var greeter = new Greeter(el);
    greeter.start();
};