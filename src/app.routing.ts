import { Route } from "@web/router";

import { HomePage, LoginPage, NotFoundPage, LayoutPage, RegisterPage, ForgotPasswordPage } from "./renderables/pages";
import { Dashboard } from "./renderables/pages/dashboard/dashboard";

export const appRoute: Route[] = [
    {
        page: HomePage,
        path: 'home'
    },
    {
        page: LoginPage,
        path: 'login'
    },
    {
        page: LayoutPage,
        path: 'layout'
    },
    {
        page: NotFoundPage,
        path: '**'
    },
    {
        page: RegisterPage,
        path: 'register'
    },
    {
        page: Dashboard,
        path: 'dashboard'
    },
    {
        page: ForgotPasswordPage,
        path: 'forgot-password'
    }
];
