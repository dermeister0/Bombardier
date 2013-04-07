/// <reference path="IDrawable.ts" />
/// <reference path="../Entities/Game.ts" />

module Bombardier.Engine {
    export class Image implements IDrawable {
        private imageElement: HTMLImageElement;

        constructor(key: string) {
            this.imageElement = Bombardier.Entities.Game.instance.objectManager.getImage(key);
        }

        draw(context: CanvasRenderingContext2D, x: number, y: number) {
            context.drawImage(this.imageElement, x, y);
        }
    }
}
