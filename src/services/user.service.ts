import { Injectable } from "@web/core";
import { BehaviorSubject, Observable, from } from "rxjs";
import { AuthFirebaseSerivce } from "./firebase/firebase-auth.service";

@Injectable()
export class UserService {

    private changeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.loggedIn);
    private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private authFirebaseSerivce: AuthFirebaseSerivce) {
        const email = "cristyurs@yhaoo.com";
        const password = "Test1234";

        this.authFirebaseSerivce.login(email, password).subscribe(
            (user) => {
                this.loggedIn = true;
                this.userSubject.next(user);
            },
            (err) => {
                this.loggedIn = false;
            });
    }

    private set loggedIn(value: boolean) {
        localStorage.setItem("loggin", value ? "TRUE" : "FALSE");
        this.changeSubject.next(value);
    }

    private get loggedIn(): boolean {
        return localStorage.getItem("loggin") === "TRUE" ? true : false;
    }

    public login(): void {
        /*
        const email = "cristyurs@yhaoo.com";
        const password = "Test1234";

        this.authFirebaseSerivce.login(email, password).subscribe(
            (user) => {
                this.loggedIn = true;
                this.userSubject.next(user);
            },
            (err) => {
                this.loggedIn = false;
            });
            */
        this.loggedIn = true;
    }

    public logout(): void {
        this.loggedIn = false;

        this.authFirebaseSerivce.logout().subscribe(
            (user) => {
                this.loggedIn = false;
                this.userSubject.next(null);
            },
            (err) => {
                this.loggedIn = true;
            });
    }

    public onLoginChange(): Observable<boolean> {
        return this.changeSubject.asObservable();
    }

    public get user() {
        return this.userSubject.value.user;
    }

    public get userObservable() {
        return this.userSubject.asObservable();
    }
}