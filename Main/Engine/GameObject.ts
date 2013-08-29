/// <reference path="Vector2.ts" />
/// <reference path="Size2.ts" />
/// <reference path="IDrawable.ts" />
/// <reference path="Rect.ts" />
/// <reference path="../Libs/box2dweb.d.ts" />
/// <reference path="Viewport.ts" />

module Bombardier.Engine {
    export class GameObject {
        public mass: number = 0;
        public position: Vector2 = new Vector2;
        public velocity: Vector2 = new Vector2;
        public size: Size2 = new Size2;

        public body: Box2D.Dynamics.b2Body;

        constructor() {
        }

        public draw(context: CanvasRenderingContext2D, viewport: Viewport) {
        }

        public update() {
        }

        public getBoundingRect(): Rect {
            return Rect.createByCenterAndSize(this.position, this.size);
        }
    }
}