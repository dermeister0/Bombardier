/// <reference path="../Engine/ObjectManager.ts" />
/// <reference path="Map.ts" />

module Bombardier.Entities {
    export class Game {
        private canvasElement: HTMLCanvasElement;

        private i: number = 0;

        private _objectManager = new Engine.ObjectManager();

        private map: Map;

        private static _instance: Game;

        constructor() {
            this.reset();
        }

        getName(): string {
            return "Bombardier";
        }

        draw() {
            var context2D: CanvasRenderingContext2D;

            context2D = this.canvasElement.getContext('2d');

            context2D.fillStyle = 'rgb(0, 0, 0)';
            context2D.fillRect(0, 0, 800, 600);

            this.map.draw(context2D);

            context2D.fillStyle = 'rgb(255, 0, 0)';
            context2D.fillRect(this.i * 10, 10, 10, 20);

            this.i++;
        }

        loadContent() {
            this.objectManager.loadImage('tile_clear', 'Images/Clear.png');
            this.objectManager.loadImage('tile_brick', 'Images/Bricks00.png');
        }

        start() {
            this.map = new Map();
            this.map.load();
        }

        static get instance() {
            if (_instance == null) {
                _instance = new Game();
            }

            return _instance;
        }

        private reset() {
            this.canvasElement = null;
            this.map = null;

            this.canvasElement = <HTMLCanvasElement> document.getElementById("mainCanvas");
        }

        get objectManager() {
            return this._objectManager;
        }
    }
}