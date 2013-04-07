/// <reference path="../Engine/ObjectManager.ts" />
/// <reference path="Map.ts" />

module Bombardier.Entities {
    export class Game {
        private canvasElement: HTMLCanvasElement;

        private i: number;

        private objectManager = new Engine.ObjectManager();

        private map: Map;

        constructor(canvas: HTMLCanvasElement) {
            this.canvasElement = canvas;

            this.i = 0;
        }

        getName(): string {
            return "Bombardier";
        }

        draw() {
            var context2D: CanvasRenderingContext2D;

            context2D = this.canvasElement.getContext('2d');

            context2D.fillStyle = 'rgb(0, 0, 0)';
            context2D.fillRect(0, 0, 800, 600);

            context2D.fillStyle = 'rgb(255, 0, 0)';
            context2D.fillRect(this.i * 10, 10, 10, 20);

            this.i++;

            //context2D.fillRect(50, 20, 145, 145);

            var img = <HTMLImageElement> document.createElement('img');
            img.src = "Images/Bricks00.png";

            context2D.drawImage(img, 100, 100);
            context2D.drawImage(img, 164, 100);

            //var tt: number[] = ['hh': 435, 'sdf': 666];
            var images: HTMLImageElement[] = [];
            if (images['aaa'] == undefined) {
                images['aaa'] = document.createElement('img');
            }
        }

        loadContent() {
            this.objectManager.loadImage('bricks00', 'Images/Bricks00.png');
        }

        start() {
            this.map = new Map();
            this.map.load();
        }
    }
}