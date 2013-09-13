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

        public screenSize: Size2 = new Size2; // In pixels.

        public zIndex: number = 0;

        public body: Box2D.Dynamics.b2Body;

        constructor() {
        }

        public destroy(): void {
            throw new Error("Need to override.");
        }

        public draw(context: CanvasRenderingContext2D, viewport: Viewport): void {
        }

        public update(): void {
        }

        public getBoundingRect(): Rect {
            return Rect.createByCenterAndSize(this.position, this.screenSize);
        }
    }
}