import { TrackChanges, Renderable } from "@web/core";
import { NeedyService } from "@app/services";

@Renderable({
    folder: 'pages/home',
    templateUrl: './home.page.html',
    styleUrl: './home.page.css'
})
export class HomePage {
    public appTitle: string = 'Atter';
    constructor(private needyService: NeedyService) {
        console.log(this.needyService.useTestService());
    }
}