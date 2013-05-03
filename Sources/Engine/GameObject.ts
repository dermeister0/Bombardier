/// <reference path="Vector2.ts" />
/// <reference path="Size2.ts" />
/// <reference path="IDrawable.ts" />
/// <reference path="Rect.ts" />

module Bombardier.Engine {
    export class GameObject implements IDrawable {
        public mass: number = 0;
        public position: Vector2 = new Vector2;
        public velocity: Vector2 = new Vector2;
        public size: Size2 = new Size2;

        constructor() {
        }

        public draw(context: CanvasRenderingContext2D) {
        }

        public update() {
        }

        public getBoundingRect(): Rect {
            return Rect.createByCenterAndSize(this.position, this.size);
        }
    }
}