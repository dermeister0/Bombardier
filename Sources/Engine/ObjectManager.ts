module Bombardier.Engine {
    export class ObjectManager {
        private images: HTMLImageElement[] = [];

        getImage(key: string): HTMLImageElement {
            if (this.images[key] == undefined) {
                throw 'Image with key "' + key + '" is not loaded.';
            }

            return this.images[key];
        }

        loadImage(key: string, url: string) {
            if (this.images[key] != undefined) {
                throw 'Image with key "' + key + '" is already loaded.';
            }

            this.images[key] = document.createElement('img');
            this.images[key].src = url;
        }
    }
}
