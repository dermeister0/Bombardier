module Bombardier.Engine {
    import b2Math = Box2D.Common.Math;

    export class Vector2 {
        x: number;
        y: number;

        constructor(x?: number, y?: number) {
            if (x !== undefined) {
                this.x = x;
            }
            else {
                this.x = 0;
            }

            if (y !== undefined) {
                this.y = y;
            }
            else {
                this.y = 0;
            }
        }

        public clone(): Vector2 {
            return new Vector2(this.x, this.y);
        }

        public static fromB2Vec2(other: b2Math.b2Vec2): Vector2 {
            return new Vector2(other.x, other.y);
        }
    }
}
