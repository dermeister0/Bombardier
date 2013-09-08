/// <reference path="../Engine/IDrawable.ts" />

module Bombardier.Entities {
    export class ActorSprite implements Engine.IDrawable {
        private _sprite: Engine.Sprite;

        private _leftBegin: number;
        private _rightBegin: number;

        constructor(actorName: string) {
            // @@
            if (actorName === 'player') {
                this._sprite = new Bombardier.Engine.Sprite('player', new Engine.Size2(64, 64)); // @@
                this._leftBegin = this._sprite.addFrame(0, 0);
                this._rightBegin = this._sprite.addFrame(64, 0);
            }
        }

        public draw(context: CanvasRenderingContext2D, x: number, y: number): void {
            this._sprite.draw(context, x, y);
        }

        public goLeft(): void {
            this._sprite.currentFrame = this._leftBegin;
        }

        public goRight(): void {
            this._sprite.currentFrame = this._rightBegin;
        }
    }
}
