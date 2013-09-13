module Bombardier.Entities {
    import b2Collision = Box2D.Collision;
    import b2Dynamics = Box2D.Dynamics;

    class Fireball extends Engine.GameObject {
        private static RADIUS: number = 0.5;

        private static _shape: b2Collision.Shapes.b2CircleShape = null;

        private static _fixtureDef: b2Dynamics.b2FixtureDef = null;

        private static _sprite: Engine.Sprite = null;

        public static Create(): Fireball {
            var fireball: Fireball = new Fireball();

            Game.instance.addGameObject(fireball);

            return fireball;
        }

        constructor() {
            super();

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
    }
}
