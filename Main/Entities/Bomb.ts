/// <reference path="../Engine/GameObject.ts" />

module Bombardier.Entities {
    import b2Collision = Box2D.Collision;
    import b2Dynamics = Box2D.Dynamics;

    export class Bomb extends Bombardier.Engine.GameObject {
        private static _bombShape: b2Collision.Shapes.b2CircleShape;
        private static _bombFixtureDef: b2Dynamics.b2FixtureDef;

        static BOMB_SIZE: number = 1;

        constructor(x: number, y: number) {
            super();

            if (Bomb._bombShape == null) {
                Bomb._bombShape = new b2Collision.Shapes.b2CircleShape();
                Bomb._bombShape.SetRadius(Bombardier.Engine.World.pixelsToMeters(Bomb.BOMB_SIZE));
            }

            if (Bomb._bombFixtureDef == null) {
                Bomb._bombFixtureDef = new b2Dynamics.b2FixtureDef();
                Bomb._bombFixtureDef.density = 1.0;
                Bomb._bombFixtureDef.friction = 1.0;
                Bomb._bombFixtureDef.restitution = 0.0;
                Bomb._bombFixtureDef.shape = Bomb._bombShape;
            }

            var bodyDef = new b2Dynamics.b2BodyDef();
            bodyDef.type = b2Dynamics.b2Body.b2_staticBody;
            bodyDef.position.Set(x, y);

            Bombardier.Entities.Game.instance.world.addRigidBody(bodyDef).CreateFixture(Bomb._bombFixtureDef);
        }
    }
}
