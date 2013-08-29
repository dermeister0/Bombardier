module Bombardier.Engine {
    export class Input {
        private static _keys: boolean[] = [];
        private static _previousKeys: boolean[] = [];

        static KEY_W: number = 87;
        static KEY_A: number = 65;
        static KEY_S: number = 83;
        static KEY_D: number = 68;
        static KEY_SHIFT: number = 16;

        static OnKeyUp(event: any) {
            Input._keys[event.keyCode] = false;
        }

        static OnKeyDown(event: any) {
            Input._keys[event.keyCode] = true;
        }

        static IsKeyDown(keyCode: number): boolean {
            return Input._keys[keyCode];
        }

        public static update(): void {
            for (var key in Input._keys) {
                Input._previousKeys[key] = Input._keys[key];
            }
        }

        static IsKeyPressed(keyCode: number): boolean {
            return Input._keys[keyCode] && !Input._previousKeys[keyCode];
        }
    }
}
