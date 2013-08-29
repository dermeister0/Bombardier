/// <reference path="../Engine/GameObject.ts" />
/// <reference path="../Engine/Viewport.ts" />

module Bombardier.Entities {
    import b2Collision = Box2D.Collision;
    import b2Dynamics = Box2D.Dynamics;

    export class Bomb extends Bombardier.Engine.GameObject {
        private static _bombShape: b2Collision.Shapes.b2CircleShape;
        private static _bombFixtureDef: b2Dynamics.b2FixtureDef;

        static BOMB_SIZE: number = 1;

        constructor(x: number, y: number) {
            super();

            this.position = { x: x, y: y };
            this.size = { w: Engine.World.metersToPixels(Bomb.BOMB_SIZE), h: Engine.World.metersToPixels(Bomb.BOMB_SIZE) };
        }

        public draw(context: CanvasRenderingContext2D, viewport: Engine.Viewport) {
            context.fillStyle = '#ff6600';
            context.fillRect(Engine.World.metersToPixels(this.position.x) - this.size.w / 2 - viewport.topLeft.x,
                Engine.World.metersToPixels(this.position.y) - this.size.h / 2 - viewport.topLeft.y,
                this.size.w, this.size.h);
        }
    }
}
