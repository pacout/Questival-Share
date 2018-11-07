import { Component, OnInit } from '@angular/core';
import { HelloSignDataService } from './shared/services/hello-sign.service';
import { Configuration } from './shared/app.config';
import { ActivatedRoute } from '@angular/router';
declare const require: any;
var HelloSign = require('hellosign-embedded');

@Component({
    providers: [HelloSignDataService, Configuration],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(private _helloSignService: HelloSignDataService, private _route: ActivatedRoute) { }

    ngOnInit() {        
        // Get tickedId from url parameter
        const _ticketId: string = this._route.snapshot.queryParamMap.get('ticketId');

        // If not set, bail
        if (_ticketId === undefined || _ticketId === null) {
            return;
        };

        let getTicketResult = this.getTicketAndUserByTicketId(_ticketId);
       // console.log("GET TICK Result: " + JSON.stringify(getTicketResult));

        if (getTicketResult['signatureId'] !== null) {
            this.createRequest(_ticketId, getTicketResult['signatureId'], getTicketResult['firstName'], getTicketResult['lastName'], getTicketResult['email']);
        } else {
            this.createRequest(_ticketId, null, getTicketResult['firstName'], getTicketResult['lastName'], getTicketResult['email']);
        };
    };

    // Get Ticket And User info by tickId
    getTicketAndUserByTicketId(_ticketId: any) {
        try {
            // Pass vars to service --> to hellosign API
            this._helloSignService.getTicketAndUserByTicketId(_ticketId)
                .subscribe(
                    result => {
                        console.log("HELLO GET TICKET BY TICKET ID RESULT: " + JSON.stringify(result));
                    },
                    error => {
                        // Show failure alert
                        console.log("HELLO SIGN ERROR RESULT: " + JSON.stringify(error))
                        throw new Error(error.statusText);
                    }
                );
        } catch{
            console.log("HELLO SIGN ERROR - Create Request");
        };
    };

    // 
    createRequest(_ticketId: any, _signatureId: any, firstName:any, lastName:any, email:any) {
        try {
            //let _clientId = this.configurationForm.get('clientId').value;       
            let _clientId = '194ba4219e25a3946ff4795e9654dcad';

            // Pass vars to service --> to hellosign API
            this._helloSignService.createSignatureRequest(_ticketId, _signatureId, firstName, lastName, email)
                .subscribe(
                    result => {
                        console.log("HELLO SIGN RESULT: " + JSON.stringify(result));
                        this.openRequest(result['data'].signUrl, _clientId);
                    },
                    error => {
                        // Show failure alert
                        console.log("HELLO SIGN ERROR RESULT: " + JSON.stringify(error))
                        throw new Error(error.statusText);
                    }
                );
        } catch{
            console.log("HELLO SIGN ERROR - Create Request");
        };

    }// End click

    openRequest(_signUrl, _clientId) {
        try {
            console.log("OPEN REQUEST Client ID: " + _clientId);
            console.log("OPEN REQUEST Sign URL: " + _signUrl);
            HelloSign.init(_clientId);

            const options = {
                url: _signUrl,
                //skipDomainVerification: true, // For Testing Purposes
                allowCancel: true,
                debug: true,
                uxVersion: 2,
                messageListener(evt) {
                    console.log(evt);
                }
            };

            // Set the redirect URL, if defined by the user.
            // if (redirectUrlElement.value.length) {
            //     options.redirectUrl = redirectUrlElement.value;
            // }

            HelloSign.open(options);
        } catch{
            console.log("HELLO SIGN ERROR - openRequest");
        }

    }
}
