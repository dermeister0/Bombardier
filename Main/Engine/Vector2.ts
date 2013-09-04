module Bombardier.Engine {
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
    }
}
