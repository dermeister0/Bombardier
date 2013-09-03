/// <reference path="../Engine/ObjectManager.ts" />
/// <reference path="Map.ts" />
/// <reference path="Player.ts" />
/// <reference path="../Engine/World.ts" />
/// <reference path="ContactListener.ts" />
/// <reference path="../Engine/Viewport.ts" />
/// <reference path="../Global.ts" />

module Bombardier.Entities {
    export class Game {
        private _canvasElement: HTMLCanvasElement;

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

        public getName(): string {
            return "Bombardier";
        }

        public draw(gameTime: number): void {
            var context2D: CanvasRenderingContext2D;

            context2D = this._canvasElement.getContext('2d');

            context2D.fillStyle = 'rgb(0, 0, 0)';
            context2D.fillRect(0, 0, 800, 600);

            this._map.draw(context2D, this._viewport);

            for (var go in this._gameObjects) {
                var gameObject = <Bombardier.Engine.GameObject>(this._gameObjects[go]);
                gameObject.draw(context2D, this._viewport);
            }

            this._world.draw(context2D);

            if (Global.DEBUG_VIEWPORT_DRAW_INTERNAL_RECT) {
                context2D.strokeStyle = "#ff0000";
                context2D.strokeRect(this._viewport.internalRect.left - this._viewport.topLeft.x,
                    this._viewport.internalRect.top - this._viewport.topLeft.y,
                    this._viewport._internalHalfSize.w * 2, this._viewport._internalHalfSize.h * 2);
            }

            this.drawHud(context2D);
        }

        public loadContent(): void {
            this.objectManager.loadImage('tile_clear', 'Images/Clear.png');
            this.objectManager.loadImage('tile_brick', 'Images/Bricks00.png');
            this.objectManager.loadImage('tile_stone', 'Images/Stones00.png');

            this.objectManager.loadImage('player', 'Images/Player00.png');

            this.objectManager.loadImage('bomb_left', 'Images/BombLeft.png');
            this.objectManager.loadImage('bomb_right', 'Images/BombRight.png');

            Bomb.loadContent();
        }

        public start(): void {
            this._world = new Engine.World();
            this._world.addContactListener(new ContactListener);

            this._map = new Map();
            this._map.load();

            this._player = new Player;
            this._gameObjects.push(this._player);

            this._viewport = new Engine.Viewport();
        }

        public static get instance(): Game {
            if (Game._instance == null) {
                Game._instance = new Game();
            }

            return Game._instance;
        }

        private reset(): void {
            this._canvasElement = null;
            this._map = null;
            this._world = null;
            this._viewport = null;

            this._canvasElement = <HTMLCanvasElement> document.getElementById("mainCanvas");
        }

        public get objectManager(): Engine.ObjectManager {
            return this._objectManager;
        }

        public update(gameTime: number): void {
            for (var go in this._gameObjects) {
                var gameObject = <Bombardier.Engine.GameObject>(this._gameObjects[go]);

                gameObject.update();
            }

            this._world.update(gameTime);

            this._viewport.update(this._player.position, this._player.velocity);

            Engine.Input.update();
        }

        public get world(): Engine.World {
            return this._world;
        }

        public addGameObject(gameObject: Engine.GameObject): void {
            this._gameObjects.push(gameObject);
        }

        private drawHud(context: CanvasRenderingContext2D): void {
            context.fillStyle = '#ffffff';
            context.font = '12pt monospace';
            context.fillText('Bombs: ' + this._player.bombsCount.toString(), 10, 20);
        }

        public removeGameObject(gameObject: Engine.GameObject): void {
            var index: number = this._gameObjects.indexOf(gameObject);

            if (index != -1) {
                gameObject.destroy();
                this._gameObjects.splice(index, 1);
            }
        }
    }
}
