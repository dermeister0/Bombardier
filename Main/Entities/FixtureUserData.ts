/// <reference path="Player.ts" />

module Bombardier.Entities {
    export class CollisionGroup {
        static BULLET_AND_TURRET: number = -1;
    }

    export class FixtureUserData {
        static TYPE_UNDEFINED = 0;
        static TYPE_BRICK = 1;
        static TYPE_FOOT = 2;
        static TYPE_BODY_LEFT = 3;
        static TYPE_BODY_RIGHT = 4;
        static TYPE_STONE = 5;
        static TYPE_METAL_OBJECT = 6; // Turret
        static TYPE_BULLET = 7; // Fireball

        public type: number = FixtureUserData.TYPE_UNDEFINED;

        // Used for foot fixture.
        public player: Player = null;

        public object: Engine.GameObject = null;

        constructor(type?: number) {
            if (type !== undefined) {
                this.type = type;
            }
        }
    }
}
