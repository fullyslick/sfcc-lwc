import { LightningElement, wire } from 'lwc';

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

  // Use the APEX function to retrieve the data, and store it on 'accounts'
  // If the operation succeeds, the records are accessible on accounts.data.
  // If it fails, the error surfaces in accounts.error
  @wire(getAccounts)
  accounts;

  // Add 'errors' property and extract error
  // Every time this.accounts.error changes,
  // the getter updates the value of the errors property. This occurs because of reactivity.
  get errors() {
    return this.accounts.error ? reduceErrors(this.accounts.error) : [];
  }
}
