/// <reference path="IDrawable.ts" />
/// <reference path="../Entities/Game.ts" />

module Bombardier.Engine {
    export class Image implements IDrawable {
        private _imageElement: HTMLImageElement;

        constructor(key: string) {
            this._imageElement = Bombardier.Entities.Game.instance.objectManager.getImage(key);
        }

        draw(context: CanvasRenderingContext2D, x: number, y: number): void {
            context.drawImage(this._imageElement, x, y);
        }
    }
}
