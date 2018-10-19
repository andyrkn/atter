import { Renderer, StyleHandler } from "./dom";
import { Application, InstanceManager } from "./core";
import { AppContainer } from "./core/aplication/app-container";
import { RoutingManager } from "./router/routing-manager";
import { Router } from "./router/router";
import { PageManipulatorHandler } from "./router/handlers/page-manipulator-handler";
import { Subject } from "rxjs";
import { NavigationState } from "./router/utils/navigation-state.enum";

export function startApplication<T>(application: Application<T>): void {
    AppContainer.mergeMetadata();

    const pagesOrchestrator = AppContainer.orchestrator;
    const renderer = new Renderer();
    const styleHandler = new StyleHandler();

    const navigationState = new Subject<NavigationState>();
    const router = new Router(navigationState);

    const instanceManager = new InstanceManager(pagesOrchestrator);
    // TODO: add instances to dependency injection container
    // this instances will be injected into pages later on
    // DependencyInjection.register(Renderer, renderer) etc... or something similar;
    const pageManipulatorHandler = new PageManipulatorHandler(router, renderer, styleHandler, instanceManager);
    
    const routingManager = new RoutingManager(pagesOrchestrator, navigationState, pageManipulatorHandler);
}