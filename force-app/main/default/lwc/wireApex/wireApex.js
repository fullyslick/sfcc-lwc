import { LightningElement, wire } from 'lwc';
import getAccountList from '@salesforce/apex/AccountController.getAccountList';

export default class WireApex extends LightningElement {
  accounts;
  error;

  // Get data using Apex Class. Note that Apex Class is not even declared in 'class' folder
  // But this will work only in the scope of Unit Testing.
  // In order to work properly you should define 'getAccountList' adapter in 'class' folder
  @wire(getAccountList)
  wiredAccounts({ error, data }) {
    if (data) {
      this.accounts = data;
      this.error = undefined;
    } else if (error) {
      this.error = error;
      this.accounts = undefined;
    }
  }
}
