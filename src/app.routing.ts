import { Route } from "@web/router/route";
import { HomePage } from "./renderables/pages/home/home.page";
import { LoginPage } from "./renderables/pages/login/login.page";
import { NotFoundPage } from "./renderables/pages/not-found/not-found.page";

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
