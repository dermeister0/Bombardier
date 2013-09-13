module Bombardier.Entities {
    export class ObjectDefinition {
        public x: number;

        public y: number;

        public objectType: number;

        public properties: any[];

        constructor(json: any) {
            this.x = json.x;
            this.y = json.y;
            this.properties = json.properties;
        }

        public getProperty(key: string): string {
            for (var i in this.properties) {
                if (this.properties[i].Key == key) {
                    return this.properties[i].Value.Value;
                }
            }
        }
    }
}
