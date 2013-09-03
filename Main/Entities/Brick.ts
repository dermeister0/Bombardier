/// <reference path="../Engine/GameObject.ts" />
/// <reference path="Map.ts" />

module Bombardier.Entities {
    import b2Collision = Box2D.Collision;
    import b2Dynamics = Box2D.Dynamics;

    export class Brick extends Bombardier.Engine.GameObject {
        private static _brickShape: b2Collision.Shapes.b2PolygonShape;
        private static _brickFixtureDef: b2Dynamics.b2FixtureDef;

        constructor(x: number, y: number) {
            super();

            if (Brick._brickShape == null) {
                Brick._brickShape = new b2Collision.Shapes.b2PolygonShape();
                Brick._brickShape.SetAsBox(Bombardier.Engine.World.pixelsToMeters(Bombardier.Entities.Map.TILE_SIZE / 2),
                    Bombardier.Engine.World.pixelsToMeters(Bombardier.Entities.Map.TILE_SIZE / 2));
            }

            if (Brick._brickFixtureDef == null) {
                Brick._brickFixtureDef = new b2Dynamics.b2FixtureDef();
                Brick._brickFixtureDef.density = 1.0;
                Brick._brickFixtureDef.friction = 1.0;
                Brick._brickFixtureDef.restitution = 0.0;
                Brick._brickFixtureDef.shape = Brick._brickShape;
                Brick._brickFixtureDef.userData = new FixtureUserData();
                Brick._brickFixtureDef.userData.type = FixtureUserData.TYPE_BRICK;
            }

            var bodyDef = new b2Dynamics.b2BodyDef();
            bodyDef.type = b2Dynamics.b2Body.b2_staticBody;
            bodyDef.position.Set(x, y);

            Bombardier.Entities.Game.instance.world.addRigidBody(bodyDef).CreateFixture(Brick._brickFixtureDef);
        }
    }
}
