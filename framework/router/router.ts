import { NavigationState } from "./utils/navigation-state.enum";

import { Subject } from "rxjs";

export class Router {
    private navigationSubject: Subject<NavigationState>;

    constructor(navSubject: Subject<NavigationState>) {
        this.navigationSubject = navSubject;
    }
    public get navigationState(): Subject<NavigationState> {
        return this.navigationSubject;
    }

    public navigate(path: string, parameter: any = null): void {
        if (path.indexOf('/') !== 0) {
            path = '/' + path;
        }
        if (parameter) {
            path = path + '/' + parameter;
        }

        location.hash = '#' + path;
    }
}