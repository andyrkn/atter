import { Injectable } from "@web/core";
import { Subject, BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class UserService {

    private changeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.loggedIn);

    constructor() {
    }

    public login(): void {
        this.loggedIn = true;
    }

    public logout(): void {
        this.loggedIn = false;
    }

    private set loggedIn(value: boolean) {
        localStorage.setItem("loggin", value ? "TRUE" : "FALSE");
        this.changeSubject.next(value);
    }

    private get loggedIn(): boolean {
        return localStorage.getItem("loggin") === "TRUE" ? true : false;
    }

    public onLoginChange(): Observable<boolean> {
        return this.changeSubject.asObservable();
    }
}