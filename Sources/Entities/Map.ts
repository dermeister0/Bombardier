/// <reference path="../Engine/Image.ts" />

module Bombardier.Entities {
    export class Map {
        static WIDTH = 20;
        static HEIGHT = 20;

        static TILE_SIZE = 64;

        private cells: number[][];

        static TILE_CLEAR = 0;
        static TILE_BRICK = 1;

        private mapTiles: Bombardier.Engine.Image[] = [];

        constructor() {
            this.cells = [];

            this.mapTiles[Map.TILE_CLEAR] = new Bombardier.Engine.Image('tile_clear');
            this.mapTiles[Map.TILE_BRICK] = new Bombardier.Engine.Image('tile_brick');
        }

        load() {
            for (var y = 0; y < Map.HEIGHT; ++y) {
                this.cells[y] = [];

                for (var x = 0; x < Map.WIDTH; ++x) {
                    this.cells[y][x] = 0;
                }
            }

            this.cells[3][3] = 1;
            this.cells[1][1] = 1;
        }

        draw(context: CanvasRenderingContext2D) {
            for (var y = 0; y < Map.HEIGHT; ++y) {
                for (var x = 0; x < Map.WIDTH; ++x) {
                    this.mapTiles[this.cells[y][x]].draw(context, x * Map.TILE_SIZE, y * Map.TILE_SIZE);
                }
            }
        }
    }
}
