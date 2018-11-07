import { Injectable } from "@angular/core";
import { HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable()
export class Configuration {
    private aToken;
    constructor(){        
    };
     
    // Http Options 
    // Localhost:3000 or AWS Node Server      
    webAPIServerUrl: string = environment.api.url;
    httpOptions: any = {        
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.aToken}`)
    };
};
