import { LightningElement } from 'lwc';

import { reduceErrors } from 'c/ldsUtils';

import NAME_FIELD from '@salesforce/schema/Account.Name';
import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';

// Import Apex Method
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

// Configuration used by lightning-datatable to display data
const COLUMNS = [
  { label: 'Account Name', fieldName: NAME_FIELD.fieldApiName, type: 'text' },
  {
    label: 'Annual Revenue',
    fieldName: REVENUE_FIELD.fieldApiName,
    type: 'currency'
  },
  { label: 'Industry', fieldName: INDUSTRY_FIELD.fieldApiName, type: 'text' }
];

export default class AccountList extends LightningElement {
  // Property we pass to lightning-datatable component
  // The component provides convenient UI to render data records
  columns = COLUMNS;

  // We assign the data obtained from Apex method call to this property
  accounts;

  // Property to display error
  error;

  handleButtonClick() {
    // Call Apex function on click. It returns a promise resolved with the data or rejected with error
    getAccounts()
      .then((accounts) => {
        //code to execute if accounts are returned successfully
        this.accounts = accounts;
      })
      .catch((error) => {
        // If Apex method fails, extract the error and assign it to error property to display it on UI
        this.error = reduceErrors(error);
      });
  }
}
