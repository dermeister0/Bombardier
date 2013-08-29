/// <reference path="../Engine/GameObject.ts" />
/// <reference path="../Engine/Viewport.ts" />

module Bombardier.Entities {
    import b2Collision = Box2D.Collision;
    import b2Dynamics = Box2D.Dynamics;

    export class Bomb extends Bombardier.Engine.GameObject {
        static BOMB_SIZE: number = 0.5;
        static BOMB_HALF_SIZE: number = Bomb.BOMB_SIZE / 2;

        static DIRECTION_LEFT: number = 0;
        static DIRECTION_RIGHT: number = 1;

        private static _images: Engine.Image[] = [];

        private _direction: number;

        constructor(x: number, y: number, direction) {
            super();

            this.position = { x: x, y: y };
            this.size = { w: Engine.World.metersToPixels(Bomb.BOMB_SIZE), h: Engine.World.metersToPixels(Bomb.BOMB_SIZE) };
            this._direction = direction;
        }

        public draw(context: CanvasRenderingContext2D, viewport: Engine.Viewport) {
            Bomb._images[this._direction].draw(context,
                Engine.World.metersToPixels(this.position.x) - this.size.w / 2 - viewport.topLeft.x,
                Engine.World.metersToPixels(this.position.y) - this.size.h / 2 - viewport.topLeft.y);
        }

        public static loadContent(): void {
            Bomb._images[Bomb.DIRECTION_LEFT] = new Engine.Image('bomb_left');
            Bomb._images[Bomb.DIRECTION_RIGHT] = new Engine.Image('bomb_right');
        }
    }
}
