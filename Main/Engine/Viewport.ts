/// <reference path="Vector2.ts" />

module Bombardier.Engine {
    export class Viewport {
        _position: Vector2 = new Vector2();

        _targetPosition: Vector2 = new Vector2();

        static VIEWPORT_WIDTH: number = 800;

        static VIEWPORT_HEIGHT: number = 600;

        _halfSize: Size2;

        _internalHalfSize: Size2;

        _lookForward: number;

        constructor() {
            this._halfSize = { w: Viewport.VIEWPORT_WIDTH / 2, h: Viewport.VIEWPORT_HEIGHT / 2 };
            this._internalHalfSize = { w: this._halfSize.w * 0.7, h: this._halfSize.h * 0.7 };
            this._lookForward = this._internalHalfSize.w * 0.75;
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

        public update(newTargetPosition: Vector2, newTargetVelocity: Vector2) {
            var newTargetPosition2 = { x: World.metersToPixels(newTargetPosition.x), y: World.metersToPixels(newTargetPosition.y) };

            if (newTargetVelocity.x > 0) {
                newTargetPosition2.x += this._lookForward;
            }
            else if (newTargetVelocity.x < 0) {
                newTargetPosition2.x -= this._lookForward;
            }

            var internalRect = this.internalRect;

            if (!internalRect.pointInRect(newTargetPosition2)) {
                if (newTargetPosition2.x < internalRect.left) {
                    this._targetPosition.x = World.pixelsToMeters(newTargetPosition2.x + this._internalHalfSize.w);
                }
                else if (newTargetPosition2.x > internalRect.right) {
                    this._targetPosition.x = World.pixelsToMeters(newTargetPosition2.x - this._internalHalfSize.w);
                }

                if (newTargetPosition2.y < internalRect.top) {
                    this._targetPosition.y = World.pixelsToMeters(newTargetPosition2.y);
                }
                else if (newTargetPosition2.y > internalRect.bottom) {
                    this._targetPosition.y = World.pixelsToMeters(newTargetPosition2.y);
                }
            }

            this._position = {
                x: this._position.x + (this._targetPosition.x - this._position.x) / 10,
                y: this._position.y + (this._targetPosition.y - this._position.y) / 30
            };
        }

        public get center(): Vector2 {
            return {
                x: World.metersToPixels(this._position.x),
                y: World.metersToPixels(this._position.y)
            };
        }

        public get internalRect(): Rect {
            var center: Vector2 = this.center;

            return new Rect(center.x - this._internalHalfSize.w, center.y - this._internalHalfSize.h,
                center.x + this._internalHalfSize.w, center.y + this._internalHalfSize.h);
        }
    }
}
