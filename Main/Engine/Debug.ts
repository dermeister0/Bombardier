/// <reference path="Viewport.ts" />

module Bombardier.Engine {
    import b2Collision = Box2D.Collision;
    import b2Contacts = Box2D.Dynamics.Contacts;

    export class Debug {
        static drawContacts(contactList: b2Contacts.b2ContactEdge, context: CanvasRenderingContext2D, viewport: Viewport): void {
            var contact: b2Contacts.b2ContactEdge;
            var manifold: b2Collision.b2WorldManifold = new b2Collision.b2WorldManifold();
            for (contact = contactList; contact != null; contact = contact.next) {
                contact.contact.GetWorldManifold(manifold);

                if (manifold.m_points[0].x != 0 && manifold.m_points[0].y != 0) {
                    context.fillStyle = '#ff00ff';
                    context.beginPath();
                    context.arc(Engine.World.metersToPixels(manifold.m_points[0].x) - viewport.topLeft.x,
                        Engine.World.metersToPixels(manifold.m_points[0].y) - viewport.topLeft.y, 3, 0, 2 * Math.PI);
                    context.fill();
                }
            }
        }
    }
}
