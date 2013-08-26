/// <reference path="Vector2.ts" />

module Bombardier.Engine {
    export class Viewport {
        _position: Vector2;
        _targetPosition: Vector2;

        constructor() {
        }

        public get topLeft(): Vector2 {
            return null;
        }

        public set targetPosition(value: Vector2) {
            this._targetPosition = value;
        }
    }
}
