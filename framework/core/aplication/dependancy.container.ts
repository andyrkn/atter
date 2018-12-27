import 'reflect-metadata';

export class DependencyContainer {
    private renderablesMetadata: Function[] = [];
    private injectablesMetadata: Function[] = [];
    private injectableClasses: [] = [];

    public addRenderable(renderable: Function): void {
        this.renderablesMetadata[renderable.name] = Reflect.getMetadata('design:paramtypes', renderable);
    }

    public addInjectable(injectable: Function): void {
        const metadata = Reflect.getMetadata('design:paramtypes', injectable);
        this.injectablesMetadata[injectable.name] = metadata === undefined ? [] : metadata;
    }

    public getRenderableMetadata(renderable: Function): Function[] {
        return this.renderablesMetadata[renderable.name];
    }

    public getInjectableMetadata(injectable: Function): Function[] {
        return this.injectablesMetadata[injectable.name];
    }

    public getInjectableClass(injectable: Function): Function {
        return this.injectableClasses[injectable.name];
    }

    public setInjectableClass(name: string, injectable: Function): void {
        this.injectableClasses[name] = injectable;
    }

    public addRouter(name: string, router: any): void {
        this.injectableClasses[name] = router;
    }

}