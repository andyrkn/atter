import { RenderableMetadata } from "@web/core/metadata/renderable.metadata";
import { UrlTree } from "@web/router/utils/url-tree";
import { RoutePath } from "@web/router/utils/route-path";
import { Loader } from "./loader";
import { TemplateEngine } from "@web/core/template-engine/template-engine";

export class RenderableManipulator {
    private _renderingIndex: number;
    private path: RoutePath;
    private folder: string;

    private _renderableClass: Function;
    private metadata: RenderableMetadata;

    private _propertiesToTrack: string[] = [];

    private interpretationLoaded: boolean = false;
    private interpretation: Function;
    private styleLoaded: boolean = false;
    private style: string;
    public styleRendered: boolean = false;

    public static Create(renderableClass: Function, metadata: RenderableMetadata, renderingIndex: number): RenderableManipulator {
        const pageManipulator = new RenderableManipulator();
        pageManipulator._renderableClass = renderableClass;
        pageManipulator.metadata = metadata;
        pageManipulator._renderingIndex = renderingIndex;
        return pageManipulator;
    }

    public hasClassName(pageClassName: string): boolean {
        return pageClassName === this._renderableClass.name;
    }

    public get isDefaultPage(): boolean {
        return this.path.isDefaultRoutePath;
    }

    public isForTree(urlTree: UrlTree): boolean {
        if (!this.path) {
            return false;
        }

        if (this.path.supportsParameter) {
            if (urlTree.hasParameter) {
                return urlTree.rawUrl === this.path.path;
            }

            return false;
        }

        return this.path.path === urlTree.rawUrl;
    }

    public setPathTo(value: RoutePath, folder: string): void {
        this.path = value;
        this.setFolderPath(folder);
    }

    public setFolderPath(folder: string): void {
        this.folder = folder;
    }

    public addTrackProperty(value: string): void {
        this._propertiesToTrack.push(value);
    }

    public getInterpretation(): Function {
        this.loadIfNeeded();
        return this.interpretation;
    }

    public get renderingIndex(): number {
        return this._renderingIndex;
    }

    public get propertiesToTrack(): string[] {
        return this._propertiesToTrack;
    }

    public getStyle(): string {
        if (!this.styleLoaded) {
            const styleUrl = this.getUrl(this.metadata.styleUrl);
            const style: string = Loader.load(styleUrl);
            this.style = style;

            this.styleLoaded = true;
        }

        return this.style;
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

    private loadIfNeeded(): void {
        if (!this.interpretationLoaded) {
            const requestUrl = this.getUrl(this.metadata.templateUrl);
            const template: string = Loader.load(requestUrl);
            this.interpretation = TemplateEngine.interpret(template);

            this.interpretationLoaded = true;
        }
    }

    private getUrl(relativeUrl: string): string {
        let url = relativeUrl;
        if (url.indexOf('.') !== 0) {
            url.slice(1);
        }

        if (url.indexOf('/') !== 0) {
            url = `/${url}`;
        }

        return `${this.folder}/${this.metadata.folderPathRelativeToRenderablesFolder}${url}`;
    }
}