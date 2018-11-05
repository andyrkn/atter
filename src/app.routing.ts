import { Route } from "@web/router";

import {
    HomePage, LoginPage, NotFoundPage, LayoutPage,
    RegisterPage, ForgotPasswordPage, Activity, DashboardPage, CreateNewActivityPage, FollowActivity, LogoutPage
} from "./renderables/pages";
import { AsignGradePage } from "./renderables/pages/asign-grade/asign-grade.page";

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
        path: 'activity/:id'
    },
    {
        page: ForgotPasswordPage,
        path: 'forgot-password'
    },
    {
        page: AsignGradePage,
        path: 'asign-grade'
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
