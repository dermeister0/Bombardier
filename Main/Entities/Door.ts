module Bombardier.Entities {
    export class Door extends Bombardier.Engine.GameObject {
        private static _sprite: Engine.Sprite = null;

        constructor(x: number, y: number) {
            super();

            this.position.x = x * Map.TILE_SIZE_IN_METERS + Map.TILE_HALF_SIZE_IN_METERS;
            this.position.y = y * Map.TILE_SIZE_IN_METERS + Map.TILE_HALF_SIZE_IN_METERS;
            this.screenSize.w = 64;
            this.screenSize.h = 64;

            if (Door._sprite === null) {
                Door._sprite = new Engine.Sprite('door', new Engine.Size2(64, 64));
                Door._sprite.addFrame(0, 0);
            }
        }

        public draw(context: CanvasRenderingContext2D, viewport: Engine.Viewport): void {
            Door._sprite.draw(context, Engine.World.metersToPixels(this.position.x) - this.screenSize.w / 2 - viewport.topLeft.x,
                Engine.World.metersToPixels(this.position.y) - this.screenSize.h / 2 - viewport.topLeft.y);
        }

        public static create(def: ObjectDefinition): Door {
            var door: Door = new Door(def.x, def.y);

            Game.instance.addGameObject(door);

            return door;
        }
    }
}
