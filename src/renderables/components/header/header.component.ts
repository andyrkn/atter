import { Renderable, TrackChanges } from "@web/core";
import { HeaderService } from "./services/header.service";
import { MenuItem } from "./models/menu-item";

@Renderable({
    folderPathRelativeToRenderablesFolder: 'components/header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    selector: 'header-component'
})
export class HeaderComponent {

    @TrackChanges()
    private menuItems: MenuItem[] = [];

    constructor(private headerService: HeaderService) {
        headerService.headers.subscribe((items: MenuItem[]) => this.menuItems = items);
    }
}