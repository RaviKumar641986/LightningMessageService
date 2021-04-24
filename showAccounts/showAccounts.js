import { LightningElement,wire } from 'lwc';
import getAccountsData from '@salesforce/apex/AccountControllerLWC.getAccountsData';
import { createMessageContext, releaseMessageContext,publish} from 'lightning/messageService';
import SAMPLEMC from "@salesforce/messageChannel/SampleMessageChannel__c";

const columns = [
    { label: 'Record Id', fieldName: 'Id' },
    { label: 'Account Name', fieldName: 'Name' },
    { label: 'Phone', fieldName: 'Phone' ,type: 'phone' },
    { label: 'Website', fieldName: 'Website'}
];
export default class ShowAccounts extends LightningElement {
    context = createMessageContext();
    error;
    columns = columns;

     @wire(getAccountsData)
    accounts;

    sendDetails(event) {
        const selectedRows = event.detail.selectedRows;
        event.preventDefault();      
        // Display that fieldName of the selected rows
        for (let i = 0; i < selectedRows.length; i++){
            //alert("You selected: " + selectedRows[i].Id);
            console.log('firstComponent###'+selectedRows[i].Id);
            const message = {
                recordId: selectedRows[i].Id,
                recordData: { value: "message from Lightning Web Component" }
            };
            publish(this.context, SAMPLEMC, message);
        }
    }
}