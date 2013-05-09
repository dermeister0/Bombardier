/// <reference path="Player.ts" />

module Bombardier.Entities {
    export class FixtureUserData {
        static TYPE_UNDEFINED = 0;
        static TYPE_BRICK = 1;
        static TYPE_FOOT = 2;

        type: number = FixtureUserData.TYPE_UNDEFINED;

        // Used for foot fixture.
        player: Player = null;
    }
}
