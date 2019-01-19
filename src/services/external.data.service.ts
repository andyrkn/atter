import { BaseImporter } from './data-importer/base.importer';
import { Injectable } from '@web/core';
import { UserService } from './user.service';

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
    public obtainFiles(importer: BaseImporter, numberOfFilesToImport: number) {
        importer.obtainFiles(numberOfFilesToImport).subscribe((data) => {
            console.log(data);
        });
    }
    public obtainDataFromFile(importer: BaseImporter, fileName: string) {
        importer.obtainDataFromFile("request.txt").subscribe((d) => {
            console.log(d);
        });
    }
}
