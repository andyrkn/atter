import { Route } from "@web/router";

import {
    HomePage, LoginPage, NotFoundPage, LayoutPage,
    RegisterPage, ForgotPasswordPage, Dashboard, Activity, AdminActivityPage, CreateNewActivityPage, FollowActivity
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
        page: Activity,
        path: 'activity'
    },
    {
        page: ForgotPasswordPage,
        path: 'forgot-password'
    },
    {
        page: AdminActivityPage,
        path: 'admin-activity'
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
