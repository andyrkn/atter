import { Route } from "@web/router/route";
import { HomePage, LoginPage, NotFoundPage } from "./renderables/pages";

export const appRoute: Route[] = [
    {
        page: HomePage,
        path: 'home'
    },
    {
        page: LoginPage,
        path: 'login/:id'
    },
    {
        page: NotFoundPage,
        path: '**'
    }
];
