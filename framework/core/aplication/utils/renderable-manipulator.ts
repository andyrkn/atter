import { RenderableMetadata } from "@web/core/metadata/renderable.metadata";
import { UrlTree } from "@web/router/utils/url-tree";
import { RoutePath } from "@web/router/utils/route-path";
import { TemplateEngine } from "@web/core/template-engine/template-engine";

export class RenderableManipulator {
    private _renderingIndex: number;
    private path: RoutePath;

    private _renderableClass: Function;
    private metadata: RenderableMetadata;

    private _propertiesToTrack: string[] = [];

    private interpretation: Function;
    public styleRendered: boolean = false;

    public static Create(renderableClass: Function, metadata: RenderableMetadata, renderingIndex: number): RenderableManipulator {
        const pageManipulator = new RenderableManipulator();
        pageManipulator._renderableClass = renderableClass;
        pageManipulator.metadata = metadata;
        pageManipulator._renderingIndex = renderingIndex;
        pageManipulator.interpretation = TemplateEngine.interpret(metadata.template);
        return pageManipulator;
    }

    public hasClassName(pageClassName: string): boolean {
        return pageClassName === this._renderableClass.name;
    }

    public get isDefaultPage(): boolean {
        return this.path.isDefaultRoutePath;
    }

    public isForTree(urlTree: UrlTree): boolean {
        // TODO: Lower cyclomatic complexity
        if (!this.path) {
            return false;
        }

        if (this.path.supportsParameter) {
            if (urlTree.hasParameter) {
                return urlTree.rawUrl === this.path.path;
            }

            return false;
        }

        return this.path.path === urlTree.rawUrl && !urlTree.hasParameter;
    }

    public setPathTo(value: RoutePath): void {
        this.path = value;
    }

    public addTrackProperty(value: string): void {
        this._propertiesToTrack.push(value);
    }

    public getInterpretation(): Function {
        return this.interpretation;
    }

    public get renderingIndex(): number {
        return this._renderingIndex;
    }

    public get propertiesToTrack(): string[] {
        return this._propertiesToTrack;
    }

    public getStyle(): string {
        return this.metadata.style;
    }

    public get renderableClass(): Function {
        return this._renderableClass;
    }

    public get isComponent(): boolean {
        return this.metadata.selector && !this.path;
    }

    public get selector(): string {
        return this.metadata.selector;
    }
}