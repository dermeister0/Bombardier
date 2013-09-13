/// <reference path="../Libs/box2dweb.d.ts" />
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
            var userDataB = <FixtureUserData> contact.GetFixtureB().GetUserData();

            if (userDataA != null && userDataB != null) {
                this.processContactBegin(userDataA);
                this.processContactBegin(userDataB);
            }
        }

        processContactBegin(userData: FixtureUserData) {
            if (userData.type == FixtureUserData.TYPE_FOOT) {
                userData.player.increaseFootContacts();
            }
            else if (userData.type == FixtureUserData.TYPE_BODY_LEFT || userData.type == FixtureUserData.TYPE_BODY_RIGHT) {
                userData.player.increaseBodyWallContacts(userData.type);
            }
            else if (userData.type == FixtureUserData.TYPE_BULLET) {
                Game.instance.removeGameObject(userData.object);
            }
        }

        /**
		* Called when two fixtures cease to touch.
		* @param contact Contact point.
		**/
        public EndContact(contact: b2Dynamics.Contacts.b2Contact): void {
            var userDataA = <FixtureUserData> contact.GetFixtureA().GetUserData();
            var userDataB = <FixtureUserData> contact.GetFixtureB().GetUserData();
            if (userDataA != null && userDataB != null) {
                this.processContactEnd(userDataA);
                this.processContactEnd(userDataB);
            }
        }

        processContactEnd(userData: FixtureUserData) {
            if (userData.type == FixtureUserData.TYPE_FOOT) {
                userData.player.decreaseFootContacts();
            }
            else if (userData.type == FixtureUserData.TYPE_BODY_LEFT || userData.type == FixtureUserData.TYPE_BODY_RIGHT) {
                userData.player.decreaseBodyWallContacts(userData.type);
            }
        }
    }
}
