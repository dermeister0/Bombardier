/// <reference path="Vector2.ts" />

module Bombardier.Engine {
    export class Viewport {
        _position: Vector2 = new Vector2();

        _targetPosition: Vector2;

        static VIEWPORT_WIDTH: number = 800;

        static VIEWPORT_HEIGHT: number = 600;

        _halfSize: Size2;

        constructor() {
            this._halfSize = { w: Viewport.VIEWPORT_WIDTH / 2, h: Viewport.VIEWPORT_HEIGHT / 2 };
        }

        public get topLeft(): Vector2 {
            return {
                x: World.metersToPixels(this._position.x) - this._halfSize.w,
                y: World.metersToPixels(this._position.y) - this._halfSize.h
            };
        }

        public set targetPosition(value: Vector2) {
            this._targetPosition = value;
        }

        public update() {
            this._position = {
                x: this._position.x + (this._targetPosition.x - this._position.x) / 10,
                y: this._position.y + (this._targetPosition.y - this._position.y) / 10
            };
        }
    }
}
