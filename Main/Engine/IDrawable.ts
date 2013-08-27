module Bombardier.Engine {
    export interface IDrawable {
        draw(context: CanvasRenderingContext2D, x: number, y: number): void;
    }
}