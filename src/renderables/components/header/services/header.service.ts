import { Injectable } from "@web/core";
import { UserService } from "@app/services/user.service";
import { BehaviorSubject, Observable } from "rxjs";
import { MenuItem } from "../models/menu-item";
import { userMenuItemes } from "../models/user-menu-items";
import { guestMenuItems } from "../models/guest-menu-items";

@Injectable()
export class HeaderService {
    private defaultMenus: MenuItem[] = [{
        text: 'Home',
        url: '#/home'
    }];

    private headerSubject: BehaviorSubject<MenuItem[]> = new BehaviorSubject(this.defaultMenus);

    constructor(private userService: UserService) {
        userService.onLoginChange().subscribe((value) => {
            if (value) {
                this.headerSubject.next(userMenuItemes);
            } else {
                this.headerSubject.next(guestMenuItems);
            }
        });
    }

    public get headers(): Observable<MenuItem[]> {
        return this.headerSubject.asObservable();
    }
}