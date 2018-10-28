import { TrackChanges, Renderable } from "@web/core";

@Renderable({
    folder: 'pages/home',
    templateUrl: './home.page.html',
    styleUrl: './home.page.css'
})
export class HomePage {
    public appTitle: string = 'Atter';
}