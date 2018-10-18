import { PageMetadata } from "@web/core/metadata/page.metadata";
import { UrlTree } from "@web/router/utils/url-tree";
import { RoutePath } from "@web/router/utils/route-path";
import { Loader } from "./loader";
import { TemplateEngine } from "@web/core/template-engine/template-engine";

export class PageManipulator {
    private path: RoutePath;
    private folder: string;

    private _pageClass: Function;
    private pageMetadata: PageMetadata;

    private _propertiesToTrack: string[] = [];

    private pageInterpretationLoaded: boolean = false;
    private pageInterpretation: Function;
    private pageStyleLoaded: boolean = false;
    private pageStyle: string;

    public static Create(pageClass: Function, metadata: PageMetadata): PageManipulator {
        let pageManipulator = new PageManipulator();
        pageManipulator._pageClass = pageClass;
        pageManipulator.pageMetadata = metadata;
        return pageManipulator;
    }

    public hasClassName(pageClassName: string) : boolean {
        return pageClassName === this._pageClass.name;
    }

    public get isDefaultPage(): boolean {
        return this.path.isDefaultRoutePath;
    }

    public isForTree(urlTree: UrlTree): boolean {
        if (!this.path) {
            // this page is not in a module should be removed.
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

    public setPathToPage(value: RoutePath, folder: string): void {
        this.path = value;
        this.folder = folder;

    }

    public addTrackProperty(value: string): void {
        this._propertiesToTrack.push(value);
    }

    public getInterpretation(): Function {
        this.loadPageIfNeeded();
        return this.pageInterpretation;
    }

    public get propertiesToTrack(): string[] {
        return this._propertiesToTrack;
    }

    public getStyle(): string {
        if (!this.pageStyleLoaded) {
            const styleUrl = this.getUrl(this.pageMetadata.styleUrl);
            const style: string = Loader.load(styleUrl);
            this.pageStyle = style;

            this.pageStyleLoaded = true;
        }

        return this.pageStyle;
    }

    public get pageClass(): Function {
        return this._pageClass;
    }

    private loadPageIfNeeded(): void {
        if (!this.pageInterpretationLoaded) {
            const requestUrl = this.getUrl(this.pageMetadata.templateUrl);
            const template: string = Loader.load(requestUrl);
            this.pageInterpretation = TemplateEngine.interpret(template);

            this.pageInterpretationLoaded = true;
        }
    }

    private getUrl(relativeUrl: string): string {
        let templateUrl = relativeUrl;
        if (templateUrl.indexOf('.') != 0) {
            templateUrl.slice(1);
        }

        if(templateUrl.indexOf('/') !=0 ) {
            templateUrl = `/${templateUrl}`;
        }

        return `${this.folder}/${this.pageMetadata.folder}${templateUrl}`;
    }
}