import { Route } from "@web/router/route";
import { HomePage } from "./pages/home/home.page";
import { LoginPage } from "./pages/login/login.page";
import { NotFoundPage } from "./pages/not-found/not-found.page";

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
