/// <reference path="../Entities/Game.ts" />
/// <reference path="IDrawable.ts" />
/// <reference path="Image.ts" />

module Bombardier.Engine {
    export class Frame {
        constructor(public rect: Rect) {
        }
    }

    export class Sprite implements IDrawable {
        private _image: Image;
        private _frames: Frame[] = [];
        private _size: Size2;

        constructor(imageKey: string, size: Size2) {
            this._image = new Image(imageKey);
            this._size = new Size2(size.w, size.h);
        }

        draw(context: CanvasRenderingContext2D, x: number, y: number): void {
            var currentFrame = 0;
            this._image.draw(context, x, y, this._frames[currentFrame].rect);
        }

        public addFrame(left: number, top: number) {
            this._frames.push(new Frame(new Rect(left, top, left + this._size.w, top + this._size.h)));
        }
    }
}
