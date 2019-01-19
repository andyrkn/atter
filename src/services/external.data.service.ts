import { BaseImporter } from './data-importer/base.importer';
import { Injectable } from '@web/core';

@Injectable()
export class ExternalDataService {
    
    public authorizeApp(importer: BaseImporter): void {
        importer.authorizeApp();
    }

}