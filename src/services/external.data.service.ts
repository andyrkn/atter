import { BaseImporter } from './data-importer/base.importer';
import { Injectable } from '@web/core';
import { UserService } from './user.service';
import { Observable, from } from 'rxjs';

@Injectable()
export class ExternalDataService {
    private tokenString = "OAuthToken";
    constructor(private userService: UserService) { }
    public authorizeApp(importer: BaseImporter): void {
        importer.authorizeApp();
    }
    public obtainOauthToken(importer: BaseImporter, code: string): void {
        importer.obtainOauthToken(code).subscribe((data) => {
            this.userService.updateValues([importer.getName() + this.tokenString], [data.body.access_token]).subscribe(
                () => { window.location.href = "http://localhost:3000/#/home"; }
            );
        });
    }
    public obtainFiles(importer: BaseImporter): Observable<any> {
        return from(
            new Promise((resolve) => {
                this.userService.getCurrentUserAuthToken(importer.getTokenLocation()).subscribe((token) => {
                    importer.obtainFiles(token).subscribe((fileData) => { resolve(fileData); }
                        , (error) => { this.userService.updateValues([importer.getName() + this.tokenString], [""]).subscribe(); }
                    );
                }
                );
            }));
    }
    public obtainDataFromFile(importer: BaseImporter, fileName: string): Observable<any> {
        return from(
            new Promise((resolve) => {
                this.userService.getCurrentUserAuthToken(importer.getTokenLocation()).subscribe((token) => {
                    importer.obtainDataFromFile(fileName, token).subscribe((fileData) => { resolve(fileData); }
                        , (error) => { this.userService.updateValues([importer.getName() + this.tokenString], [""]).subscribe(); }
                    );
                }
                );
            }));
    }
    public revokeAcces(importer: BaseImporter): Observable<any> {
        return from(
            new Promise((resolve) => {
                this.userService.getCurrentUserAuthToken(importer.getTokenLocation()).subscribe((token) => {
                    this.userService.updateValues([importer.getName() + this.tokenString], [""]).subscribe(() => {
                        importer.revokeToken(token).subscribe((fileData) => {
                            resolve(fileData);
                        });
                    });
                });
            }));
    }
}
