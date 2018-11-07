import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Configuration } from '../app.config';


// headers for post, put get etc...
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};




@Injectable()
export class HelloSignDataService {

    // Use configuration file to get GraphQL api URL
    constructor(private http: HttpClient, private _configuration: Configuration) {
    }

    // node svr url
    private url = this._configuration.webAPIServerUrl;

    // Create Signature Request for hello-sign    
    public createSignatureRequest(_ticketId: any, _signatureId: any, _firstName:any, _lastName:any, _email:any) {
        // console.log("**SVC Create Hello Sign Signature Request: API KEY:  " + JSON.stringify(_apiKey));
        // console.log("**SVC Create Hello Sign Signature Request: CLIENT ID: " + JSON.stringify(_clientId));
        // Womp up a new JSON booty
        let body = { "ticketId": _ticketId, "signatureId": _signatureId, "firstName": _firstName, "lastName": _lastName, "email": _email };
        return this.http.post(this.url + '/hellosign/createSignatureRequest', body, httpOptions);
    };
  
    // Get Ticket and user info by Ticket ID
    public getTicketAndUserByTicketId(_ticketId: any) {
        return this.http.get(this.url + '/hellosign/getTicketAndUserByTicketId/' + _ticketId, httpOptions);
    };

};
