/// <reference path="Player.ts" />

module Bombardier.Entities {
    export class FixtureUserData {
        static TYPE_UNDEFINED = 0;
        static TYPE_BRICK = 1;
        static TYPE_FOOT = 2;
        static TYPE_BODY_LEFT = 3;
        static TYPE_BODY_RIGHT = 4;
        static TYPE_STONE = 5;

        type: number = FixtureUserData.TYPE_UNDEFINED;

        // Used for foot fixture.
        player: Player = null;
    }
}
