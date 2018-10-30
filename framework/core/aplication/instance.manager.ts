import { DependencyContainer } from "./dependancy.container";
import { Utils } from "@web/utils";

export class InstanceManager {
    private dependencyContainer: DependencyContainer;

    constructor(dependencyContainer: DependencyContainer) {
        this.dependencyContainer = dependencyContainer;
    }

    public getInstance(classToInstantiate: Function): Function {

        const classArguments: Function[] = this.getRenderableMetadata(classToInstantiate);
        this.checkInjectables(classArguments);

        return this.instantiateClass(classArguments, classToInstantiate);
    }

    private getRenderableMetadata(injectable: Function): Function[] {
        return this.dependencyContainer.getRenderableMetadata(injectable);
    }

    private getInjectableMetadata(injectable: Function): Function[] {
        return this.dependencyContainer.getInjectableMetadata(injectable);
    }

    private getInjectableClass(injectable: Function): Function {
        return this.dependencyContainer.getInjectableClass(injectable);
    }

    private setInjectableClass(name: string, injectable: Function): void {
        this.dependencyContainer.setInjectableClass(name, injectable);
    }

    private instantiateClass(classArguments: Function[], classToInstantiate: Function): Function {
        if (classArguments) {
            const params = classArguments.map((x: Function) => this.getInjectableClass(x));
            return new classToInstantiate.prototype.constructor(...params);
        } else {
            return new classToInstantiate.prototype.constructor();
        }
    }

    private checkInjectables(classArguments: Function[]): void {
        if (classArguments) {
            for (const arg of classArguments) {
                if (this.getInjectableClass(arg) === undefined) {
                    this.instantiateInjectables(arg);
                }
            }
        }
    }

    private instantiateInjectables(injectable: Function): void {
        if (this.getInjectableMetadata(injectable) === undefined) {
            Utils.printError(injectable.name + " not an injectable class");
        } else {
            this.parseDependencyTree(injectable);
        }
    }

    private parseDependencyTree(injectable: Function): void {
        const metadata: Function[] = this.getInjectableMetadata(injectable);
        if (metadata.length > 0) {
            for (const dependency of metadata) {
                if (dependency) {
                    if (this.getInjectableClass(dependency) === undefined) {
                        this.parseDependencyTree(dependency);
                    }
                }
            }
            this.instantiateDependantInjectable(injectable, metadata);
        } else {
            if (this.getInjectableClass(injectable) === undefined) {
                this.setInjectableClass(injectable.name, new injectable.prototype.constructor());
            }
        }
    }

    private instantiateDependantInjectable(injectable: Function, metadata: Function[]): void {
        if (this.getInjectableClass(injectable) === undefined) {
            this.setInjectableClass(injectable.name, new injectable.prototype.constructor(...this.prepareParams(metadata)));
        }
    }

    private prepareParams(metadata: Function[]): Function[] {
        const params: Function[] = [];
        for (const dependency of metadata) {
            if (dependency) {
                params.push(this.getInjectableClass(dependency));
            }
        }
        return params;
    }

}