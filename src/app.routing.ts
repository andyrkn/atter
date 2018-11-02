import { Route } from "@web/router";

import {
    HomePage, LoginPage, NotFoundPage, LayoutPage,
    RegisterPage, ForgotPasswordPage, Activity, DashboardPage, CreateNewActivityPage, FollowActivity, LogoutPage
} from "./renderables/pages";

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
        page: LogoutPage,
        path: 'logout'
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
        page: Activity,
        path: 'activity'
    },
    {
        page: ForgotPasswordPage,
        path: 'forgot-password'
    },
    {
        page: DashboardPage,
        path: 'dashboard/:id'
    },
    {
        page: CreateNewActivityPage,
        path: 'create-new-activity'
    },
    {
        page: FollowActivity,
        path: 'follow-activity'
    }
];
