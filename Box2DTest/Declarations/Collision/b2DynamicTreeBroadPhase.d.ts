/**
* Box2DWeb-2.1.d.ts Copyright (c) 2012 Josh Baldwin http://github.com/jbaldwin/box2dweb.d.ts
* There are a few competing javascript Box2D ports.
* This definitions file is for Box2dWeb.js ->
*   http://code.google.com/p/box2dweb/
*
* Box2D C++ Copyright (c) 2006-2007 Erin Catto http://www.gphysics.com
*
* This software is provided 'as-is', without any express or implied
* warranty.  In no event will the authors be held liable for any damages
* arising from the use of this software.
* Permission is granted to anyone to use this software for any purpose,
* including commercial applications, and to alter it and redistribute it
* freely, subject to the following restrictions:
* 1. The origin of this software must not be misrepresented; you must not
*    claim that you wrote the original software. If you use this software
*    in a product, an acknowledgment in the product documentation would be
*    appreciated but is not required.
* 2. Altered source versions must be plainly marked as such, and must not be
*    misrepresented as being the original software.
* 3. This notice may not be removed or altered from any source distribution.
**/

/// <reference path="b2AABB.d.ts" />
/// <reference path="b2DynamicTreeNode.d.ts" />
/// <reference path="b2RayCastInput.d.ts" />
/// <reference path="IBroadPhase.d.ts" />

module Box2D.Collision {

	/**
	* The broad-phase is used for computing pairs and performing volume queries and ray casts. This broad-phase does not persist pairs. Instead, this reports potentially new pairs. It is up to the client to consume the new pairs and to track subsequent overlap.
	**/
	export class b2DynamicTreeBroadPhase implements IBroadPhase {

		/**
		* Creates the dynamic tree broad phase.
		**/
		constructor ();

		/**
		* @see IBroadPhase.CreateProxy
		**/
		public CreateProxy(aabb: b2AABB, userData: any): b2DynamicTreeNode;

		/**
		* @see IBroadPhase.DestroyProxy
		**/
		public DestroyProxy(proxy: b2DynamicTreeNode): void;
		
		/**
		* @see IBroadPhase.GetFatAABB
		**/
		public GetFatAABB(proxy: b2DynamicTreeNode): b2AABB;

		/**
		* @see IBroadPhase.GetProxyCount
		**/
		public GetProxyCount(): number;

		/**
		* @see IBroadPhase.GetUserData
		**/
		public GetUserData(proxy: b2DynamicTreeNode): any;

		/**
		* @see IBroadPhase.MoveProxy
		**/
		public MoveProxy(proxy: b2DynamicTreeNode, aabb: b2AABB, displacement: b2Math.b2Vec2): void;

		/**
		* @see IBroadPhase.Query
		**/
		public Query(callback: (proxy: b2DynamicTreeNode) => bool, aabb: b2AABB): void;

		/**
		* @see IBroadPhase.RayCast
		**/
		public RayCast(callback: (input: b2RayCastInput, proxy: b2DynamicTreeNode) => number, input: b2RayCastInput): void;

		/**
		* @see IBroadPhase.Rebalance
		**/
		public Rebalance(iterations: number): void;

		/**
		* Tests if two proxies overlap.
		* @param proxyA First proxy to test.
		* @param proxyB Second proxy to test.
		* @return True if the proxyA and proxyB overlap with Fat AABBs, otherwise false.
		**/
		public TestOverlap(proxyA: b2DynamicTreeNode, proxyB: b2DynamicTreeNode): bool;

		/**
		* Update the pairs. This results in pair callbacks. This can only add pairs.
		* @param callback Called for all new proxy pairs.
		*	param userDataA Proxy A in the pair user data.
		*	param userDataB Proxy B in the pair user data.
		**/
		public UpdatePairs(callback: (userDataA: any, userDataB: any) => void): void;

		/**
		* Validates the dynamic tree.
		* NOTE: this says "todo" in the current Box2DFlash code.
		**/
		public Validate(): void;
	}
}
