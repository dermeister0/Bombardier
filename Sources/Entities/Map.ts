/// <reference path="../Engine/Image.ts" />
/// <reference path="../Libs/jquery.d.ts" />

module Bombardier.Entities {
    import Engine = Bombardier.Engine;

    export class Map {
        static WIDTH = 20;
        static HEIGHT = 20;

        static TILE_SIZE = 64;

        private _cells: number[][];

        static TILE_CLEAR = 0;
        static TILE_BRICK = 1;

        private _mapTiles: Engine.Image[] = [];

        constructor() {
            this._cells = [];

            this._mapTiles[Map.TILE_CLEAR] = new Engine.Image('tile_clear');
            this._mapTiles[Map.TILE_BRICK] = new Engine.Image('tile_brick');
        }

        load() {
            for (var y = 0; y < Map.HEIGHT; ++y) {
                this._cells[y] = [];

                for (var x = 0; x < Map.WIDTH; ++x) {
                    this._cells[y][x] = 0;
                }
            }

            this._cells[3][3] = 1;
            this._cells[1][1] = 1;

            var ajaxResponse = jQuery.ajax('../MainService.svc/GetMap', {
                async: false,
                type: 'POST'
            });

            var map = jQuery.parseJSON(ajaxResponse.responseText);

            this._cells = map.d.Cells;

            for (var y = 0; y < Map.HEIGHT; ++y) {
                for (var x = 0; x < Map.WIDTH; ++x) {
                    if (this._cells[y] == undefined || this._cells[y][x] == undefined) {
                        throw "Wrong level.";
                    }
                }
            }
        }

        draw(context: CanvasRenderingContext2D) {
            for (var y = 0; y < Map.HEIGHT; ++y) {
                for (var x = 0; x < Map.WIDTH; ++x) {
                    var tile = this._mapTiles[this._cells[y][x]];
                    tile.draw(context, x * Map.TILE_SIZE, y * Map.TILE_SIZE);
                }
            }
        }
    }
}
