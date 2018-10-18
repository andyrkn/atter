import { Page, TrackChanges } from "@web/core";

@Page({
    folder: 'home',
    templateUrl: './home.page.html',
    styleUrl: './home.page.css'
})
export class HomePage {
    private counterValue: number = 0;

    @TrackChanges()
    public elements: string[] = [];

    constructor() {
        this.elements.push(this.counterValue.toString());
        setInterval(() => {
            this.counterValue++;
            this.elements.push(this.counterValue.toString());
        }, 1000);
    }
}