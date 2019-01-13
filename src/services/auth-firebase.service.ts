import { auth, app, User } from "firebase";
import { Observable, from } from "rxjs";

import { Injectable } from "@web/core";
import { FirebaseService } from "./firebase.service";

@Injectable()
export class AuthFirebaseSerivce {

    constructor(private firebaseService: FirebaseService) {
        this.firebaseService.firebaseApp.auth().onAuthStateChanged((user) => this.onAuthStateChange(user));
    }

    public register(email: string, password: string): Observable<auth.UserCredential> {
        return from(this.firebaseService.firebaseApp.auth().createUserWithEmailAndPassword(email, password));
    }

    public login(email: string, password: string): Observable<auth.UserCredential> {
        return from(this.firebaseService.firebaseApp.auth().signInWithEmailAndPassword(email, password));
    }

    public logout(): Observable<void> {
        return from(this.firebaseService.firebaseApp.auth().signOut());
    }

    private onAuthStateChange(user: any): void {
        //
    }
}