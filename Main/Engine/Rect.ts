/// <reference path="Vector2.ts" />

module Bombardier.Engine {
    export class Rect {
        constructor(public left, public top, public right, public bottom) {
        }

        public static createByCenterAndSize(center: Vector2, size: Size2): Rect {
            return new Rect(center.x - size.w / 2, center.y - size.h / 2, center.x + size.w / 2, center.y + size.h / 2);
        }

        public intersects(otherRect: Rect): boolean {
            return (otherRect.left >= this.left && otherRect.left <= this.right && otherRect.top >= this.top && otherRect.top <= this.bottom) ||
                (otherRect.right >= this.left && otherRect.right <= this.right && otherRect.top >= this.top && otherRect.top <= this.bottom) ||
                (otherRect.right >= this.left && otherRect.right <= this.right && otherRect.bottom >= this.top && otherRect.bottom <= this.bottom) ||
                (otherRect.left >= this.left && otherRect.left <= this.right && otherRect.bottom >= this.top && otherRect.bottom <= this.bottom);
        }

        public pointInRect(point: Vector2): boolean {
            return (point.x >= this.left && point.x <= this.right && point.y >= this.top && point.y <= this.bottom);
        }

        public get width(): number {
            return this.right - this.left;
        }

        public get height(): number {
            return this.bottom - this.top;
        }
    }
}
