import { Renderable } from "@web/core";

@Renderable({
    template: require('./layout.page.html'),
    style: require('./layout.page.css')
})
export class LayoutPage {

    // tslint:disable-next-line:max-line-length
    public lorem: string = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;

    public execute(value: string): void {
        console.log(value);
    }
}