module Bombardier.Entities {
    import b2Collision = Box2D.Collision;
    import b2Dynamics = Box2D.Dynamics;
    import b2Math = Box2D.Common.Math;

    export class Fireball extends Engine.GameObject {
        private static RADIUS: number = 0.25;

        private static IMPULSE: number = 50.0;

        private static LIFE_TIME: number = 100000; // 1 second.

        private static _shape: b2Collision.Shapes.b2CircleShape = null;

        private static _fixtureDef: b2Dynamics.b2FixtureDef = null;

        private static _sprite: Engine.Sprite = null;

        private _impulse: b2Math.b2Vec2;

        private _startTime: number;

        public static create(position: Engine.Vector2, direction: Engine.Vector2): Fireball {
            var fireball: Fireball = new Fireball(position, direction);

            Game.instance.addGameObject(fireball);

            return fireball;
        }

        constructor(position: Engine.Vector2, direction: Engine.Vector2) {
            super();

            this.position = position.clone();
            this.screenSize.w = 16;
            this.screenSize.h = 16;

            if (Fireball._sprite === null) {
                Fireball._sprite = new Engine.Sprite('fireball', new Engine.Size2(16, 16));
                Fireball._sprite.addFrame(0, 0);
            }

            if (Fireball._shape === null) {
                Fireball._shape = new b2Collision.Shapes.b2CircleShape(Fireball.RADIUS);
            }

            if (Fireball._fixtureDef === null) {
                Fireball._fixtureDef = new b2Dynamics.b2FixtureDef();
                Fireball._fixtureDef.density = 50.0; // 9.8 kg
                Fireball._fixtureDef.shape = Fireball._shape;
                Fireball._fixtureDef.filter.groupIndex = CollisionGroup.BULLET_AND_TURRET;
            }

            var bodyDef = new b2Dynamics.b2BodyDef();
            bodyDef.type = b2Dynamics.b2Body.b2_dynamicBody;
            bodyDef.bullet = true;
            bodyDef.position.Set(this.position.x, this.position.y);

            this.body = Bombardier.Entities.Game.instance.world.addRigidBody(bodyDef);
            var fixture = this.body.CreateFixture(Fireball._fixtureDef);

            var userData = new FixtureUserData(FixtureUserData.TYPE_BULLET);
            userData.object = this;
            fixture.SetUserData(userData);

            this._impulse = new b2Math.b2Vec2(Fireball.IMPULSE * direction.x, 0 * direction.y);
            this._startTime = Date.now();

            this.zIndex = 1;
        }

        public draw(context: CanvasRenderingContext2D, viewport: Engine.Viewport): void {
            Fireball._sprite.draw(context, Engine.World.metersToPixels(this.position.x) - this.screenSize.w / 2 - viewport.topLeft.x,
                Engine.World.metersToPixels(this.position.y) - this.screenSize.h / 2 - viewport.topLeft.y);
        }

        public update(): void {
            if (Date.now() - Fireball.LIFE_TIME >= this._startTime) {
                Game.instance.removeGameObject(this);
            }

            this.body.ApplyImpulse(this._impulse, this.body.GetWorldCenter());

            this.position = new Engine.Vector2(this.body.GetPosition().x, this.body.GetPosition().y);
        }

        public destroy(): void {
            Game.instance.world.destroyBody(this.body);
        }
    }
}
