/// <reference path="../Engine/Image.ts" />
/// <reference path="../Libs/jquery.d.ts" />
/// <reference path="../Engine/Rect.ts" />
/// <reference path="Brick.ts" />
/// <reference path="../Engine/Viewport.ts" />

module Bombardier.Entities {
    import Engine = Bombardier.Engine;

    export class Map {
        static TILE_SIZE = 64;
        static TILE_HALF_SIZE = 32;

        private _cells: number[][];

        static TILE_CLEAR = 0;
        static TILE_BRICK = 1;

        private _mapTiles: Engine.Image[] = [];

        private _width: number;

        private _height: number;

        constructor() {
            this._cells = [];

            this._mapTiles[Map.TILE_CLEAR] = new Engine.Image('tile_clear');
            this._mapTiles[Map.TILE_BRICK] = new Engine.Image('tile_brick');
        }

        load() {
            var ajaxResponse = jQuery.ajax('MainService.svc/GetMap', {
                async: false,
                type: 'POST'
            });

            var map = jQuery.parseJSON(ajaxResponse.responseText);

            this._width = map.d.Width;
            this._height = map.d.Height;
            this._cells = map.d.Cells;

            for (var y = 0; y < this._height; ++y) {
                for (var x = 0; x < this._width; ++x) {
                    if (this._cells[y] == undefined || this._cells[y][x] == undefined) {
                        throw "Wrong level.";
                    }

                    if (this._cells[y][x] == Map.TILE_BRICK) {
                        var brickObject = new Brick(Bombardier.Engine.World.pixelsToMeters(x * Map.TILE_SIZE + Map.TILE_HALF_SIZE),
                            Bombardier.Engine.World.pixelsToMeters(y * Map.TILE_SIZE + Map.TILE_HALF_SIZE));
                    }
                }
            }
        }

        draw(context: CanvasRenderingContext2D, viewport: Engine.Viewport) {
            var mapBegin: Engine.Vector2 = { x: Math.floor(viewport.topLeft.x / Map.TILE_SIZE), y: Math.floor(viewport.topLeft.y / Map.TILE_SIZE) };
            var canvasBegin: Engine.Vector2 = {
                x: mapBegin.x * Map.TILE_SIZE - viewport.topLeft.x,
                y: mapBegin.y * Map.TILE_SIZE - viewport.topLeft.y
            };

            for (var y = mapBegin.y; y < this._height; ++y) {
                if (y < 0) {
                    continue;
                }

                for (var x = mapBegin.x; x < this._width; ++x) {
                    if (x < 0) {
                        continue;
                    }

                    var tile = this._mapTiles[this._cells[y][x]];
                    tile.draw(context, canvasBegin.x + (x - mapBegin.x) * Map.TILE_SIZE,
                         canvasBegin.y + (y - mapBegin.y) * Map.TILE_SIZE);
                }
            }
        }

        isClear(x: number, y: number) {
            if (x < 0 || y < 0 || x >= this._width || y >= this._height) {
                return false;
            }

            return this._cells[y][x] == Map.TILE_CLEAR;
        }

        getCellRect(x: number, y: number): Bombardier.Engine.Rect {
            return new Bombardier.Engine.Rect(x * Map.TILE_SIZE, y * Map.TILE_SIZE, (x + 1) * Map.TILE_SIZE, (y + 1) * Map.TILE_SIZE);
        }
    }
}
