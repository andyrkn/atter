import 'reflect-metadata';

export class DependancyContainer {
    private injectables: Function[] = [];
    private map: Map<string, Function> = new Map();

    public addInjectable(injectable: Function): void {
        this.injectables.push(injectable);
    }

    public instanciateInjectables(): void {
        for (const injectable of this.injectables) {
            this.parseDependencyTree(injectable);
        }
    }

    private parseDependencyTree(injectable: Function): void {
        const metadata: any = Reflect.getMetadata('design:paramtypes', injectable);
        if (metadata.length > 0) {
            const params: Function[] = [];
            for (const dependency of metadata) {
                if (dependency) {
                    params.push(this.map.get(dependency.name));
                    if (this.map.get(dependency.name) === undefined) {
                        this.parseDependencyTree(dependency);
                    }
                }
            }
            if (this.map.get(injectable.name) === undefined) {
                this.map.set(injectable.name, new injectable.prototype.constructor(...params));
            }
        } else {
            if (this.map.get(injectable.name) === undefined) {
                this.map.set(injectable.name, new injectable.prototype.constructor());
            }
        }
    }

    public getInjectable(name: string): Function {
        return this.map.get(name);
    }
}