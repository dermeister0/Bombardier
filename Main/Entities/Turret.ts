module Bombardier.Entities {
    export class Turret extends Engine.GameObject {
        private static LEFT: number = 0;

        private static RIGHT: number = 1;

        private static _turretSprite: Engine.Sprite;

        private static _leftFrame: number;

        private static _rightFrame: number;

        private _direction: number;

        private _spriteFrame: number;

        public static create(def: ObjectDefinition) {
            var turret: Turret = new Turret(def.x, def.y, def.getProperty("Direction"));

            Game.instance.addGameObject(turret);
        }

        constructor(x: number, y: number, direction: string) {
            super();

            this.position.x = x * Map.TILE_SIZE_IN_METERS + Map.TILE_HALF_SIZE_IN_METERS;
            this.position.y = y * Map.TILE_SIZE_IN_METERS + Map.TILE_HALF_SIZE_IN_METERS;

            if (Turret._turretSprite == null) {
                Turret._turretSprite = new Engine.Sprite('turret', new Engine.Size2(64, 64));
                Turret._leftFrame = Turret._turretSprite.addFrame(0, 0);
                Turret._rightFrame = Turret._turretSprite.addFrame(64, 0);
            }

            if (direction === "left") {
                this._direction = Turret.LEFT;
                this._spriteFrame = Turret._leftFrame;
            }
            else {
                this._direction = Turret.RIGHT;
                this._spriteFrame = Turret._rightFrame;
            }
        }

        public draw(context: CanvasRenderingContext2D, viewport: Engine.Viewport): void {
            Turret._turretSprite.currentFrame = this._spriteFrame;

            Turret._turretSprite.draw(context, Engine.World.metersToPixels(this.position.x) - Map.TILE_HALF_SIZE - viewport.topLeft.x,
                Engine.World.metersToPixels(this.position.y) - Map.TILE_HALF_SIZE - viewport.topLeft.y);
        }
    }
}
