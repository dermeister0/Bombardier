module Bombardier.Engine {
    export class Size2 {
        w: number;
        h: number;

        constructor(width?: number, height?: number) {
            if (width != undefined) {
                this.w = width;
            } else {
                this.w = 0;
            }

            if (height != undefined) {
                this.h = height;
            } else {
                this.h = 0;
            }
        }
    }
}
