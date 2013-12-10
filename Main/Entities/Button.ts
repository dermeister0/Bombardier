module Bombardier.Entities {
    export class Button extends Bombardier.Engine.GameObject {
        private static _sprite: Engine.Sprite = null;

        constructor(x: number, y: number) {
            super();

            this.position.x = x * Map.TILE_SIZE_IN_METERS + Map.TILE_HALF_SIZE_IN_METERS;
            this.position.y = y * Map.TILE_SIZE_IN_METERS + Map.TILE_HALF_SIZE_IN_METERS;
            this.screenSize.w = 20;
            this.screenSize.h = 20;

            if (Button._sprite === null) {
                Button._sprite = new Engine.Sprite('button', new Engine.Size2(20, 20));
                Button._sprite.addFrame(0, 0);
            }
        }

        public draw(context: CanvasRenderingContext2D, viewport: Engine.Viewport): void {
            Button._sprite.draw(context, Engine.World.metersToPixels(this.position.x) - this.screenSize.w / 2 - viewport.topLeft.x,
                Engine.World.metersToPixels(this.position.y) - this.screenSize.h / 2 - viewport.topLeft.y);
        }

        public static create(def: ObjectDefinition): Button {
            var button: Button = new Button(def.x, def.y);

            Game.instance.addGameObject(button);

            return button;
        }
    }
}
