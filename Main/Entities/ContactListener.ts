/// <reference path="../Libs/box2dweb-min.d.ts" />
/// <reference path="FixtureUserData.ts" />

module Bombardier.Entities {
    import b2Dynamics = Box2D.Dynamics;

    export class ContactListener extends b2Dynamics.b2ContactListener {
        /**
		* Called when two fixtures begin to touch.
		* @param contact Contact point.
		**/
        public BeginContact(contact: b2Dynamics.Contacts.b2Contact): void {
            var userDataA = <FixtureUserData> contact.GetFixtureA().GetUserData();
            if (userDataA != null && userDataA.type == FixtureUserData.TYPE_FOOT) {
                userDataA.player.increaseFootContacts();
            }

            var userDataB = <FixtureUserData> contact.GetFixtureB().GetUserData();
            if (userDataB != null && userDataB.type == FixtureUserData.TYPE_FOOT) {
                userDataB.player.increaseFootContacts();
            }
        }

        /**
		* Called when two fixtures cease to touch.
		* @param contact Contact point.
		**/
        public EndContact(contact: b2Dynamics.Contacts.b2Contact): void {
            var userDataA = <FixtureUserData> contact.GetFixtureA().GetUserData();
            if (userDataA != null && userDataA.type == FixtureUserData.TYPE_FOOT) {
                userDataA.player.decreaseFootContacts();
            }

            var userDataB = <FixtureUserData> contact.GetFixtureB().GetUserData();
            if (userDataB != null && userDataB.type == FixtureUserData.TYPE_FOOT) {
                userDataB.player.decreaseFootContacts();
            }
        }
    }
}
