/// <reference path="../Engine/Sprite.ts" />
/// <reference path="../Engine/GameObject.ts" />
/// <reference path="Map.ts" />
/// <reference path="../Engine/Input.ts" />

module Bombardier.Entities {
    import b2Collision = Box2D.Collision;
    import b2Dynamics = Box2D.Dynamics;
    import b2Math = Box2D.Common.Math;

    export class Player extends Bombardier.Engine.GameObject {
        private _sprite: Bombardier.Engine.Sprite;

        private _playerBody: b2Dynamics.b2Body;

        constructor() {
            super();

            this.position.x = Map.TILE_SIZE / 2;
            this.position.y = Map.TILE_SIZE / 2;
            
            this.size.w = Map.TILE_SIZE;
            this.size.h = Map.TILE_SIZE;

            this.mass = 69;

            this._sprite = new Bombardier.Engine.Sprite();
            this._sprite.addFrame('player');

            var bodyDef = new b2Dynamics.b2BodyDef();
            bodyDef.type = b2Dynamics.b2Body.b2_dynamicBody;
            bodyDef.position.Set(1, 1);

            var fixtureDef = new b2Dynamics.b2FixtureDef();

            fixtureDef.density = 1.0;
            fixtureDef.friction = 0.5;
            fixtureDef.restitution = 0;

            var shape = new b2Collision.Shapes.b2PolygonShape();
            shape.SetAsBox(0.26, 0.84);
            fixtureDef.shape = shape;

            this._playerBody = Bombardier.Entities.Game.instance.world.addRigidBody(bodyDef);
            this._playerBody.CreateFixture(fixtureDef);

            var footFixtureDef = new b2Dynamics.b2FixtureDef();
            shape.SetAsOrientedBox(0.1, 0.1, new b2Math.b2Vec2(0, 0.84));
            footFixtureDef.shape = shape;
            footFixtureDef.isSensor = true;

            this._playerBody.CreateFixture(footFixtureDef);
        }

        public draw(context: CanvasRenderingContext2D) {
            this._sprite.draw(context, this.position.x - this.size.w / 2, this.position.y - this.size.h / 2);
        }

        public update() {
            if (Bombardier.Engine.Input.IsKeyDown(Bombardier.Engine.Input.KEY_W)) {
                this._playerBody.ApplyForce(new b2Math.b2Vec2(0, -120), this._playerBody.GetWorldCenter());
            }
        }
    }
}
