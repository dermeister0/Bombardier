/// <reference path="../Engine/ObjectManager.ts" />
/// <reference path="Map.ts" />
/// <reference path="Player.ts" />
/// <reference path="../Engine/World.ts" />

module Bombardier.Entities {
    export class Game {
        private _canvasElement: HTMLCanvasElement;

        private _i: number = 0;

        private _objectManager = new Engine.ObjectManager();

        private _map: Map;

        private static _instance: Game;

        private _player: Player;

        private _gameObjects: Engine.GameObject[] = [];

        static GRAVITY: number = 0.003;

        private _world: Engine.World;

        constructor() {
            this.reset();
        }

        getName(): string {
            return "Bombardier";
        }

        draw(gameTime: number) {
            var context2D: CanvasRenderingContext2D;

            context2D = this._canvasElement.getContext('2d');

            context2D.fillStyle = 'rgb(0, 0, 0)';
            context2D.fillRect(0, 0, 800, 600);

            this._map.draw(context2D);

            context2D.fillStyle = 'rgb(255, 0, 0)';
            context2D.fillRect(this._i * 10, 10, 10, 20);

            this._i++;

            for (var go in this._gameObjects) {
                var gameObject = <Bombardier.Engine.GameObject>(this._gameObjects[go]);
                gameObject.draw(context2D);
            }

            this._world.draw(context2D);
        }

        loadContent() {
            this.objectManager.loadImage('tile_clear', 'Images/Clear.png');
            this.objectManager.loadImage('tile_brick', 'Images/Bricks00.png');

            this.objectManager.loadImage('player', 'Images/Player00.png');
        }

        start() {
            this._world = new Engine.World();
            this._map = new Map();
            this._map.load();

            this._player = new Player;
            this._gameObjects.push(this._player);
        }

        static get instance() {
            if (Game._instance == null) {
                Game._instance = new Game();
            }

            return Game._instance;
        }

        private reset() {
            this._canvasElement = null;
            this._map = null;
            this._world = null;

            this._canvasElement = <HTMLCanvasElement> document.getElementById("mainCanvas");
        }

        get objectManager() {
            return this._objectManager;
        }

        public update(gameTime: number) {
            return; // @@

            for (var go in this._gameObjects) {
                var gameObject = <Bombardier.Engine.GameObject>(this._gameObjects[go]);

                gameObject.velocity.y += Game.GRAVITY * gameTime;

                gameObject.position.x += gameObject.velocity.x * gameTime;
                gameObject.position.y += gameObject.velocity.y * gameTime;

                var currentCell = { x: Math.floor(gameObject.position.x / Map.TILE_SIZE), y: Math.floor(gameObject.position.y / Map.TILE_SIZE) };
                var boundingRect = gameObject.getBoundingRect();

                // @@
                for (var my = currentCell.y; my < currentCell.y + 2; ++my) {
                    if (!this._map.isClear(currentCell.x, my) && this._map.getCellRect(currentCell.x, my).intersects(boundingRect)) {
                        if (gameObject.velocity.y > 0) {
                            gameObject.position.y = (my - 1) * Map.TILE_SIZE + gameObject.size.h / 2;
                        }
                        else {
                            gameObject.position.y = (my + 1) * Map.TILE_SIZE + gameObject.size.h / 2;
                        }
                        gameObject.velocity.y = 0;
                    }
                }

                gameObject.update();
            }

            this._world.update(gameTime);
        }

        get world() {
            return this._world;
        }
    }
}