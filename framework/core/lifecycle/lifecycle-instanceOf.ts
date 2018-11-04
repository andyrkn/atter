import { OnInit } from "./on-init";
import { AfterRender } from "./after-render";
import { OnDestroy } from "./on-destory";
import { OnRefresh } from "./on-refresh";

export class LifeCycle {
    public static implementsOnInit(obj: any): obj is OnInit {
        return 'onInit' in obj;
    }

    public static implementsOnDestroy(obj: any): obj is OnDestroy {
        return 'onDestroy' in obj;
    }

    public static implementsOnRefresh(obj: any): obj is OnRefresh {
        return 'onRefresh' in obj;
    }

    public static implementsAfterRender(obj: any): obj is AfterRender {
        return 'afterRender' in obj;
    }
}