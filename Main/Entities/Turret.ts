/// <reference path="Fireball.ts" />

module Bombardier.Entities {
    import b2Collision = Box2D.Collision;
    import b2Dynamics = Box2D.Dynamics;

    export class Turret extends Engine.GameObject {
        private static LEFT: number = 0;

        private static RIGHT: number = 1;

        private static INTERVAL: number = 3000;


        private static _turretSprite: Engine.Sprite = null;

        private static _leftFrame: number;

        private static _rightFrame: number;

        private _direction: number;

        private _spriteFrame: number;

        private static _turretShape: b2Collision.Shapes.b2PolygonShape = null;

        private static _turretFixtureDef: b2Dynamics.b2FixtureDef = null;

        private _lastFireballTime: number = 0;

        private static _shapeHalfWidth: number = Map.TILE_HALF_SIZE_IN_METERS / 4;

        public static create(def: ObjectDefinition): Turret {
            var turret: Turret = new Turret(def.x, def.y, def.getProperty("Direction"));

            Game.instance.addGameObject(turret);

            return turret;
        }

        constructor(x: number, y: number, direction: string) {
            super();

            this.position.x = x * Map.TILE_SIZE_IN_METERS + Map.TILE_HALF_SIZE_IN_METERS;
            this.position.y = y * Map.TILE_SIZE_IN_METERS + Map.TILE_HALF_SIZE_IN_METERS;

            if (Turret._turretSprite === null) {
                Turret._turretSprite = new Engine.Sprite('turret', new Engine.Size2(64, 64));
                Turret._leftFrame = Turret._turretSprite.addFrame(0, 0);
                Turret._rightFrame = Turret._turretSprite.addFrame(64, 0);
            }

            if (direction === "left") {
                this._direction = Turret.LEFT;
                this._spriteFrame = Turret._leftFrame;
            }
            else {
                this._direction = Turret.RIGHT;
                this._spriteFrame = Turret._rightFrame;
            }

            if (Turret._turretShape === null) {
                Turret._turretShape = new b2Collision.Shapes.b2PolygonShape();
                Turret._turretShape.SetAsBox(Turret._shapeHalfWidth, Map.TILE_HALF_SIZE_IN_METERS);
            }

            if (Turret._turretFixtureDef === null) {
                Turret._turretFixtureDef = new b2Dynamics.b2FixtureDef();
                Turret._turretFixtureDef.shape = Turret._turretShape;
                Turret._turretFixtureDef.filter.groupIndex = CollisionGroup.BULLET_AND_TURRET;
            }

            var bodyDef = new b2Dynamics.b2BodyDef();
            bodyDef.type = b2Dynamics.b2Body.b2_staticBody;

            if (this._direction == Turret.LEFT) {
                bodyDef.position.Set(this.position.x - Map.TILE_HALF_SIZE_IN_METERS + Turret._shapeHalfWidth, this.position.y);
            }
            else {
                bodyDef.position.Set(this.position.x + Map.TILE_HALF_SIZE_IN_METERS - Turret._shapeHalfWidth, this.position.y);
            }            

            this.body = Bombardier.Entities.Game.instance.world.addRigidBody(bodyDef);
            var fixture = this.body.CreateFixture(Turret._turretFixtureDef);
            fixture.SetUserData(new FixtureUserData(FixtureUserData.TYPE_METAL_OBJECT));

            this.zIndex = 2;
        }

        public draw(context: CanvasRenderingContext2D, viewport: Engine.Viewport): void {
            Turret._turretSprite.currentFrame = this._spriteFrame;

            Turret._turretSprite.draw(context, Engine.World.metersToPixels(this.position.x) - Map.TILE_HALF_SIZE - viewport.topLeft.x,
                Engine.World.metersToPixels(this.position.y) - Map.TILE_HALF_SIZE - viewport.topLeft.y);
        }

        public update(): void {
            if (Date.now() - this._lastFireballTime > Turret.INTERVAL) {
                var pos = this.body.GetPosition();
                if (this._direction == Turret.LEFT) {
                    Fireball.create(new Engine.Vector2(pos.x + Turret._shapeHalfWidth / 2, pos.y), new Engine.Vector2(1, 0));
                }
                else {
                    Fireball.create(new Engine.Vector2(pos.x - Turret._shapeHalfWidth / 2, pos.y), new Engine.Vector2(-1, 0));
                }

                this._lastFireballTime = Date.now();
            }
        }
    }
}
