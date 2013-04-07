module Bombardier.Engine {
    export class ObjectManager {
        private _images: HTMLImageElement[] = [];

        getImage(key: string): HTMLImageElement {
            if (this._images[key] == undefined) {
                throw 'Image with key "' + key + '" is not loaded.';
            }

            return this._images[key];
        }

        loadImage(key: string, url: string) {
            if (this._images[key] != undefined) {
                throw 'Image with key "' + key + '" is already loaded.';
            }

            this._images[key] = document.createElement('img');
            this._images[key].src = url;
        }
    }
}
