import { Renderable, TrackChanges } from "@web/core";
import { HeaderService } from "./services/header.service";
import { MenuItem } from "./models/menu-item";

@Renderable({
    template: require('./header.component.html'),
    style: require('./header.component.css'),
    selector: 'header-component'
})
export class HeaderComponent {

    @TrackChanges()
    private menuItems: MenuItem[] = [];

    constructor(headerService: HeaderService) {
        headerService.headers.subscribe((items: MenuItem[]) => this.menuItems = items);
    }
}