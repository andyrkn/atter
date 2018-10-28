import { Renderable } from "@web/core";

@Renderable({
    folderPathRelativeToRenderablesFolder: 'components/header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    selector: 'header-component'
})
export class HeaderComponent {
}