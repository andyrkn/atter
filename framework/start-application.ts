import { Renderer, StyleHandler } from "./dom";
import { Application, InstanceManager } from "./core";
import { AppContainer } from "./core/aplication/app-container";
import { RoutingManager } from "./router/routing-manager";
import { Router } from "./router/router";
import { Subject } from "rxjs";
import { NavigationState } from "./router/utils/navigation-state.enum";
import { PageManipulatorHandler } from "./core/handlers/page-manipulator-handler";
import { ComponentManipulatorHandler } from "./core/handlers";
import { ComponentManager } from "./component";

export function startApplication<T>(application: Application<T>): void {
    AppContainer.mergeMetadata();

    const orchestrator = AppContainer.orchestrator;
    const renderer = new Renderer();
    const styleHandler = new StyleHandler();

    const navigationState = new Subject<NavigationState>();
    const router = new Router(navigationState);

    AppContainer.dependencyContainer.instanciateInjectables();
    const instanceManager = new InstanceManager(orchestrator, AppContainer.dependencyContainer);

    const componentManipulatorHandler = new ComponentManipulatorHandler(renderer, styleHandler, instanceManager);
    const pageManipulatorHandler = new PageManipulatorHandler(router, renderer, styleHandler, instanceManager);

    const componentManager = new ComponentManager(orchestrator, componentManipulatorHandler);
    componentManager.manage();

    const routingManager = new RoutingManager(orchestrator, navigationState, pageManipulatorHandler);
    routingManager.manage();
}