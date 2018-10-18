import { Page } from "@web/core";

@Page({
    folder: 'not-found',
    templateUrl: './not-found.page.html',
    styleUrl: './not-found.page.css'
})
export class NotFoundPage {
    public elements: string[] = [];

    constructor() {
    }

}