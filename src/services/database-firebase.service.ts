import { Observable, from } from "rxjs";

import { Injectable } from "@web/core";
import { FirebaseService } from "./firebase.service";

@Injectable()
export class DatabaseFirebaseService {
    constructor(private firebase: FirebaseService) {
    }
}