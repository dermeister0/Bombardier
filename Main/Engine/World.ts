/// <reference path="../Libs/box2dweb-min.d.ts" />
/// <reference path="GameObject.ts" />

module Bombardier.Engine {
    import b2Dynamics = Box2D.Dynamics;
    import b2Math = Box2D.Common.Math;

    export class World {
        private _b2dWorld: b2Dynamics.b2World;

        private _gameObjects: Engine.GameObject[] = [];

        constructor() {
            this._b2dWorld = new b2Dynamics.b2World(new b2Math.b2Vec2(0, 10), true);
        }

        update(timeStep) {
            this._b2dWorld.Step(timeStep, 10, 10);
        }

        public draw(context: CanvasRenderingContext2D) {
            var body = this._b2dWorld.GetBodyList();

            while (body != null) {
                body = body.GetNext();
            }
        }
    }
}
