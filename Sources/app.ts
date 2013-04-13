/// <reference path="Entities/Game.ts" />

import Entities = Bombardier.Entities;

class Greeter {
    element: HTMLElement;
    span: HTMLElement;
    timerToken: number;
    game: Entities.Game;

    constructor(element: HTMLElement) {
        var canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("mainCanvas");

        this.game = Entities.Game.instance;
        this.game.loadContent();

        this.game.start();
    }

    start() {
        //this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);
        this.timerToken = setInterval(() => this.game.draw(), 1000 / 30);

        setInterval(() => this.game.update(), 1000 / 30);
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