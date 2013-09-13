/// <reference path="../Libs/box2dweb.d.ts" />
/// <reference path="GameObject.ts" />

module Bombardier.Engine {
    import b2Dynamics = Box2D.Dynamics;
    import b2Math = Box2D.Common.Math;
    import b2Collision = Box2D.Collision;

    export class World {
        public static GRAVITY: number = 9.8;

        private _b2dWorld: b2Dynamics.b2World;

        private _b2dDebugDraw: b2Dynamics.b2DebugDraw;

        private _bodiesToDestroy: b2Dynamics.b2Body[] = [];

        constructor() {
            var debugCanvas = <HTMLCanvasElement> document.getElementById('debugCanvas');
            this._b2dDebugDraw = new b2Dynamics.b2DebugDraw();          
            this._b2dDebugDraw.SetSprite(debugCanvas.getContext('2d'));
            this._b2dDebugDraw.SetDrawScale(32.0);
            this._b2dDebugDraw.SetFillAlpha(0.3);
            this._b2dDebugDraw.SetFlags(b2Dynamics.b2DebugDraw.e_shapeBit | b2Dynamics.b2DebugDraw.e_jointBit);

            this._b2dWorld = new b2Dynamics.b2World(new b2Math.b2Vec2(0, World.GRAVITY), true);
            this._b2dWorld.SetDebugDraw(this._b2dDebugDraw);
        }

        update(timeStep) {
            this._b2dWorld.Step(timeStep / 1000, 10, 10);
            this._b2dWorld.ClearForces();

            for (var i in this._bodiesToDestroy) {
                this._b2dWorld.DestroyBody(this._bodiesToDestroy[i]);
            }
            this._bodiesToDestroy = [];
        }

        public draw(context: CanvasRenderingContext2D) {
            var body = this._b2dWorld.GetBodyList();

            while (body != null) {
                // @@

                body = body.GetNext();
            }

            //this._b2dWorld.DrawDebugData();
        }

        public addRigidBody(bodyDef: b2Dynamics.b2BodyDef): Box2D.Dynamics.b2Body {
            return this._b2dWorld.CreateBody(bodyDef);
        }

        public static metersToPixels(value: number) {
            return value * 32;
        }

        public static pixelsToMeters(value: number) {
            return value / 32;
        }

        public addContactListener(listener: b2Dynamics.b2ContactListener) {
            this._b2dWorld.SetContactListener(listener);
        }

        public get physicsWorld(): b2Dynamics.b2World {
            return this._b2dWorld;
        }

        public destroyBody(body: b2Dynamics.b2Body): void {
            this._bodiesToDestroy.push(body);
        }
    }
}
