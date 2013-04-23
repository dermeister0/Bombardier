module Bombardier.Engine {
    export class Input {
        static _keys:number[] = [];

        static OnKeyUp(event: any) {
            var char = String.fromCharCode(event.keyCode);
            Input._keys[char] = 0;
        }

        static OnKeyDown(event: any) {
            var char = String.fromCharCode(event.keyCode);
            Input._keys[char] = 1;
        }
    }
}
