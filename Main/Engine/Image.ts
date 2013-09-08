/// <reference path="IDrawable.ts" />
/// <reference path="../Entities/Game.ts" />

module Bombardier.Engine {
    export class Image {
        private _imageElement: HTMLImageElement;

        constructor(key: string) {
            this._imageElement = Bombardier.Entities.Game.instance.objectManager.getImage(key);
        }

        draw(context: CanvasRenderingContext2D, x: number, y: number, rect?: Rect): void {
            if (rect === undefined) {
                context.drawImage(this._imageElement, x, y);
            }
            else {
                context.drawImage(this._imageElement, rect.left, rect.top, rect.width, rect.height, x, y, rect.width, rect.height);
            }
        }
    }
}
