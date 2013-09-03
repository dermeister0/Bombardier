/// <reference path="../Engine/GameObject.ts" />
/// <reference path="../Engine/Viewport.ts" />
/// <reference path="../Engine/Debug.ts" />

module Bombardier.Entities {
    import b2Collision = Box2D.Collision;
    import b2Dynamics = Box2D.Dynamics;

    export class Bomb extends Bombardier.Engine.GameObject {
        static BOMB_SIZE: number = 0.5;
        static BOMB_HALF_SIZE: number = Bomb.BOMB_SIZE / 2;
        static BOMB_SENSOR_RADIUS: number = 0.75;

        static DIRECTION_LEFT: number = 0;
        static DIRECTION_RIGHT: number = 1;

        static BOMB_LIFE_TIME: number = 3000;

        private static _images: Engine.Image[] = [];

        private _direction: number;

        private _startTime: number;

        private static _bombShape: b2Collision.Shapes.b2CircleShape;

        private static _bombFixtureDef: b2Dynamics.b2FixtureDef;

        constructor(x: number, y: number, direction) {
            super();

            this.position = { x: x, y: y };
            this.size = { w: Engine.World.metersToPixels(Bomb.BOMB_SIZE), h: Engine.World.metersToPixels(Bomb.BOMB_SIZE) };
            this._direction = direction;
            this._startTime = Date.now();

            if (Bomb._bombShape == null) {
                Bomb._bombShape = new b2Collision.Shapes.b2CircleShape();
                Bomb._bombShape.SetRadius(Bomb.BOMB_SENSOR_RADIUS);
            }

            if (Bomb._bombFixtureDef == null) {
                Bomb._bombFixtureDef = new b2Dynamics.b2FixtureDef();
                Bomb._bombFixtureDef.density = 0.0;
                Bomb._bombFixtureDef.friction = 0.0;
                Bomb._bombFixtureDef.restitution = 0.0;
                Bomb._bombFixtureDef.shape = Bomb._bombShape;
                Bomb._bombFixtureDef.isSensor = true;
            }

            var bodyDef = new b2Dynamics.b2BodyDef();
            bodyDef.type = b2Dynamics.b2Body.b2_staticBody;
            bodyDef.position.Set(x, y);

            this.body = Bombardier.Entities.Game.instance.world.addRigidBody(bodyDef);
            this.body.CreateFixture(Bomb._bombFixtureDef);
        }

        public draw(context: CanvasRenderingContext2D, viewport: Engine.Viewport) {
            var center: Engine.Vector2 = {
                x: Engine.World.metersToPixels(this.position.x) - viewport.topLeft.x,
                y: Engine.World.metersToPixels(this.position.y) - viewport.topLeft.y
            };

            Bomb._images[this._direction].draw(context, center.x - this.size.w / 2, center.y - this.size.h / 2);

            if (Global.DEBUG_BOMB_DRAW_SENSOR) {
                context.strokeStyle = '#ff0000';
                context.beginPath();
                context.arc(center.x, center.y, Engine.World.metersToPixels(Bomb.BOMB_SENSOR_RADIUS), 0, 2 * Math.PI);
                context.stroke();
            }
        }

        public static loadContent(): void {
            Bomb._images[Bomb.DIRECTION_LEFT] = new Engine.Image('bomb_left');
            Bomb._images[Bomb.DIRECTION_RIGHT] = new Engine.Image('bomb_right');
        }

        public update() {
            if (Date.now() - Bomb.BOMB_LIFE_TIME >= this._startTime) {
                this.die();
            }
        }

        private die(): void {
            Game.instance.removeGameObject(this);

            Game.instance.world.physicsWorld.QueryShape((f: b2Dynamics.b2Fixture) => {
                var userData = <FixtureUserData> f.GetUserData();
                if (userData != null && userData.type == FixtureUserData.TYPE_BRICK) {
                    var brick = <Brick> f.GetBody().GetUserData();
                    Game.instance.destroyBrick(brick);
                }
                return true;
            }, Bomb._bombShape, this.body.GetTransform());
        }

        public destroy(): void {
            Game.instance.world.destroyBody(this.body);
        }
    }
}
