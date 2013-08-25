/// <reference path="../Engine/Sprite.ts" />
/// <reference path="../Engine/GameObject.ts" />
/// <reference path="Map.ts" />
/// <reference path="../Engine/Input.ts" />
/// <reference path="FixtureUserData.ts" />

module Bombardier.Entities {
    import b2Collision = Box2D.Collision;
    import b2Dynamics = Box2D.Dynamics;
    import b2Math = Box2D.Common.Math;

    export class Player extends Bombardier.Engine.GameObject {
        private _sprite: Bombardier.Engine.Sprite;

        private _playerBody: b2Dynamics.b2Body;

        private _footContacts: number = 0;

        private _jumpTimeout: number = 0;

        constructor() {
            super();

            this.position.x = Bombardier.Engine.World.pixelsToMeters(Map.TILE_SIZE + Map.TILE_SIZE / 2);
            this.position.y = Bombardier.Engine.World.pixelsToMeters(Map.TILE_SIZE + Map.TILE_SIZE / 2);
            
            this.size.w = Map.TILE_SIZE;
            this.size.h = Map.TILE_SIZE;

            this.mass = 69;

            this._sprite = new Bombardier.Engine.Sprite();
            this._sprite.addFrame('player');

            var bodyDef = new b2Dynamics.b2BodyDef();
            bodyDef.type = b2Dynamics.b2Body.b2_dynamicBody;
            bodyDef.position.Set(this.position.x, this.position.y);

            var fixtureDef = new b2Dynamics.b2FixtureDef();

            fixtureDef.density = 80; // For mass 69.888 kg.
            fixtureDef.friction = 1;
            fixtureDef.restitution = 0;

            var shape = new b2Collision.Shapes.b2PolygonShape();
            shape.SetAsBox(0.26, 0.84);
            fixtureDef.shape = shape;

            this._playerBody = Bombardier.Entities.Game.instance.world.addRigidBody(bodyDef);
            this._playerBody.SetFixedRotation(true);

            this._playerBody.CreateFixture(fixtureDef);

            var footFixtureDef = new b2Dynamics.b2FixtureDef();
            shape.SetAsOrientedBox(0.1, 0.1, new b2Math.b2Vec2(0, 0.84));
            footFixtureDef.shape = shape;
            footFixtureDef.isSensor = true;
            footFixtureDef.userData = new FixtureUserData;
            footFixtureDef.userData.type = FixtureUserData.TYPE_FOOT;
            footFixtureDef.userData.player = this;

            this._playerBody.CreateFixture(footFixtureDef);
        }

        public draw(context: CanvasRenderingContext2D) {
            this._sprite.draw(context, this.position.x - this.size.w / 2, this.position.y - this.size.h / 2);
        }

        public update() {
            this._jumpTimeout--;

            var velocity = this._playerBody.GetLinearVelocity();
            var angularVelocity = this._playerBody.GetAngularVelocity();
            var desiredVel = 0;

            // Jump.
            if (Bombardier.Engine.Input.IsKeyDown(Bombardier.Engine.Input.KEY_W) && this._footContacts > 0 && this._jumpTimeout <= 0) {
                this._playerBody.ApplyImpulse(new b2Math.b2Vec2(0, -7.5 * this._playerBody.GetMass()), this._playerBody.GetWorldCenter());
                this._jumpTimeout = 15;
            }

            // Right.
            if (Bombardier.Engine.Input.IsKeyDown(Bombardier.Engine.Input.KEY_D)) {
                desiredVel = 2;
            }

            // Left.
            if (Bombardier.Engine.Input.IsKeyDown(Bombardier.Engine.Input.KEY_A)) {
                desiredVel = -2;
            }

            if (desiredVel != 0) {
                var velChange = desiredVel - velocity.x;
                var impulse = this._playerBody.GetMass() * velChange;
                this._playerBody.ApplyImpulse(new b2Math.b2Vec2(impulse, 0), this._playerBody.GetWorldCenter());
            }
        }

        public increaseFootContacts() {
            this._footContacts++;
        }

        public decreaseFootContacts() {
            this._footContacts--;
        }
    }
}
