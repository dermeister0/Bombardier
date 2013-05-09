/// <reference path="../Libs/box2dweb-min.d.ts" />
/// <reference path="GameObject.ts" />

module Bombardier.Engine {
    import b2Dynamics = Box2D.Dynamics;
    import b2Math = Box2D.Common.Math;
    import b2Collision = Box2D.Collision;

    export class World {
        private _b2dWorld: b2Dynamics.b2World;

        private _gameObjects: Engine.GameObject[] = [];

        private _b2dDebugDraw: b2Dynamics.b2DebugDraw;

        constructor() {
            var debugCanvas = <HTMLCanvasElement> document.getElementById('debugCanvas');
            this._b2dDebugDraw = new b2Dynamics.b2DebugDraw();          
            this._b2dDebugDraw.SetSprite(debugCanvas.getContext('2d'));
            this._b2dDebugDraw.SetFillAlpha(0.3);
            this._b2dDebugDraw.SetFlags(b2Dynamics.b2DebugDraw.e_shapeBit | b2Dynamics.b2DebugDraw.e_jointBit);

            this._b2dWorld = new b2Dynamics.b2World(new b2Math.b2Vec2(0, 1), true);
            this._b2dWorld.SetDebugDraw(this._b2dDebugDraw);

            var bodyDef = new b2Dynamics.b2BodyDef();
            bodyDef.type = b2Dynamics.b2Body.b2_dynamicBody;
            bodyDef.position.Set(100, 100);
            
            var fixtureDef = new b2Dynamics.b2FixtureDef();

            fixtureDef.density = 1.0;
            fixtureDef.friction = 0.5;
            fixtureDef.restitution = 0.2;

            fixtureDef.shape = new b2Collision.Shapes.b2CircleShape(5);

            this._b2dWorld.CreateBody(bodyDef).CreateFixture(fixtureDef);

            bodyDef = new b2Dynamics.b2BodyDef();
            bodyDef.type = b2Dynamics.b2Body.b2_staticBody;
            bodyDef.position.Set(150, 100);

            var shape = new b2Collision.Shapes.b2PolygonShape;
            shape.SetAsBox(5, 5);
            fixtureDef.shape = shape;

            this._b2dWorld.CreateBody(bodyDef).CreateFixture(fixtureDef);
        }

        update(timeStep) {
            this._b2dWorld.Step(timeStep, 10, 10);
        }

        public draw(context: CanvasRenderingContext2D) {
            var body = this._b2dWorld.GetBodyList();

            while (body != null) {
                // @@

                body = body.GetNext();
            }

            this._b2dWorld.DrawDebugData();
        }

        public addRigidBody(bodyDef: b2Dynamics.b2BodyDef): b2Dynamics.b2Body {
            return this._b2dWorld.CreateBody(bodyDef);
        }
    }
}
