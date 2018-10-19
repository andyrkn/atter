import { Renderable } from "@web/core";

@Renderable({
    folder: 'pages/not-found',
    templateUrl: './not-found.page.html',
    styleUrl: './not-found.page.css'
})
export class NotFoundPage {
    public elements: string[] = [];

    constructor() {
    }

}