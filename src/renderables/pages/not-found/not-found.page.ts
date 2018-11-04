import { Renderable } from "@web/core";

@Renderable({
    template: require('./not-found.page.html'),
    style: require('./not-found.page.css')
})
export class NotFoundPage {
}