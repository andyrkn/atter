import { Injectable } from "@web/core";
import { Subject, BehaviorSubject, Observable } from "rxjs";
import { AuthFirebaseSerivce } from "./auth-firebase.service";

@Injectable()
export class UserService {

    private changeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.loggedIn);
    private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private authFirebaseSerivce: AuthFirebaseSerivce) {
    }

    public login(): void {

        const email = "cristyurs@yhaoo.com";
        const password = "Test1234";

        this.authFirebaseSerivce.login(email, password).subscribe(
            (user) => {
                this.loggedIn = true;
                this.userSubject.next(user);
                console.log(this.userSubject.value);
            },
            (err) => {
                this.loggedIn = false;
            });
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