import * as firebase from 'firebase';
import {
    Injectable
} from "@web/core";
import {
    firebaseConfig
} from "./firebase.config";

@Injectable()
export class FirebaseService {
    private _firebaseApp: firebase.app.App;
    constructor() {
        this._firebaseApp = (firebase as any).default.initializeApp(firebaseConfig);
    }

    public get firebaseApp(): firebase.app.App {
        return this._firebaseApp;
    }
}