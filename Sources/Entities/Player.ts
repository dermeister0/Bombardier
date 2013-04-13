/// <reference path="../Engine/Sprite.ts" />
/// <reference path="../Engine/GameObject.ts" />
/// <reference path="Map.ts" />

module Bombardier.Entities {
    export class Player extends Bombardier.Engine.GameObject {
        private _sprite: Bombardier.Engine.Sprite;

        constructor() {
            super();

            this.position.x = Map.TILE_SIZE / 2;
            this.position.y = Map.TILE_SIZE / 2;
            
            this.size.w = Map.TILE_SIZE;
            this.size.h = Map.TILE_SIZE;

            this.mass = 69;

            this._sprite = new Bombardier.Engine.Sprite();
            this._sprite.addFrame('player');
        }

        public draw(context: CanvasRenderingContext2D) {
            this._sprite.draw(context, this.position.x - this.size.w / 2, this.position.y - this.size.h / 2);
        }
    }
}
