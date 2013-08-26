module Bombardier.Engine {
    export class Input {
        static _keys: boolean[] = [];

        static KEY_W: number = 87;
        static KEY_A: number = 65;
        static KEY_S: number = 83;
        static KEY_D: number = 68;

        static OnKeyUp(event: any) {
            Input._keys[event.keyCode] = false;
        }

        static OnKeyDown(event: any) {
            Input._keys[event.keyCode] = true;
        }

        static IsKeyDown(keyCode: number): boolean {
            return Input._keys[keyCode];
        }
    }
}
