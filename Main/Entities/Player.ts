/// <reference path="../Engine/Sprite.ts" />
/// <reference path="../Engine/GameObject.ts" />
/// <reference path="Map.ts" />
/// <reference path="../Engine/Input.ts" />
/// <reference path="FixtureUserData.ts" />
/// <reference path="Bomb.ts" />
/// <reference path="../Engine/Debug.ts" />

module Bombardier.Entities {
    import b2Collision = Box2D.Collision;
    import b2Dynamics = Box2D.Dynamics;
    import b2Math = Box2D.Common.Math;

    export class Player extends Bombardier.Engine.GameObject {
        private _sprite: Bombardier.Engine.Sprite;

        private _playerBody: b2Dynamics.b2Body;

        private _footContacts: number = 0;

        private _bodyLeftContacts: number = 0;

        private _bodyWallContacts: number[] = [];

        private _jumpTimeout: number = 0;

        private _maxVelocity: number = Global.UNIT_INITIAL_VELOCITY;

        private _bombsCount: number = 0;

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

            this.createSensors();

            this._bombsCount = 10;
        }

        public draw(context: CanvasRenderingContext2D, viewport: Engine.Viewport) {
            this._sprite.draw(context, Engine.World.metersToPixels(this.position.x) - this.size.w / 2 - viewport.topLeft.x,
                Engine.World.metersToPixels(this.position.y) - this.size.h / 2 - viewport.topLeft.y);

            if (Global.DEBUG_PLAYER_DRAW_CONTACTS) {
                Engine.Debug.drawContacts(this._playerBody.GetContactList(), context, viewport);
            }
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
            if (Bombardier.Engine.Input.IsKeyDown(Bombardier.Engine.Input.KEY_D) && this._bodyWallContacts[FixtureUserData.TYPE_BODY_RIGHT] == 0) {
                desiredVel = this._maxVelocity;
            }

            // Left.
            if (Bombardier.Engine.Input.IsKeyDown(Bombardier.Engine.Input.KEY_A) && this._bodyWallContacts[FixtureUserData.TYPE_BODY_LEFT] == 0) {
                desiredVel = -this._maxVelocity;
            }

            // Put bomb.
            if (Bombardier.Engine.Input.IsKeyPressed(Bombardier.Engine.Input.KEY_SHIFT)) {
                this.tryToPutBomb();
            }

            if (desiredVel != 0) {
                var velChange = desiredVel - velocity.x;
                var impulse = this._playerBody.GetMass() * velChange;
                this._playerBody.ApplyImpulse(new b2Math.b2Vec2(impulse, 0), this._playerBody.GetWorldCenter());
            }

            this.position = { x: this._playerBody.GetPosition().x, y: this._playerBody.GetPosition().y };
        }

        public increaseFootContacts() {
            this._footContacts++;
        }

        public decreaseFootContacts() {
            this._footContacts--;
        }

        public increaseBodyWallContacts(bodyFixtureType: number) {
            this._bodyWallContacts[bodyFixtureType]++;
        }

        public decreaseBodyWallContacts(bodyFixtureType: number) {
            this._bodyWallContacts[bodyFixtureType]--;
        }

        createSensors() {
            var shape = new b2Collision.Shapes.b2PolygonShape();

            var footFixtureDef = new b2Dynamics.b2FixtureDef();
            shape.SetAsOrientedBox(0.1, 0.1, new b2Math.b2Vec2(0, 0.84));
            footFixtureDef.shape = shape;
            footFixtureDef.isSensor = true;
            footFixtureDef.userData = new FixtureUserData;
            footFixtureDef.userData.type = FixtureUserData.TYPE_FOOT;
            footFixtureDef.userData.player = this;

            this._playerBody.CreateFixture(footFixtureDef);

            var leftFixtureDef = new b2Dynamics.b2FixtureDef();
            shape.SetAsOrientedBox(0.1, 0.80, new b2Math.b2Vec2(-0.13 - 0.1, 0));
            leftFixtureDef.shape = shape;
            leftFixtureDef.isSensor = true;
            leftFixtureDef.userData = new FixtureUserData;
            leftFixtureDef.userData.type = FixtureUserData.TYPE_BODY_LEFT;
            leftFixtureDef.userData.player = this;

            this._playerBody.CreateFixture(leftFixtureDef);

            var rightFixtureDef = new b2Dynamics.b2FixtureDef();
            shape.SetAsOrientedBox(0.1, 0.80, new b2Math.b2Vec2(0.13 + 0.1, 0));
            rightFixtureDef.shape = shape;
            rightFixtureDef.isSensor = true;
            rightFixtureDef.userData = new FixtureUserData;
            rightFixtureDef.userData.type = FixtureUserData.TYPE_BODY_RIGHT;
            rightFixtureDef.userData.player = this;

            this._playerBody.CreateFixture(rightFixtureDef);

            this._bodyWallContacts[FixtureUserData.TYPE_BODY_LEFT] = 0;
            this._bodyWallContacts[FixtureUserData.TYPE_BODY_RIGHT] = 0;
        }

        public get isOnGround(): boolean {
            return this._footContacts > 0;
        }

        public get velocity(): Engine.Vector2 {
            return this._playerBody.GetLinearVelocity();
        }

        private tryToPutBomb(): void {
            if (this._bombsCount == 0 || !this.isOnGround) {
                return;
            }

            var bomb: Bomb;
            if (this._bodyWallContacts[FixtureUserData.TYPE_BODY_RIGHT] > 0) {
                bomb = new Bomb((Math.floor(this.position.x / Map.TILE_SIZE_IN_METERS) + 1) * Map.TILE_SIZE_IN_METERS - Bomb.BOMB_HALF_SIZE,
                    this.position.y, Bomb.DIRECTION_RIGHT);
            }
            else if (this._bodyWallContacts[FixtureUserData.TYPE_BODY_LEFT] > 0) {
                bomb = new Bomb((Math.floor(this.position.x / Map.TILE_SIZE_IN_METERS)) * Map.TILE_SIZE_IN_METERS + Bomb.BOMB_HALF_SIZE,
                    this.position.y, Bomb.DIRECTION_LEFT);
            }
            else {
                return;
            }

            this._bombsCount--;
            Game.instance.addGameObject(bomb);
        }

        public get bombsCount(): number {
            return this._bombsCount;
        }

        public destroy(): void {
            Game.instance.world.destroyBody(this._playerBody);
        }
    }
}
