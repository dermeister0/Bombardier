/// <reference path="../Engine/ObjectManager.ts" />
/// <reference path="Map.ts" />
/// <reference path="Player.ts" />
/// <reference path="../Engine/World.ts" />
/// <reference path="ContactListener.ts" />
/// <reference path="../Engine/Viewport.ts" />

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

        private _viewport: Engine.Viewport;

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

            this._map.draw(context2D, this._viewport);

            context2D.fillStyle = 'rgb(255, 0, 0)';
            context2D.fillRect(Engine.World.metersToPixels(this._player.position.x) - this._viewport.topLeft.x - Engine.World.metersToPixels(0.26),
                Engine.World.metersToPixels(this._player.position.y) - this._viewport.topLeft.y - Engine.World.metersToPixels(0.84),
                Engine.World.metersToPixels(0.26 * 2), Engine.World.metersToPixels(0.84) * 2);

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
            this._world.addContactListener(new ContactListener);

            this._map = new Map();
            this._map.load();

            this._player = new Player;
            this._gameObjects.push(this._player);

            this._viewport = new Engine.Viewport();
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
            this._viewport = null;

            this._canvasElement = <HTMLCanvasElement> document.getElementById("mainCanvas");
        }

        get objectManager() {
            return this._objectManager;
        }

        public update(gameTime: number) {
            for (var go in this._gameObjects) {
                var gameObject = <Bombardier.Engine.GameObject>(this._gameObjects[go]);

                gameObject.update();
            }

            this._world.update(gameTime);

            this._viewport.targetPosition = this._player.position;
            this._viewport.update();
        }

        get world() {
            return this._world;
        }
    }
}