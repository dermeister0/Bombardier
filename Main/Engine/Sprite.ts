/// <reference path="../Entities/Game.ts" />
/// <reference path="IDrawable.ts" />
/// <reference path="Image.ts" />

module Bombardier.Engine {
    export class Frame {
        public image: Image;

        constructor(public imageKey: string) {
            this.image = new Image(imageKey);
        }
    }

    export class Sprite implements IDrawable {
        private _frames: Frame[] = [];

        constructor() {
        }

        draw(context: CanvasRenderingContext2D, x: number, y: number) {
            var currentFrame = 0;
            this._frames[currentFrame].image.draw(context, x, y);
        }

        public addFrame(imageKey: string) {
            this._frames.push(new Frame(imageKey));
        }
    }
}
