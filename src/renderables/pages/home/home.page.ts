import { TrackChanges, Renderable } from "@web/core";

@Renderable({
    folder: 'pages/home',
    templateUrl: './home.page.html',
    styleUrl: './home.page.css'
})
export class HomePage {
    private counterValue: number = 0;

    @TrackChanges()
    public elements: string[] = [];

    constructor() {
        this.elements.push(this.counterValue.toString());
        setTimeout(() => {
            this.counterValue++;
            this.elements.push(this.counterValue.toString());
        }, 1000);
    }
}