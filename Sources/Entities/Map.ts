module Bombardier.Entities {
    export class Map {
        static WIDTH = 20;
        static HEIGHT = 20;

        private cells: number[][];

        constructor() {
            this.cells = [];
        }

        load() {
            for (var y = 0; y < Map.HEIGHT; ++y) {
                this.cells[y] = [];

                for (var x = 0; x < Map.WIDTH; ++x) {
                    this.cells[y][x] = 0;
                }
            }

            this.cells[3][3] = 1;
        }

        draw() {
        }
    }
}
