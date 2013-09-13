module Bombardier.Entities {
    import b2Collision = Box2D.Collision;
    import b2Dynamics = Box2D.Dynamics;

    export class Fireball extends Engine.GameObject {
        private static RADIUS: number = 0.5;

        private static _shape: b2Collision.Shapes.b2CircleShape = null;

        private static _fixtureDef: b2Dynamics.b2FixtureDef = null;

        private static _sprite: Engine.Sprite = null;

        public static create(position: Engine.Vector2): Fireball {
            var fireball: Fireball = new Fireball(position);

            Game.instance.addGameObject(fireball);

            return fireball;
        }

        constructor(position: Engine.Vector2) {
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
                Fireball._fixtureDef.shape = Fireball._shape;
            }

            var bodyDef = new b2Dynamics.b2BodyDef();
            bodyDef.bullet = true;
        }

        public draw(context: CanvasRenderingContext2D, viewport: Engine.Viewport): void {
            Fireball._sprite.draw(context, Engine.World.metersToPixels(this.position.x) - this.screenSize.w / 2 - viewport.topLeft.x,
                Engine.World.metersToPixels(this.position.y) - this.screenSize.h / 2 - viewport.topLeft.y);
        }
    }
}
