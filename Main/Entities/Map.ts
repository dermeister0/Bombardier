/// <reference path="../Engine/Image.ts" />
/// <reference path="../Libs/jquery.d.ts" />
/// <reference path="../Engine/Rect.ts" />
/// <reference path="Brick.ts" />

module Bombardier.Entities {
    import Engine = Bombardier.Engine;

    export class Map {
        static WIDTH = 20;
        static HEIGHT = 20;

        static TILE_SIZE = 64;
        static TILE_HALF_SIZE = 32;

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

            var ajaxResponse = jQuery.ajax('MainService.svc/GetMap', {
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

                    if (this._cells[y][x] == Map.TILE_BRICK) {
                        var brickObject = new Brick(x * Map.TILE_SIZE + Map.TILE_HALF_SIZE, y * Map.TILE_SIZE + Map.TILE_HALF_SIZE);
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

        isClear(x: number, y: number) {
            if (x < 0 || y < 0 || x >= Map.WIDTH || y >= Map.HEIGHT) {
                return false;
            }

            return this._cells[y][x] == Map.TILE_CLEAR;
        }

        getCellRect(x: number, y: number): Bombardier.Engine.Rect {
            return new Bombardier.Engine.Rect(x * Map.TILE_SIZE, y * Map.TILE_SIZE, (x + 1) * Map.TILE_SIZE, (y + 1) * Map.TILE_SIZE);
        }
    }
}
